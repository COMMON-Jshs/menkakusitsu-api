import CommonApi from "@ireves/common-api";
import { v1 } from "@common-jshs/menkakusitsu-lib";
import { Request, Response } from "express";
import V1 from "@/router/v1";
import { Sanitizer } from "@/utils";

class Timetable extends V1 {
  constructor() {
    super();
    this.setPath("/timetable");
    this.models = [
      { method: "get", path: "/:when", controller: this.onGetTimetable },
      { method: "put", path: "/:when", controller: this.onPutTimetable },
    ];
  }

  async onGetTimetable(req: Request, res: Response) {
    const whenRaw = String(req.params.when || "");
    if (!/^(\d{8}|\d{4}-\d{2}-\d{2})$/.test(whenRaw)) {
      throw new CommonApi.HttpException(400);
    }

    const formattedWhen = whenRaw.replace(/-/g, "");

    const rows = (await CommonApi.getAllAsync(

      "SELECT grade, `class`, period, subject FROM timetable WHERE REPLACE(`when`, '-', '')=? ORDER BY grade, `class`, period",
      [formattedWhen]
    )) as any[];

    const timetableInfo: v1.TimetableCell[][] = [];
    const groups = new Map<
      string,
      { grade: number; classNum: number; subjects: Record<number, string> }
    >();

    for (const r of rows) {
      const grade = Number(r.grade);
      const classNum = Number(r.class);
      const period = Number(r.period);
      const subject = r.subject ?? "null";
      const key = `${grade}-${classNum}`;
      if (!groups.has(key)) {
        groups.set(key, { grade, classNum, subjects: {} });
      }
      groups.get(key)!.subjects[period] = subject;
    }

    const sortedKeys = Array.from(groups.keys()).sort((a, b) => {
      const [ga, ca] = a.split("-").map((x) => Number(x));
      const [gb, cb] = b.split("-").map((x) => Number(x));
      if (ga !== gb) return ga - gb;
      return ca - cb;
    });

    for (const key of sortedKeys) {
      const g = groups.get(key)!;
      const row: v1.TimetableCell[] = [];
      for (let p = 1; p <= 7; p++) {
        row.push({
          key: `${g.grade}-${g.classNum}-${p}`,
          value: g.subjects[p] ?? "null",
        });
      }
      timetableInfo.push(row);
    }

    const getTimetableResponse: v1.GetTimetableResponse = {
      status: 0,
      message: "",
      timetable: { timetableInfo },
    };

    res.status(200).json(getTimetableResponse);
  }

  async onPutTimetable(req: Request, res: Response) {
    const request: v1.PutTimetableRequest = req.body;
    if (!Sanitizer.sanitizeRequest(request, "PutTimetableRequest"))
      throw new CommonApi.HttpException(400);

    const whenRaw = String(req.params.when || "");
    if (!/^(\d{8}|\d{4}-\d{2}-\d{2})$/.test(whenRaw)) {
      throw new CommonApi.HttpException(400);
    }
    const when = whenRaw.replace(/-/g, "");
    if (!when || !request.timetableInfo) throw new CommonApi.HttpException(400);

    for (const row of request.timetableInfo) {
      if (!Array.isArray(row)) continue;
      for (const cell of row) {
        if (!cell?.key) continue;
        const parts = cell.key.split("-");
        if (parts.length < 3) continue;
        const grade = Number(parts[0]);
        const classNum = Number(parts[1]);
        const period = Number(parts[2]);

        await CommonApi.runAsync(
          `REPLACE INTO timetable (\`when\`, grade, \`class\`, period, subject, updated_at)
           VALUES (?, ?, ?, ?, ?, NOW())`,
          [when, grade, classNum, period, cell.value]
        );
      }
    }

    const putTimetableResponse: v1.PutTimetableResponse = {
      status: 0,
      message: "",
      timetable: { timetableInfo: [] },
    };

    res.status(200).json(putTimetableResponse);
  }
}

export default Timetable;