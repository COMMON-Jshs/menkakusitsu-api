type RequestType =
  | "PostRegisterRequest"
  | "DeleteSecessionRequest"
  | "PostLoginRequest"
  | "DeleteLogoutRequest"
  | "PostRefreshRequest"
  | "PutForgotPasswordRequest"
  | "GetBbsPostListRequest"
  | "GetBbsPostRequest"
  | "PostBbsPostRequest"
  | "PutBbsPostRequest"
  | "DeleteBbsPostRequest"
  | "GetBbsPostHeaderRequest"
  | "GetBbsCommentListRequest"
  | "PostBbsCommentRequest"
  | "DeleteBbsCommentRequest"
  | "GetSubjectListRequest"
  | "GetIdbotChatRequest"
  | "GetMealRequest"
  | "PutMealRequest"
  | "GetApplyRequest"
  | "PostApplyRequest"
  | "DeleteApplyRequest"
  | "GetAttendanceInfoRequest"
  | "GetAttendanceListRequest"
  | "GetInfoRequest"
  | "PutInfoRequest"
  | "GetManagerRequest"
  | "GetLocationInfoRequest"
  | "GetPurposeInfoRequest"
  | "GetStudentInfoRequest"
  | "GetTeacherInfoRequest"
  | "GetOuterStudentInfoRequest"
  | "PostOuterStudentInfoRequest"
  | "DeleteOuterStudentInfoRequest"
  | "GetTimetableRequest"
  | "PutTimetableRequest"
  | "GetMyPrivateInfoRequest"
  | "PutEmailRequest"
  | "PutPasswordRequest"
  | "PostPushRequest"
  | "PutPushRequest"
  | "DeletePushRequest"
  | "GetDeviceInfoRequest"
  | "PostDeviceApplyRequest"
  | "GetElectronicDeviceApplyRequest"
  | "DeleteApplyElectronicDeviceRequest"
  | "PutElectronicDeviceInfoRequest";
     

export const sanitizeRequest = (
  request: unknown,
  type: RequestType
): boolean => {
  switch (type) {
    case "PostRegisterRequest":
      return sanitizePostRegisterRequest(request);
    case "DeleteSecessionRequest":
      return sanitizeDeleteSecessionRequest(request);
    case "PostLoginRequest":
      return sanitizePostLoginRequest(request);
    case "DeleteLogoutRequest":
      return sanitizeDeleteLogoutRequest(request);
    case "PostRefreshRequest":
      return sanitizePostRefreshRequest(request);
    case "PutForgotPasswordRequest":
      return sanitizePutForgotPasswordRequest(request);
    case "GetBbsPostListRequest":
      return sanitizeGetBbsPostListRequest(request);
    case "GetBbsPostRequest":
      return sanitizeGetBbsPostRequest(request);
    case "PostBbsPostRequest":
      return sanitizePostBbsPostRequest(request);
    case "PutBbsPostRequest":
      return sanitizePutBbsPostRequest(request);
    case "DeleteBbsPostRequest":
      return sanitizeDeleteBbsPostRequest(request);
    case "GetBbsPostHeaderRequest":
      return sanitizeGetBbsPostHeaderRequest(request);
    case "GetBbsCommentListRequest":
      return sanitizeGetBbsCommentListRequest(request);
    case "PostBbsCommentRequest":
      return sanitizePostBbsCommentRequest(request);
    case "DeleteBbsCommentRequest":
      return sanitizeDeleteBbsCommentRequest(request);
    case "GetSubjectListRequest":
      return sanitizeGetSubjectListRequest(request);
    case "GetIdbotChatRequest":
      return sanitizeGetIdbotChatRequest(request);
    case "GetMealRequest":
      return sanitizeGetMealRequest(request);
    case "PutMealRequest":
      return sanitizePutMealRequest(request);
    case "GetApplyRequest":
      return sanitizeGetApplyRequest(request);
    case "PostApplyRequest":
      return sanitizePostApplyRequest(request);
    case "DeleteApplyRequest":
      return sanitizeDeleteApplyRequest(request);
    case "GetAttendanceInfoRequest":
      return sanitizeGetAttendanceInfoRequest(request);
    case "GetAttendanceListRequest":
      return sanitizeGetAttendanceListRequest(request);
    case "GetInfoRequest":
      return sanitizeGetInfoRequest(request);
    case "PutInfoRequest":
      return sanitizePutInfoRequest(request);
    case "GetManagerRequest":
      return sanitizeGetManagerRequest(request);
    case "GetLocationInfoRequest":
      return sanitizeGetLocationInfoRequest(request);
    case "GetPurposeInfoRequest":
      return sanitizeGetPurposeInfoRequest(request);
    case "GetStudentInfoRequest":
      return sanitizeGetStudentInfoRequest(request);
    case "GetTeacherInfoRequest":
      return sanitizeGetTeacherInfoRequest(request);
    case "GetOuterStudentInfoRequest":
      return sanitizeGetOuterStudentInfoRequest(request);
    case "PostOuterStudentInfoRequest":
      return sanitizePostOuterStudentInfoRequest(request);
    case "DeleteOuterStudentInfoRequest":
      return sanitizeDeleteOuterStudentInfoRequest(request);
    case "GetTimetableRequest":
      return sanitizeGetTimetableRequest(request);
    case "PutTimetableRequest":
      return sanitizePutTimetableRequest(request);
    case "GetMyPrivateInfoRequest":
      return sanitizeGetMyPrivateInfoRequest(request);
    case "PutEmailRequest":
      return sanitizePutEmailRequest(request);
    case "PutPasswordRequest":
      return sanitizePutPasswordRequest(request);
    case "PostPushRequest":
      return sanitizePostPushRequest(request);
    case "PutPushRequest":
      return sanitizePutPushRequest(request);
    case "DeletePushRequest":
      return sanitizeDeletePushRequest(request);
    case "GetDeviceInfoRequest":
      return sanitizeGetDevieInfoRequest(request);
    case "PostDeviceApplyRequest":
      return sanitizePostDeviceApplyRequest(request);
    case "GetElectronicDeviceApplyRequest":
      return sanitizeGetElectronicDeviceApplyRequest(request);
    case "DeleteApplyElectronicDeviceRequest":
      return sanitizeDeleteElectronicDeviceApplyRequest(request);
    case "PutElectronicDeviceInfoRequest":
      return sanitizePutElectronicDeviceInfoRequest(request);
      //sanitizePutInfoRequest
  }
  return false;
};

