import CommonApi from "@ireves/common-api";
import { MasterCodeInfo } from "@common-jshs/menkakusitsu-lib/dist/v1";
import { v1 } from "@common-jshs/menkakusitsu-lib";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { sendPush } from "@/firebase";
import config from "@/config";
import { escapeUserName } from "@/utils/Utility";
import { DeletedUser } from "@/utils/Constant";
import V1 from "@/router/v1";

export type FileData = {
  name: string;
  endpoint: string;
}

export const handleFiles = async (
  files: UploadedFile[],
  uploaderUid: number,
  board?: string,
  postId?: number
) => {
  const fileDatas: FileData[] = [];
  for (const file of files) {
    const filePath = file.tempFilePath;
    const fileDir = path.dirname(filePath);
    const newFileName = `${uuidv4()}${path.extname(file.name)}`;
    const newPath = path.join(fileDir, newFileName);
    const fileEndPoint = `${config.fileServerUri}/${newFileName}`;
    fs.renameSync(filePath, newPath);

    const formData = new FormData();
    formData.append("data", fs.createReadStream(newPath));

    const response = await fetch(`${config.fileServerUriInner}/files/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.fileServerAuthKey}`,
      },
      body: formData as any,
    });
    if (!response.ok) {
      throw new CommonApi.Exception(response.statusText);
    }
    if (postId && board) {
      await CommonApi.runAsync(
        "INSERT INTO bbs_file(postId, ownerUid, board, fileName, downloadLink, mimeType, createdDate) VALUE(?, ?, ?, ?, ?, ?, NOW())",
        [postId, uploaderUid, board, file.name, fileEndPoint, file.mimetype]
      );
    }
    fileDatas.push({ name: file.name, endpoint: fileEndPoint });
  }
  return fileDatas;
};

export const getUserInfoList = async () => {
  const userInfo: v1.UserInfo[] = (await CommonApi.getAllAsync(
    "SELECT uid, name FROM user WHERE state=1"
  )) as any;
  return userInfo;
};

export const findUserByUid = (userInfo: v1.UserInfo[], uid: number) => {
  for (const info of userInfo) {
    if (info.uid === uid) {
      return info;
    }
  }
  return DeletedUser;
};

export const getUserInfo = async (uid: number): Promise<v1.UserInfo> => {
  const user = await CommonApi.getFirstAsync(
    "SELECT sid, name FROM user WHERE state=1 AND uid=?",
    [uid]
  );
  if (!user) {
    return DeletedUser;
  }
  return {
    uid: uid,
    name: user.name,
    value: user.name,
  };
};

export const getStudentInfo = async (uid: number): Promise<v1.UserInfo> => {
  const getStudentInfoQuery = await CommonApi.getFirstAsync(
    "SELECT sid, name FROM user WHERE state=1 AND uid=? AND permission=1",
    [uid]
  );
  if (!getStudentInfoQuery) {
    return DeletedUser;
  }
  return {
    uid: uid,
    name: getStudentInfoQuery.name,
    value: `${getStudentInfoQuery.sid} ${getStudentInfoQuery.name}`,
  };
};

export const getTeacherInfo = async (uid: number): Promise<v1.UserInfo> => {
  const getTeacherInfoQuery = await CommonApi.getFirstAsync(
    "SELECT sid, name FROM user WHERE state=1 AND uid=? AND permission=2",
    [uid]
  );
  if (!getTeacherInfoQuery) {
    return DeletedUser;
  }
  return {
    uid: uid,
    name: getTeacherInfoQuery.name,
    value: `${getTeacherInfoQuery.name} 선생님`,
  };
};

export const getBbsPost = async (board: string, postId: number) => {
  const post = await CommonApi.getFirstAsync(
    "SELECT * FROM bbs_post WHERE deletedDate IS NULL AND board=? AND id=?",
    [board, postId]
  );
  if (!post) {
    throw new CommonApi.ResponseException(
      -1,
      "삭제됐거나 존재하지 않는 피드백입니다."
    );
  }
  return post;
};

export const getBbsComment = async (
  board: string,
  postId: number,
  commentId: number
) => {
  const comment = await CommonApi.getFirstAsync(
    "SELECT * FROM bbs_comment WHERE deletedDate IS NULL AND board=? AND postId=? AND id=?",
    [board, postId, commentId]
  );
  if (!comment) {
    throw new CommonApi.ResponseException(
      -1,
      "이미 삭제됐거나 존재하지 않는 의견입니다."
    );
  }
  return comment;
};



export const getCodeMasterInfo = async(codeType:string)=>{
  const codeInfoLists = await CommonApi.getAllAsync(
    "SELECT * FROM code_manager WHERE CODE_TYPE = ? ORDER BY CODE_ID", [codeType]
  );
  const codeInfos :MasterCodeInfo[] = [];
  for(const codeinfo of codeInfoLists){
    codeInfos.push({
      id: codeinfo.id,
      codeType: codeinfo.code_type,
      codeId: codeinfo.code_id,
      codeName: codeinfo.code_name,
      bigo: codeinfo.bigo,
    });
  }
  return codeInfos;
};


