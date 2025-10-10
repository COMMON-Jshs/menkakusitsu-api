import CommonApi, { ResponseException } from "@ireves/common-api";
import { Permission, v1 } from "@common-jshs/menkakusitsu-lib";
import { Request, Response } from "express";
import dayjs from "dayjs";

import V1 from "@/router/v1";
import { Sanitizer, Utility } from "@/utils";

class Auth extends V1 {
  constructor() {
    super();
    this.setPath("/auth");
    this.models = [
      {
        method: "post",
        path: "/account",
        controller: this.onPostRegister,
      },
      {
        method: "delete",
        path: "/account",
        permission: Permission.Student,
        controller: this.onDeleteSecession,
      },
      {
        method: "post",
        path: "/login",
        controller: this.onPostLogin,
      },
      {
        method: "post",
        path: "/refresh",
        authType: "refresh",
        controller: this.onPostRefresh,
      },
      {
        method: "delete",
        path: "/logout",
        authType: "access",
        controller: this.onDeleteLogout,
      },
      {
        method: "put",
        path: "/reset/password",
        controller: this.onPutForgotPassword,
      },
    ];
  }

  async onPostRegister(req: Request, res: Response) {
    const request: v1.PostRegisterRequest = req.body;
    if (!Sanitizer.sanitizeRequest(request, "PostRegisterRequest")) {
      throw new CommonApi.HttpException(400);
    }

    const day = dayjs();
    if (day.month() > 9) {
      throw new CommonApi.ResponseException(-1, "신입생 등록 기간이 아닙니다.");
    }
    const count = await CommonApi.getFirstAsync(
      "SELECT * FROM (SELECT COUNT(id) as idCnt FROM user WHERE id=?) AS id, (SELECT COUNT(sid) as sidCnt FROM user WHERE sid=?) AS sid, (SELECT COUNT(name) as nameCnt FROM user WHERE name=?) AS name, (SELECT COUNT(email) as emailCnt FROM user WHERE email=?) AS email;",
      [request.id, request.sid, request.name, request.email]
    );

    if (!count) {
      throw new CommonApi.HttpException(500);
    }
    if (count.idCnt > 0) {
      throw new CommonApi.ResponseException(-2, "이미 사용중인 ID입니다.");
    }
    if (request.sid != 9999 && count.sidCnt > 0) {
      throw new CommonApi.ResponseException(
        -3,
        "이미 가입된 학번입니다.\n자신이 가입한 적이 없다면 관리자에게 문의하세요."
      );
    }
    if (count.nameCnt > 0) {
      throw new CommonApi.ResponseException(
        -4,
        "이미 가입된 이름입니다.\n자신이 가입한 적이 없다면 관리자에게 문의하세요."
      );
    }
    await CommonApi.runAsync(
      "INSERT INTO user (sid, name, email, id, password, state) VALUES (?, ?, ?, ?, ?, ?)",
      [request.sid, request.name, request.email, request.id, request.password, 0]
    );
    const response: v1.PostRegisterResponse = {
      status: 0,
      message: "",
    };
    res.status(200).json(response);
  }

  async onDeleteSecession(req: Request, res: Response) {
    const request: v1.DeleteSecessionRequest = req.body;
    if (!Sanitizer.sanitizeRequest(request, "DeleteSecessionRequest")) {
      throw new CommonApi.HttpException(400);
    }

    if (request.id) {
      await CommonApi.runAsync("UPDATE user SET state=2 WHERE id=?", [
        request.id,
      ]);
    } else if (request.name) {
      await CommonApi.runAsync("UPDATE user SET state=2 WHERE name=?", [
        request.name,
      ]);
    } else if (request.uid) {
      await CommonApi.runAsync("UPDATE user SET state=2 WHERE uid=?", [
        request.uid,
      ]);
    } else {
      const payload = Utility.parseBearer(req.headers.authorization!);
      if (payload.hasPermission(Permission.Dev)) {
        throw new ResponseException(
          -1,
          "개발자 계정은 API로 탈퇴시킬 수 없습니다!"
        );
      }
      await CommonApi.runAsync("UPDATE user SET state=2 WHERE uid=?", [
        payload.uid,
      ]);
    }

    const response: v1.DeleteSecessionResponse = {
      status: 0,
      message: "",
    };
    res.status(200).json(response);
  }

