import CommonApi from "@ireves/common-api";
import dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: ".env.production" });
class V1 extends CommonApi.RouterBase {
  constructor() {
    super();
    this.setPath("/v1");
  }
}

export default V1;