function sanitizeDefaultResponse(checker: any) {
  if (
    typeof checker.status == "string" &&
    Boolean(checker.status.trim()) &&
    !Number.isNaN(Number(checker.status))
  ) {
    checker.status = Number(checker.status);
  }

  if (typeof checker.status != "number" || typeof checker.message != "string") {
    return false;
  }
  return true;
}

function sanitizePostRegisterRequest(checker: any) {
  if (
    typeof checker.sid == "string" &&
    Boolean(checker.sid.trim()) &&
    !Number.isNaN(Number(checker.sid))
  ) {
    checker.sid = Number(checker.sid);
  }

  if (
    typeof checker.id != "string" ||
    typeof checker.sid != "number" ||
    typeof checker.name != "string" ||
    typeof checker.email != "string" ||
    typeof checker.password != "string"
  ) {
    return false;
  }
  return true;
}

function sanitizePostRegisterResponse(checker: any) {
  return true;
}

function sanitizeDeleteSecessionRequest(checker: any) {
  if (
    typeof checker.uid == "string" &&
    Boolean(checker.uid.trim()) &&
    !Number.isNaN(Number(checker.uid))
  ) {
    checker.uid = Number(checker.uid);
  }

  if (
    (checker.uid != undefined && typeof checker.uid != "number") ||
    (checker.id != undefined && typeof checker.id != "string") ||
    (checker.name != undefined && typeof checker.name != "string")
  ) {
    return false;
  }
  return true;
}

function sanitizeDeleteSecessionResponse(checker: any) {
  return true;
}

function sanitizePostLoginRequest(checker: any) {
  if (typeof checker.id != "string" || typeof checker.password != "string") {
    return false;
  }
  return true;
}

function sanitizePostLoginResponse(checker: any) {
  if (
    typeof checker.accessToken != "string" ||
    typeof checker.refreshToken != "string" ||
    (checker.callbacks != undefined && !sanitizestringArray(checker.callbacks))
  ) {
    return false;
  }
  return true;
}

function sanitizeDeleteLogoutRequest(checker: any) {
  return true;
}

function sanitizeDeleteLogoutResponse(checker: any) {
  return true;
}

function sanitizePostRefreshRequest(checker: any) {
  return true;
}

function sanitizePostRefreshResponse(checker: any) {
  if (
    typeof checker.accessToken != "string" ||
    typeof checker.refreshToken != "string"
  ) {
    return false;
  }
  return true;
}

function sanitizePutForgotPasswordRequest(checker: any) {
  if (typeof checker.id != "string" || typeof checker.email != "string") {
    return false;
  }
  return true;
}

function sanitizePutForgotPasswordResponse(checker: any) {
  return true;
}

function sanitizeBbsPost(checker: any) {
  if (
    typeof checker.id == "string" &&
    Boolean(checker.id.trim()) &&
    !Number.isNaN(Number(checker.id))
  ) {
    checker.id = Number(checker.id);
  }

  if (
    typeof checker.postType == "string" &&
    Boolean(checker.postType.trim()) &&
    !Number.isNaN(Number(checker.postType))
  ) {
    checker.postType = Number(checker.postType);
  }

  if (
    typeof checker.commentCount == "string" &&
    Boolean(checker.commentCount.trim()) &&
    !Number.isNaN(Number(checker.commentCount))
  ) {
    checker.commentCount = Number(checker.commentCount);
  }

  if (
    typeof checker.isPublic == "string" &&
    (checker.isPublic == "true" || checker.isPublic == "false")
  ) {
    checker.isPublic = checker.isPublic == "true";
  }

  if (
    typeof checker.id != "number" ||
    !sanitizeUserInfo(checker.owner) ||
    typeof checker.title != "string" ||
    typeof checker.content != "string" ||
    typeof checker.header != "string" ||
    typeof checker.board != "string" ||
    typeof checker.postType != "number" ||
    typeof checker.commentCount != "number" ||
    typeof checker.createdDate != "string" ||
    typeof checker.isPublic != "boolean"
  ) {
    return false;
  }
  return true;
}

