import cron from "node-cron";
import axios from "axios";
import CommonApi from "@ireves/common-api";

import dotenv from "dotenv";

dotenv.config({ path: ".env.production" });

const NEIS_API_KEY = process.env.NEIS_API_KEY!;

const SCHOOL_CODE = "9290066";
const ATPT_OFCDC_SC_CODE = "T10";

export async function fetchTimetableFromNeis(targetDate: string) {
  try {
    const apiUrl = `https://open.neis.go.kr/hub/hisTimetable?KEY=${NEIS_API_KEY}&Type=json&pIndex=1&pSize=1000&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SCHOOL_CODE}&TI_FROM_YMD=${targetDate}&TI_TO_YMD=${targetDate}`;
    const res = await axios.get(apiUrl);

    console.log(`[DEBUG] API response head:`, res.data?.hisTimetable?.[0]);
    
    const data = res.data?.hisTimetable?.find((x: any) => x.row)?.row;
    if (!Array.isArray(data) || data.length === 0) {
      console.log(`[WARN] No timetable data for ${targetDate}`);
      return;
    }

    for (const item of data) {
      const grade = Number(item.GRADE);
      const classNum = Number(item.CLASS_NM);
      const period = Number(item.PERIO);
      const subject = item.ITRT_CNTNT || "null";

      await CommonApi.runAsync(
        `REPLACE INTO timetable (\`when\`, grade, \`class\`, period, subject, updated_at)
         VALUES (?, ?, ?, ?, ?, NOW())`,
        [targetDate, grade, classNum, period, subject]
      );
    }

    console.log(`[INFO] Timetable synced for ${targetDate} (${data.length} items)`);
  } catch (err) {
    console.error(`[ERROR] Timetable fetch failed for ${targetDate}:`, err);
  }
}

cron.schedule("1 0 * * *", async () => {
  const target = new Date();
  target.setDate(target.getDate() + 1);
  const ymd =
    target.getFullYear().toString() +
    String(target.getMonth() + 1).padStart(2, "0") +
    String(target.getDate()).padStart(2, "0");
  console.log(`[INFO] Scheduled fetch for ${ymd}`);
  await fetchTimetableFromNeis(ymd);
});

(async () => {
  const now = new Date();
  const today =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  console.log(`[INFO] Initial fetch for ${today}`);
  await fetchTimetableFromNeis(today);
})();