  async onPostLogin(req: Request, res: Response) {
    const request: v1.PostLoginRequest = req.body;
    if (!Sanitizer.sanitizeRequest(request, "PostLoginRequest")) {
      throw new CommonApi.HttpException(400);
    }

    const user = await CommonApi.getFirstAsync(
      "SELECT uid, id, password, email, permission, state FROM user WHERE id=?",
      [request.id]
    );

    if (!user) {
      throw new CommonApi.ResponseException(-1, "아이디가 존재하지 않습니다.");
    }

    if (user.password === request.password) {
      if (user.state == 0) {
        throw new CommonApi.ResponseException(-2, "승인 대기 중인 계정입니다.");
      }
      if (user.state == 2) {
        throw new CommonApi.ResponseException(
          -3,
          "졸업, 휴학, 자퇴 등의 이유로 삭제된 계정입니다."
        );
      }
      const refreshToken = CommonApi.createRefreshToken({
        uid: user.uid,
        id: user.id,
        permission: user.permission,
      });
      await CommonApi.runAsync(
        "INSERT INTO refresh_token (uid, token) VALUES (?, ?) ON DUPLICATE KEY UPDATE uid=?, token=?;",
        [user.uid, refreshToken, user.uid, refreshToken]
      );
      const callbacks: string[] = [];
      // if (userInfo.needChangePw) {
      //     callbacks.push("needChangePw");
      // }
      // if (!userInfo.email) {
      //     callbacks.push("needChangeEmail");
      // }
      const response: v1.PostLoginResponse = {
        status: 0,
        message: "",
        accessToken: CommonApi.createAccessToken({
          uid: user.uid,
          id: user.id,
          permission: user.permission,
        }),
        refreshToken: refreshToken,
        callbacks: callbacks,
      };
      res.status(200).json(response);
    } else {
      throw new CommonApi.ResponseException(-2, "비밀번호가 틀렸습니다.");
    }
  }

  async onPostRefresh(req: Request, res: Response) {
    const payload = Utility.parseBearer(req.headers.authorization!);
    const request: v1.PostRefreshRequest = req.body;

    if (!Sanitizer.sanitizeRequest(request, "PostRefreshRequest")) {
      throw new CommonApi.HttpException(400);
    }

    const refresh_token = await CommonApi.getFirstAsync(
      "SELECT token FROM refresh_token WHERE uid=?",
      [payload.uid]
    );

    if (!refresh_token || !refresh_token.token) {
      throw new CommonApi.ResponseException(-1, "로그아웃 된 계정입니다.");
    }

    const originPayload = Utility.getJwtPayload(refresh_token.token);

    if (payload.jti != originPayload.jti) {
      await CommonApi.runAsync(
        "UPDATE refresh_token SET token=NULL WHERE uid=?",
        [payload.uid]
      );

      throw new CommonApi.ResponseException(
        -2,
        "다른 기기에서의 접속이 감지되었습니다."
      );
    }

    const refreshToken = CommonApi.createRefreshToken({
      uid: payload.uid,
      id: payload.id,
      permission: payload.permission,
    });
    await CommonApi.runAsync(
      "INSERT INTO refresh_token (uid, token) VALUES (?, ?) ON DUPLICATE KEY UPDATE uid=?, token=?;",
      [payload.uid, refreshToken, payload.uid, refreshToken]
    );
    const response: v1.PostRefreshResponse = {
      status: 0,
      message: "",
      accessToken: CommonApi.createAccessToken({
        uid: payload.uid,
        id: payload.id,
        permission: payload.permission,
      }),
      refreshToken: refreshToken,
    };
    res.status(200).json(response);
  }

  async onDeleteLogout(req: Request, res: Response) {
    const payload = Utility.parseBearer(req.headers.authorization!);

    const request: v1.DeleteLogoutRequest = req.body;

    if (!Sanitizer.sanitizeRequest(request, "DeleteLogoutRequest")) {
      throw new CommonApi.HttpException(400);
    }

    await CommonApi.runAsync(
      "UPDATE refresh_token SET token=NULL WHERE uid=?",
      [payload.uid]
    );
    const response: v1.DeleteLogoutResponse = {
      status: 0,
      message: "",
    };
    res.status(200).json(response);
  }

  async onPutForgotPassword(req: Request, res: Response) {
    const request: v1.PutForgotPasswordRequest = req.body;
    if (!Sanitizer.sanitizeRequest(request, "PutForgotPasswordRequest")) {
      throw new CommonApi.HttpException(400);
    }

    const user = await CommonApi.getFirstAsync(
      "SELECT * FROM user WHERE id=?",
      [request.id]
    );
    if (!user) {
      throw new CommonApi.ResponseException(-1, "존재하지 않는 사용자입니다.");
    }

    if (!user.email) {
      throw new CommonApi.ResponseException(
        -2,
        "복구 이메일을 등록하시지 않으셔서 비밀번호 초기화가 불가능합니다.\n관리자에게 직접 문의해주십시오."
      );
    }
    if (request.email != user.email) {
      throw new CommonApi.ResponseException(
        -3,
        "이메일을 잘못 입력하셨습니다."
      );
    }

    const response: v1.PutForgotPasswordResponse = {
      status: 0,
      message: "",
    };
    res.status(200).json(response);
  }
}

export default Auth;