function sanitizeBbsComment(checker: any) {
  if (
    typeof checker.id == "string" &&
    Boolean(checker.id.trim()) &&
    !Number.isNaN(Number(checker.id))
  ) {
    checker.id = Number(checker.id);
  }

  if (
    typeof checker.id != "number" ||
    !sanitizeUserInfo(checker.owner) ||
    typeof checker.content != "string" ||
    typeof checker.createdDate != "string"
  ) {
    return false;
  }
  return true;
}

function sanitizeGetBbsPostListRequest(checker: any) {
  if (
    typeof checker.postPage == "string" &&
    Boolean(checker.postPage.trim()) &&
    !Number.isNaN(Number(checker.postPage))
  ) {
    checker.postPage = Number(checker.postPage);
  }

  if (
    typeof checker.postListSize == "string" &&
    Boolean(checker.postListSize.trim()) &&
    !Number.isNaN(Number(checker.postListSize))
  ) {
    checker.postListSize = Number(checker.postListSize);
  }

  if (
    typeof checker.board != "string" ||
    typeof checker.postPage != "number" ||
    typeof checker.postListSize != "number"
  ) {
    return false;
  }
  return true;
}

function sanitizeGetBbsPostListResponse(checker: any) {
  if (
    typeof checker.postCount == "string" &&
    Boolean(checker.postCount.trim()) &&
    !Number.isNaN(Number(checker.postCount))
  ) {
    checker.postCount = Number(checker.postCount);
  }

  if (
    typeof checker.postCount != "number" ||
    !sanitizeBbsPostArray(checker.list)
  ) {
    return false;
  }
  return true;
}

function sanitizeGetBbsPostRequest(checker: any) {
  if (
    typeof checker.postId == "string" &&
    Boolean(checker.postId.trim()) &&
    !Number.isNaN(Number(checker.postId))
  ) {
    checker.postId = Number(checker.postId);
  }

  if (typeof checker.board != "string" || typeof checker.postId != "number") {
    return false;
  }
  return true;
}

function sanitizeGetBbsPostResponse(checker: any) {
  if (
    !sanitizeBbsPost(checker.post) ||
    (checker.attachments != undefined &&
      !sanitizeFileInfoArray(checker.attachments))
  ) {
    return false;
  }
  return true;
}

function sanitizePostBbsPostRequest(checker: any) {
  if (
    typeof checker.isPublic == "string" &&
    (checker.isPublic == "true" || checker.isPublic == "false")
  ) {
    checker.isPublic = checker.isPublic == "true";
  }

  if (
    typeof checker.title != "string" ||
    typeof checker.content != "string" ||
    typeof checker.header != "string" ||
    typeof checker.board != "string" ||
    typeof checker.isPublic != "boolean"
  ) {
    return false;
  }
  return true;
}

function sanitizePostBbsPostResponse(checker: any) {
  if (
    typeof checker.postId == "string" &&
    Boolean(checker.postId.trim()) &&
    !Number.isNaN(Number(checker.postId))
  ) {
    checker.postId = Number(checker.postId);
  }

  if (typeof checker.postId != "number") {
    return false;
  }
  return true;
}

function sanitizePutBbsPostRequest(checker: any) {
  if (
    typeof checker.postId == "string" &&
    Boolean(checker.postId.trim()) &&
    !Number.isNaN(Number(checker.postId))
  ) {
    checker.postId = Number(checker.postId);
  }

  if (
    typeof checker.isPublic == "string" &&
    (checker.isPublic == "true" || checker.isPublic == "false")
  ) {
    checker.isPublic = checker.isPublic == "true";
  }

  if (
    typeof checker.board != "string" ||
    typeof checker.postId != "number" ||
    (checker.title != undefined && typeof checker.title != "string") ||
    (checker.content != undefined && typeof checker.content != "string") ||
    (checker.header != undefined && typeof checker.header != "string") ||
    (checker.isPublic != undefined && typeof checker.isPublic != "boolean")
  ) {
    return false;
  }
  return true;
}

function sanitizePutBbsPostResponse(checker: any) {
  return true;
}

function sanitizeDeleteBbsPostRequest(checker: any) {
  if (
    typeof checker.postId == "string" &&
    Boolean(checker.postId.trim()) &&
    !Number.isNaN(Number(checker.postId))
  ) {
    checker.postId = Number(checker.postId);
  }

  if (typeof checker.board != "string" || typeof checker.postId != "number") {
    return false;
  }
  return true;
}

function sanitizeDeleteBbsPostResponse(checker: any) {
  return true;
}

function sanitizeGetBbsPostHeaderRequest(checker: any) {
  if (typeof checker.board != "string") {
    return false;
  }
  return true;
}

