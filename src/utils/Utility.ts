import { StudentInfo, TeacherInfo } from "@common-jshs/menkakusitsu-lib/v1";
import fs from "fs";
import { query } from "../mysql";

export const readAllFiles = (
    dirName: string,
    fileNames: string[],
    filter?: (fileName: string) => boolean
) => {
    fs.readdirSync(dirName, { withFileTypes: true }).forEach((dir) => {
        if (dir.isDirectory()) {
            readAllFiles(`${dirName}\\${dir.name}`, fileNames, filter);
        } else if (!filter || filter(dir.name)) {
            fileNames.push(`${dirName}\\${dir.name}`);
        }
    });
};

export const parseBearer = (bearer: string) => {
    return getJwtPayload(bearer.split("Bearer ")[1]);
};

export const getJwtPayload = (jwt: string) => {
    return JSON.parse(Buffer.from(jwt.split(".")[1], "base64").toString());
};

export const getStudentInfo = async (
    uid: number
): Promise<StudentInfo | null> => {
    const getStudentInfoQuery = await query(
        "SELECT student_ID, name FROM user WHERE UID=?",
        [uid]
    );
    if (!getStudentInfoQuery || getStudentInfoQuery.length === 0) {
        return null;
    }
    return {
        uid: uid,
        name: getStudentInfoQuery[0].name,
        value: `${getStudentInfoQuery[0].student_ID} ${getStudentInfoQuery[0].name}`,
    };
};

export const getTeacherInfo = async (
    uid: number
): Promise<TeacherInfo | null> => {
    const getTeacherInfoQuery = await query(
        "SELECT student_ID, name FROM user WHERE UID=? AND teacher_flag=1",
        [uid]
    );
    if (!getTeacherInfoQuery || getTeacherInfoQuery.length === 0) {
        return null;
    }
    return {
        uid: uid,
        name: getTeacherInfoQuery[0].name,
        value: `${getTeacherInfoQuery[0].name} 선생님`,
    };
};

export const escapeUserName = (name: string): string => {
    const splited = name.split("");
    splited[1] = "*";
    return splited.join("");
};