export const getSpecialrooms = async (isAuthed: boolean) => {
  const informationList = await CommonApi.getAllAsync(
    "SELECT * FROM (SELECT applyId, GROUP_CONCAT(name) AS applicants FROM (SELECT specialroom_apply_student.applyId, user.name FROM specialroom_apply_student, user WHERE specialroom_apply_student.studentUid = user.uid) AS A GROUP BY A.applyId) AS B, specialroom_apply WHERE B.applyId = specialroom_apply.applyId"
  );
  const specialrooms: v1.SpecialroomInfo[] = [];

  const userInfo = await getUserInfoList();

  for (const information of informationList) {
    const master = findUserByUid(userInfo, information.masterUid);
    master.value = "";

    const teacher = findUserByUid(userInfo, information.teacherUid);
    teacher.value = "";

    if (!isAuthed) {
      master.name = escapeUserName(master.name);
      teacher.name = escapeUserName(teacher.name);
      information.applicants = (information.applicants as string)
        .split(",")
        .map((name) => escapeUserName(name))
        .join(",");
    }

    information.master = master;
    information.teacher = teacher;
  
    specialrooms.push({
      applyId: information.applyId,
      state: information.isApproved,
      master: information.master,
      teacher: information.teacher,
      applicants: information.applicants,
      location: information.location,
      purpose: information.purpose,
      when: information.when,
    });
  }
  return specialrooms;
};

export const getSpecialroomInfo = async (
  when: number,
  applicantUid: number
) => {
  const specialroom_apply_student = await CommonApi.getAllAsync(
    "SELECT applyId FROM specialroom_apply_student WHERE studentUid=?",
    [applicantUid]
  );
  if (specialroom_apply_student.length === 0) {
    return null;
  }
  for (const student of specialroom_apply_student) {
    const applyId = student.applyId;
    const apply = await CommonApi.getFirstAsync(
      "SELECT teacherUid, masterUid, purpose, location, GROUP_CONCAT(name) AS applicants, `when`, isApproved FROM user, specialroom_apply WHERE user.uid = ANY(SELECT studentUid FROM specialroom_apply_student WHERE applyId=? GROUP BY studentUid) AND specialroom_apply.applyId=? AND `when`=? GROUP BY teacherUid, masterUid, purpose, location, `when`, isApproved",
      [applyId, applyId, when]
    );
    if (!apply) {
      continue;
    }
    const master = await getStudentInfo(apply.masterUid);
    const teacher = await getTeacherInfo(apply.teacherUid);
    return {
      applyId: applyId,
      state: apply.isApproved,
      master: master,
      teacher: teacher,
      applicants: apply.applicants,
      location: apply.location,
      purpose: apply.purpose,
      when: apply.when,
    };
  }
  return null;
};

export const sendPushToUser = async (
  targetUid: number,
  title: string,
  body: string,
  link?: string
) => {
  const push_token_list = await CommonApi.getAllAsync(
    "SELECT token FROM push_token WHERE uid=?",
    [targetUid]
  );
  for (const push_token of push_token_list) {
    if (push_token.token) {
      sendPush(push_token.token, title, body, link);
    }
  }
};




export const getElectronicDevice = async (isAuthed: boolean) => {
  const informationList = await CommonApi.getAllAsync(
    "SELECT * FROM (SELECT applyId, GROUP_CONCAT(name) AS applicants FROM (SELECT electronicdevice_apply_student.applyId, user.name FROM electronicdevice_apply_student, user WHERE electronicdevice_apply_student.studentUid = user.uid) AS A GROUP BY A.applyId) AS B, (SELECT code_type,code_id,code_name as devicename FROM code_manager) AS C, electronicdevice_apply WHERE B.applyId = electronicdevice_apply.applyId AND C.code_id = electronicdevice_apply.deviceId AND C.code_type = 'ELECTRONIC_TYPE'"
  );
  const electronicdevice: v1.ElecDeviceInfo[] = [];

  const userInfo = await getUserInfoList();

  for (const information of informationList) {
    const master = findUserByUid(userInfo, information.masterUid);
    master.value = "";

    const teacher = findUserByUid(userInfo, information.teacherUid);
    teacher.value = "";

    if (!isAuthed) {
      master.name = escapeUserName(master.name);
      teacher.name = escapeUserName(teacher.name);
      information.applicants = (information.applicants as string)
        .split(",")
        .map((name) => escapeUserName(name))
        .join(",");
    }

    information.master = master;
    information.teacher = teacher;
  
    electronicdevice.push({
      applyId: information.applyId,
      state: information.isApproved,
      master: information.master,
      teacher: information.teacher,
      applicants: information.applicants,
      deviceId: information.deviceId,
      devicename: information.devicename,
      purpose: information.purpose,
      when: information.when,
    });
  }
  return electronicdevice;
};

export const getElectronicDeviceInfo = async (
  when: number,
  applicantUid: number
) => {
  const electronicdevice_apply_student = await CommonApi.getAllAsync(
    "SELECT applyId FROM electronicdevice_apply_student WHERE studentUid=?",
    [applicantUid]
  );
  if (electronicdevice_apply_student.length === 0) {
    return null;
  }
  for (const student of electronicdevice_apply_student) {
    const applyId = student.applyId;
    const apply = await CommonApi.getFirstAsync(
      "SELECT teacherUid, masterUid, purpose, deviceId, GROUP_CONCAT(name) AS applicants, `when`, isApproved FROM user, electronicdevice_apply WHERE user.uid = ANY(SELECT studentUid FROM electronicdevice_apply_student WHERE applyId=? GROUP BY studentUid) AND electronicdevice_apply.applyId=? AND `when`=? GROUP BY teacherUid, masterUid, purpose, deviceId, `when`, isApproved",
      [applyId, applyId, when]
    );
    if (!apply) {
      continue;
    }
    const master = await getStudentInfo(apply.masterUid);
    const teacher = await getTeacherInfo(apply.teacherUid);
    return {
      applyId: applyId,
      state: apply.isApproved,
      master: master,
      teacher: teacher,
      applicants: apply.applicants,
      deviceId: apply.deviceId,
      devicename: "",
      purpose: apply.purpose,
      when: apply.when,
    };
  }
  return null;
};