function sanitizeGetBbsPostHeaderResponse(checker: any) {
  if (!sanitizestringArray(checker.headers)) {
    return false;
  }
  return true;
}

function sanitizeGetBbsCommentListRequest(checker: any) {
  if (
    typeof checker.postId == "string" &&
    Boolean(checker.postId.trim()) &&
    !Number.isNaN(Number(checker.postId))
  ) {
    checker.postId = Number(checker.postId);
  }

  if (
    typeof checker.commentPage == "string" &&
    Boolean(checker.commentPage.trim()) &&
    !Number.isNaN(Number(checker.commentPage))
  ) {
    checker.commentPage = Number(checker.commentPage);
  }

  if (
    typeof checker.commentListSize == "string" &&
    Boolean(checker.commentListSize.trim()) &&
    !Number.isNaN(Number(checker.commentListSize))
  ) {
    checker.commentListSize = Number(checker.commentListSize);
  }

  if (
    typeof checker.board != "string" ||
    typeof checker.postId != "number" ||
    typeof checker.commentPage != "number" ||
    typeof checker.commentListSize != "number"
  ) {
    return false;
  }
  return true;
}

function sanitizeGetBbsCommentListResponse(checker: any) {
  if (
    typeof checker.commentCount == "string" &&
    Boolean(checker.commentCount.trim()) &&
    !Number.isNaN(Number(checker.commentCount))
  ) {
    checker.commentCount = Number(checker.commentCount);
  }

  if (
    !sanitizeBbsCommentArray(checker.list) ||
    typeof checker.commentCount != "number"
  ) {
    return false;
  }
  return true;
}

function sanitizePostBbsCommentRequest(checker: any) {
  if (
    typeof checker.postId == "string" &&
    Boolean(checker.postId.trim()) &&
    !Number.isNaN(Number(checker.postId))
  ) {
    checker.postId = Number(checker.postId);
  }

  if (
    typeof checker.board != "string" ||
    typeof checker.postId != "number" ||
    typeof checker.content != "string"
  ) {
    return false;
  }
  return true;
}

function sanitizePostBbsCommentResponse(checker: any) {
  if (
    typeof checker.commentId == "string" &&
    Boolean(checker.commentId.trim()) &&
    !Number.isNaN(Number(checker.commentId))
  ) {
    checker.commentId = Number(checker.commentId);
  }

  if (typeof checker.commentId != "number") {
    return false;
  }
  return true;
}

function sanitizeDeleteBbsCommentRequest(checker: any) {
  if (
    typeof checker.postId == "string" &&
    Boolean(checker.postId.trim()) &&
    !Number.isNaN(Number(checker.postId))
  ) {
    checker.postId = Number(checker.postId);
  }

  if (
    typeof checker.commentId == "string" &&
    Boolean(checker.commentId.trim()) &&
    !Number.isNaN(Number(checker.commentId))
  ) {
    checker.commentId = Number(checker.commentId);
  }

  if (
    typeof checker.board != "string" ||
    typeof checker.postId != "number" ||
    typeof checker.commentId != "number"
  ) {
    return false;
  }
  return true;
}

function sanitizeDeleteBbsCommentResponse(checker: any) {
  return true;
}

function sanitizeSubject(checker: any) {
  if (
    typeof checker.id == "string" &&
    Boolean(checker.id.trim()) &&
    !Number.isNaN(Number(checker.id))
  ) {
    checker.id = Number(checker.id);
  }

  if (
    typeof checker.multiplier == "string" &&
    Boolean(checker.multiplier.trim()) &&
    !Number.isNaN(Number(checker.multiplier))
  ) {
    checker.multiplier = Number(checker.multiplier);
  }

  if (
    typeof checker.id != "number" ||
    typeof checker.name != "string" ||
    typeof checker.multiplier != "number"
  ) {
    return false;
  }
  return true;
}

function sanitizeGetSubjectListRequest(checker: any) {
  if (
    typeof checker.grade == "string" &&
    Boolean(checker.grade.trim()) &&
    !Number.isNaN(Number(checker.grade))
  ) {
    checker.grade = Number(checker.grade);
  }

  if (
    typeof checker.semester == "string" &&
    Boolean(checker.semester.trim()) &&
    !Number.isNaN(Number(checker.semester))
  ) {
    checker.semester = Number(checker.semester);
  }

  if (typeof checker.grade != "number" || typeof checker.semester != "number") {
    return false;
  }
  return true;
}

function sanitizeGetSubjectListResponse(checker: any) {
  if (!sanitizeSubjectArray(checker.list)) {
    return false;
  }
  return true;
}

function sanitizeGetIdbotChatRequest(checker: any) {
  if (typeof checker.chatInput != "string") {
    return false;
  }
  return true;
}

function sanitizeGetIdbotChatResponse(checker: any) {
  if (typeof checker.chatOutput != "string") {
    return false;
  }
  return true;
}

function sanitizeFileInfo(checker: any) {
  if (
    !sanitizeUserInfo(checker.owner) ||
    typeof checker.fileName != "string" ||
    typeof checker.downloadLink != "string" ||
    typeof checker.mimeType != "string"
  ) {
    return false;
  }
  return true;
}

