/** Ngày theo lịch Việt Nam (Asia/Ho_Chi_Minh, UTC+7, không DST). */

const MS_PER_DAY = 86400000;

export type VietnamYMD = { year: number; month: number; day: number };

/** Lấy năm / tháng / ngày lịch tại múi Asia/Ho_Chi_Minh. */
export function getVietnamYMD(d: Date = new Date()): VietnamYMD {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = fmt.formatToParts(d);
  const year = Number(parts.find((p) => p.type === "year")!.value);
  const month = Number(parts.find((p) => p.type === "month")!.value);
  const day = Number(parts.find((p) => p.type === "day")!.value);
  return { year, month, day };
}

/**
 * [start, endExclusive) trong UTC tương ứng một ngày lịch (year, month 1–12, day) tại VN.
 * Nửa đêm VN = UTC ngày trước 17:00.
 */
export function vietnamDayRange(
  year: number,
  month: number,
  day: number
): { start: Date; endExclusive: Date } {
  const start = new Date(Date.UTC(year, month - 1, day, -7, 0, 0, 0));
  return { start, endExclusive: new Date(start.getTime() + MS_PER_DAY) };
}
