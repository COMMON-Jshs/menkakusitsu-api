import CommonApi from "@ireves/common-api";
import { v1, Permission } from "@common-jshs/menkakusitsu-lib";
import { Request, Response } from "express";

import V1 from "@/router/v1";
import { Api, Utility, Sanitizer } from "@/utils";

class MasterCode extends V1 {
  constructor() {
    super();
    this.setPath("/mastercode");
    this.models = [
      {
        method: "get",
        path: "/list",
        authType: "access",
        controller: this.onGetInfo,
      },
    ];
  }

  async onGetInfo(req: Request, res: Response) {
    const codetype:string = req.query['when'] as string;


    const codeList = await Api.getCodeMasterInfo(codetype);
    if (!codeList) {
      throw new CommonApi.ResponseException(
        1,
        `${codetype}코드 타입이 존재하지 않습니다..`
      );
    }
    const response: v1.GetCodeResponse = {
      status: 0,
      message: "",
      mastercodeinfo : codeList,
    };
    res.status(200).json(response);
  }

}

export default MasterCode;