function sanitizeMealInfo(checker: any) {
  if (!sanitizestringArray(checker.meals)) {
    return false;
  }
  return true;
}

function sanitizeGetMealRequest(checker: any) {
  return true;
}

function sanitizeGetMealResponse(checker: any) {
  if (
    !sanitizeMealInfo(checker.breakfast) ||
    !sanitizeMealInfo(checker.lunch) ||
    !sanitizeMealInfo(checker.dinner)
  ) {
    return false;
  }
  return true;
}

function sanitizePutMealRequest(checker: any) {
  if (
    !sanitizeMealInfo(checker.breakfast) ||
    !sanitizeMealInfo(checker.lunch) ||
    !sanitizeMealInfo(checker.dinner)
  ) {
    return false;
  }
  return true;
}

function sanitizePutMealResponse(checker: any) {
  if (
    !sanitizeMealInfo(checker.breakfast) ||
    !sanitizeMealInfo(checker.lunch) ||
    !sanitizeMealInfo(checker.dinner)
  ) {
    return false;
  }
  return true;
}

function sanitizeGetApplyRequest(checker: any) {
  if (
    typeof checker.when == "string" &&
    Boolean(checker.when.trim()) &&
    !Number.isNaN(Number(checker.when))
  ) {
    checker.when = Number(checker.when);
  }

  if (typeof checker.when != "number") {
    return false;
  }
  return true;
}

function sanitizeGetApplyResponse(checker: any) {
  if (!sanitizeSpecialroomInfo(checker.specialroomInfo)) {
    return false;
  }
  return true;
}

function sanitizePostApplyRequest(checker: any) {
  if (
    typeof checker.teacherUid == "string" &&
    Boolean(checker.teacherUid.trim()) &&
    !Number.isNaN(Number(checker.teacherUid))
  ) {
    checker.teacherUid = Number(checker.teacherUid);
  }

  if (
    typeof checker.when == "string" &&
    Boolean(checker.when.trim()) &&
    !Number.isNaN(Number(checker.when))
  ) {
    checker.when = Number(checker.when);
  }

  if (
    typeof checker.teacherUid != "number" ||
    !sanitizeUserInfoArray(checker.applicants) ||
    typeof checker.location != "string" ||
    typeof checker.purpose != "string" ||
    typeof checker.when != "number"
  ) {
    return false;
  }
  return true;
}

function sanitizePostApplyResponse(checker: any) {
  return true;
}

function sanitizeDeleteApplyRequest(checker: any) {
  if (
    typeof checker.when == "string" &&
    Boolean(checker.when.trim()) &&
    !Number.isNaN(Number(checker.when))
  ) {
    checker.when = Number(checker.when);
  }

  if (typeof checker.when != "number") {
    return false;
  }
  return true;
}

function sanitizeDeleteApplyResponse(checker: any) {
  return true;
}

function sanitizeGetAttendanceInfoRequest(checker: any) {
  return true;
}

function sanitizeGetAttendanceInfoResponse(checker: any) {
  if (!sanitizestringArray(checker.info)) {
    return false;
  }
  return true;
}

function sanitizeGetAttendanceListRequest(checker: any) {
  if (
    typeof checker.when == "string" &&
    Boolean(checker.when.trim()) &&
    !Number.isNaN(Number(checker.when))
  ) {
    checker.when = Number(checker.when);
  }

  if (typeof checker.when != "number") {
    return false;
  }
  return true;
}

function sanitizeAttendanceList(checker: any) {
  if (
    !sanitizestringArrayArray(checker.big) ||
    !sanitizestringArrayArray(checker.small)
  ) {
    return false;
  }
  return true;
}

function sanitizeGetAttendanceListResponse(checker: any) {
  if (!sanitizeAttendanceList(checker.list)) {
    return false;
  }
  return true;
}

function sanitizeSpecialroomInfo(checker: any) {
  if (
    typeof checker.applyId == "string" &&
    Boolean(checker.applyId.trim()) &&
    !Number.isNaN(Number(checker.applyId))
  ) {
    checker.applyId = Number(checker.applyId);
  }

  if (
    typeof checker.state == "string" &&
    Boolean(checker.state.trim()) &&
    !Number.isNaN(Number(checker.state))
  ) {
    checker.state = Number(checker.state);
  }

  if (
    typeof checker.when == "string" &&
    Boolean(checker.when.trim()) &&
    !Number.isNaN(Number(checker.when))
  ) {
    checker.when = Number(checker.when);
  }

  if (
    typeof checker.applyId != "number" ||
    typeof checker.state != "number" ||
    !sanitizeUserInfo(checker.master) ||
    !sanitizeUserInfo(checker.teacher) ||
    typeof checker.applicants != "string" ||
    typeof checker.location != "string" ||
    typeof checker.purpose != "string" ||
    typeof checker.when != "number"
  ) {
    return false;
  }
  return true;
}

function sanitizeGetInfoRequest(checker: any) {
  return true;
}

function sanitizeGetInfoResponse(checker: any) {
  if (!sanitizeSpecialroomInfoArray(checker.information)) {
    return false;
  }
  return true;
}

function sanitizePutInfoRequest(checker: any) {
  if (!sanitizeSpecialroomInfoArray(checker.information)) {
    return false;
  }
  return true;
}

function sanitizePutInfoResponse(checker: any) {
  if (!sanitizeSpecialroomInfoArray(checker.information)) {
    return false;
  }
  return true;
}

function sanitizeLocationInfo(checker: any) {
  if (
    typeof checker.id == "string" &&
    Boolean(checker.id.trim()) &&
    !Number.isNaN(Number(checker.id))
  ) {
    checker.id = Number(checker.id);
  }

  if (typeof checker.id != "number" || typeof checker.value != "string") {
    return false;
  }
  return true;
}

function sanitizeGetManagerRequest(checker: any) {
  if (typeof checker.when != "string") {
    return false;
  }
  return true;
}

function sanitizeGetManagerResponse(checker: any) {
  if (!sanitizeUserInfo(checker.manager)) {
    return false;
  }
  return true;
}

function sanitizeGetLocationInfoRequest(checker: any) {
  return true;
}

function sanitizeGetLocationInfoResponse(checker: any) {
  if (!sanitizeLocationInfoArray(checker.locationInfo)) {
    return false;
  }
  return true;
}

function sanitizePurposeInfo(checker: any) {
  if (
    typeof checker.id == "string" &&
    Boolean(checker.id.trim()) &&
    !Number.isNaN(Number(checker.id))
  ) {
    checker.id = Number(checker.id);
  }

  if (typeof checker.id != "number" || typeof checker.value != "string") {
    return false;
  }
  return true;
}

function sanitizeGetPurposeInfoRequest(checker: any) {
  return true;
}

function sanitizeGetPurposeInfoResponse(checker: any) {
  if (!sanitizePurposeInfoArray(checker.purposeInfo)) {
    return false;
  }
  return true;
}

function sanitizeGetStudentInfoRequest(checker: any) {
  return true;
}

function sanitizeGetStudentInfoResponse(checker: any) {
  if (!sanitizeUserInfoArray(checker.studentInfo)) {
    return false;
  }
  return true;
}

function sanitizeGetTeacherInfoRequest(checker: any) {
  return true;
}

function sanitizeGetTeacherInfoResponse(checker: any) {
  if (!sanitizeUserInfoArray(checker.teacherInfo)) {
    return false;
  }
  return true;
}

function sanitizeOuterStudentInfo(checker: any) {
  if (
    typeof checker.until == "string" &&
    Boolean(checker.until.trim()) &&
    !Number.isNaN(Number(checker.until))
  ) {
    checker.until = Number(checker.until);
  }

  if (
    !sanitizeUserInfo(checker.student) ||
    typeof checker.reason != "string" ||
    (checker.until != undefined && typeof checker.until != "number")
  ) {
    return false;
  }
  return true;
}

function sanitizeGetOuterStudentInfoRequest(checker: any) {
  return true;
}

function sanitizeGetOuterStudentInfoResponse(checker: any) {
  if (!sanitizeOuterStudentInfoArray(checker.outerStudentInfo)) {
    return false;
  }
  return true;
}

function sanitizePostOuterStudentInfoRequest(checker: any) {
  if (!sanitizeOuterStudentInfo(checker.outerStudentInfo)) {
    return false;
  }
  return true;
}

function sanitizePostOuterStudentInfoResponse(checker: any) {
  return true;
}

function sanitizeDeleteOuterStudentInfoRequest(checker: any) {
  if (
    typeof checker.studentUid == "string" &&
    Boolean(checker.studentUid.trim()) &&
    !Number.isNaN(Number(checker.studentUid))
  ) {
    checker.studentUid = Number(checker.studentUid);
  }

  if (typeof checker.studentUid != "number") {
    return false;
  }
  return true;
}

function sanitizeDeleteOuterStudentInfoResponse(checker: any) {
  return true;
}

function sanitizeTimetable(checker: any) {
  if (!sanitizeTimetableCellArrayArray(checker.timetableInfo)) {
    return false;
  }
  return true;
}

function sanitizeTimetableCell(checker: any) {
  if (typeof checker.key != "string" || typeof checker.value != "string") {
    return false;
  }
  return true;
}

function sanitizeGetTimetableRequest(checker: any) {
  if (typeof checker.when != "string") {
    return false;
  }
  return true;
}

function sanitizeGetTimetableResponse(checker: any) {
  if (!sanitizeTimetable(checker.timetable)) {
    return false;
  }
  return true;
}

function sanitizePutTimetableRequest(checker: any) {
  if (
    typeof checker.when != "string" ||
    !sanitizeTimetableCellArray(checker.timetableInfo)
  ) {
    return false;
  }
  return true;
}

function sanitizePutTimetableResponse(checker: any) {
  if (!sanitizeTimetable(checker.timetable)) {
    return false;
  }
  return true;
}

function sanitizeUserInfo(checker: any) {
  if (
    typeof checker.uid == "string" &&
    Boolean(checker.uid.trim()) &&
    !Number.isNaN(Number(checker.uid))
  ) {
    checker.uid = Number(checker.uid);
  }

  if (
    typeof checker.uid != "number" ||
    typeof checker.value != "string" ||
    typeof checker.name != "string"
  ) {
    return false;
  }
  return true;
}

function sanitizeUserPrivateInfo(checker: any) {
  if (
    typeof checker.uid == "string" &&
    Boolean(checker.uid.trim()) &&
    !Number.isNaN(Number(checker.uid))
  ) {
    checker.uid = Number(checker.uid);
  }

  if (
    typeof checker.sid == "string" &&
    Boolean(checker.sid.trim()) &&
    !Number.isNaN(Number(checker.sid))
  ) {
    checker.sid = Number(checker.sid);
  }

  if (
    (checker.uid != undefined && typeof checker.uid != "number") ||
    (checker.sid != undefined && typeof checker.sid != "number") ||
    (checker.id != undefined && typeof checker.id != "string") ||
    (checker.name != undefined && typeof checker.name != "string") ||
    (checker.email != undefined && typeof checker.email != "string") ||
    (checker.password != undefined && typeof checker.password != "string")
  ) {
    return false;
  }
  return true;
}

function sanitizeGetMyPrivateInfoRequest(checker: any) {
  return true;
}

function sanitizeGetMyPrivateInfoResponse(checker: any) {
  if (!sanitizeUserPrivateInfo(checker.private)) {
    return false;
  }
  return true;
}

function sanitizePutEmailRequest(checker: any) {
  if (
    typeof checker.oldEmail != "string" ||
    typeof checker.newEmail != "string"
  ) {
    return false;
  }
  return true;
}

function sanitizePutEmailResponse(checker: any) {
  if (typeof checker.newEmail != "string") {
    return false;
  }
  return true;
}

function sanitizePutPasswordRequest(checker: any) {
  if (
    typeof checker.oldPassword != "string" ||
    typeof checker.newPassword != "string"
  ) {
    return false;
  }
  return true;
}

function sanitizePutPasswordResponse(checker: any) {
  if (typeof checker.newPassword != "string") {
    return false;
  }
  return true;
}

function sanitizeNotification(checker: any) {
  if (
    typeof checker.title != "string" ||
    typeof checker.body != "string" ||
    (checker.link != undefined && typeof checker.link != "string")
  ) {
    return false;
  }
  return true;
}

function sanitizePostPushRequest(checker: any) {
  if (
    typeof checker.targetUid == "string" &&
    Boolean(checker.targetUid.trim()) &&
    !Number.isNaN(Number(checker.targetUid))
  ) {
    checker.targetUid = Number(checker.targetUid);
  }

  if (
    typeof checker.targetUid != "number" ||
    !sanitizeNotification(checker.notification)
  ) {
    return false;
  }
  return true;
}

function sanitizePostPushResponse(checker: any) {
  return true;
}

function sanitizePutPushRequest(checker: any) {
  if (
    typeof checker.pushToken != "string" ||
    typeof checker.deviceId != "string"
  ) {
    return false;
  }
  return true;
}

function sanitizePutPushResponse(checker: any) {
  return true;
}

function sanitizeDeletePushRequest(checker: any) {
  if (typeof checker.devcieId != "string") {
    return false;
  }
  return true;
}

function sanitizeDeletePushResponse(checker: any) {
  return true;
}

function sanitizestringArray(checker: any) {
  if (!Array.isArray(checker)) {
    return false;
  }

  for (let i = 0; i < checker.length; i++) {
    if (typeof checker[i] != "string") {
      return false;
    }
  }
  return true;
}

function sanitizeBbsPostArray(checker: any) {
  if (!Array.isArray(checker)) {
    return false;
  }

  for (let i = 0; i < checker.length; i++) {
    if (!sanitizeBbsPost(checker[i])) {
      return false;
    }
  }
  return true;
}

function sanitizeFileInfoArray(checker: any) {
  if (!Array.isArray(checker)) {
    return false;
  }

  for (let i = 0; i < checker.length; i++) {
    if (!sanitizeFileInfo(checker[i])) {
      return false;
    }
  }
  return true;
}

function sanitizeBbsCommentArray(checker: any) {
  if (!Array.isArray(checker)) {
    return false;
  }

  for (let i = 0; i < checker.length; i++) {
    if (!sanitizeBbsComment(checker[i])) {
      return false;
    }
  }
  return true;
}

function sanitizeSubjectArray(checker: any) {
  if (!Array.isArray(checker)) {
    return false;
  }

  for (let i = 0; i < checker.length; i++) {
    if (!sanitizeSubject(checker[i])) {
      return false;
    }
  }
  return true;
}

function sanitizeUserInfoArray(checker: any) {
  if (!Array.isArray(checker)) {
    return false;
  }

  for (let i = 0; i < checker.length; i++) {
    if (!sanitizeUserInfo(checker[i])) {
      return false;
    }
  }
  return true;
}

function sanitizestringArrayArray(checker: any) {
  if (!Array.isArray(checker)) {
    return false;
  }

  for (let i = 0; i < checker.length; i++) {
    if (!sanitizestringArray(checker[i])) {
      return false;
    }
  }
  return true;
}

function sanitizeSpecialroomInfoArray(checker: any) {
  if (!Array.isArray(checker)) {
    return false;
  }

  for (let i = 0; i < checker.length; i++) {
    if (!sanitizeSpecialroomInfo(checker[i])) {
      return false;
    }
  }
  return true;
}

function sanitizeLocationInfoArray(checker: any) {
  if (!Array.isArray(checker)) {
    return false;
  }

  for (let i = 0; i < checker.length; i++) {
    if (!sanitizeLocationInfo(checker[i])) {
      return false;
    }
  }
  return true;
}

function sanitizePurposeInfoArray(checker: any) {
  if (!Array.isArray(checker)) {
    return false;
  }

  for (let i = 0; i < checker.length; i++) {
    if (!sanitizePurposeInfo(checker[i])) {
      return false;
    }
  }
  return true;
}

function sanitizeOuterStudentInfoArray(checker: any) {
  if (!Array.isArray(checker)) {
    return false;
  }

  for (let i = 0; i < checker.length; i++) {
    if (!sanitizeOuterStudentInfo(checker[i])) {
      return false;
    }
  }
  return true;
}

function sanitizeTimetableCellArrayArray(checker: any) {
  if (!Array.isArray(checker)) {
    return false;
  }

  for (let i = 0; i < checker.length; i++) {
    if (!sanitizeTimetableCellArray(checker[i])) {
      return false;
    }
  }
  return true;
}

function sanitizeTimetableCellArray(checker: any) {
  if (!Array.isArray(checker)) {
    return false;
  }

  for (let i = 0; i < checker.length; i++) {
    if (!sanitizeTimetableCell(checker[i])) {
      return false;
    }
  }
  return true;
}
/** sst */
function sanitizeGetDevieInfoRequest(checker: any) {
  return true;
}

function sanitizePostDeviceApplyRequest(checker: any) {
  if (
    typeof checker.teacherUid == "string" &&
    Boolean(checker.teacherUid.trim()) &&
    !Number.isNaN(Number(checker.teacherUid))
  ) {
    checker.teacherUid = Number(checker.teacherUid);
  }

  if (
    typeof checker.when == "string" &&
    Boolean(checker.when.trim()) &&
    !Number.isNaN(Number(checker.when))
  ) {
    checker.when = Number(checker.when);
  }

  if (
    typeof checker.teacherUid != "number" ||
    !sanitizeUserInfoArray(checker.applicants) ||
    typeof checker.deviceId != "number" ||
    typeof checker.purpose != "string" ||
    typeof checker.when != "number"
  ) {
    return false;
  }
  return true;
}

function sanitizeGetElectronicDeviceApplyRequest(checker: any) {
  if (
    typeof checker.when == "string" &&
    Boolean(checker.when.trim()) &&
    !Number.isNaN(Number(checker.when))
  ) {
    checker.when = Number(checker.when);
  }

  if (typeof checker.when != "number") {
    return false;
  }
  return true;
}

function sanitizeDeleteElectronicDeviceApplyRequest(checker: any) {
  if (
    typeof checker.when == "string" &&
    Boolean(checker.when.trim()) &&
    !Number.isNaN(Number(checker.when))
  ) {
    checker.when = Number(checker.when);
  }

  if (typeof checker.when != "number") {
    return false;
  }
  return true;
}

function sanitizePutElectronicDeviceInfoRequest(checker: any) {
  if (!sanitizeElectroniceDevicefoArray(checker.information)) {
    return false;
  }
  return true;
}

function sanitizeElectroniceDevicefoArray(checker: any) {
  if (!Array.isArray(checker)) {
    return false;
  }
  for (let i = 0; i < checker.length; i++) {
    if (!sanitizeElectronicDeviceInfo(checker[i])) {
      return false;
    }
  }
  return true;
}

function sanitizeElectronicDeviceInfo(checker: any) {
  if (
    typeof checker.applyId == "string" &&
    Boolean(checker.applyId.trim()) &&
    !Number.isNaN(Number(checker.applyId))
  ) {
    checker.applyId = Number(checker.applyId);
  }

  if (
    typeof checker.state == "string" &&
    Boolean(checker.state.trim()) &&
    !Number.isNaN(Number(checker.state))
  ) {
    checker.state = Number(checker.state);
  }

  if (
    typeof checker.when == "string" &&
    Boolean(checker.when.trim()) &&
    !Number.isNaN(Number(checker.when))
  ) {
    checker.when = Number(checker.when);
  }
  if (
    typeof checker.applyId != "number" ||
    typeof checker.state != "number" ||
    !sanitizeUserInfo(checker.master) ||
    !sanitizeUserInfo(checker.teacher) ||
    typeof checker.applicants != "string" ||
    typeof checker.deviceId != "number" ||
    typeof checker.purpose != "string" ||
    typeof checker.when != "number"
  ) {
    return false;
  }
  return true;
}