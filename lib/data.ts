import { prisma } from "@/lib/prisma";
import { getVietnamYMD, vietnamDayRange } from "@/lib/vn-date";
import { unstable_cache } from "next/cache";


export const getContactIncomes = async (query: string, date?: string) => {
  try {
    let startOfDay: Date;
    let endExclusive: Date;
    if (date) {
      const selectedDate = new Date(date);
      const y = selectedDate.getUTCFullYear();
      const m = selectedDate.getUTCMonth() + 1;
      const d = selectedDate.getUTCDate();
      const range = vietnamDayRange(y, m, d);
      startOfDay = range.start;
      endExclusive = range.endExclusive;
    } else {
      const { year, month, day } = getVietnamYMD(new Date());
      const range = vietnamDayRange(year, month, day);
      startOfDay = range.start;
      endExclusive = range.endExclusive;
    }
    const dateFilter = {
      dateCreated: {
        gte: startOfDay,
        lt: endExclusive,
      },
    };
    const contacts = await prisma.contactIncome.findMany({
      where: {
        customer: {
          name: {
            contains: query,
            mode: "insensitive"
          }
        },
        ...(query ? (date ? dateFilter : {}) : dateFilter),
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        }
      },
      orderBy: {
        dateCreated: 'desc',
      }
    });

    return contacts;
  } catch (error) {
    console.error("Error fetching bills:", error);
    throw new Error("Failed to fetch contact data");
  }
};

async function fetchCustomers(query: string) {
  return prisma.customer.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}

export const getCustomers = async (query: string) => {
  try {
    if (!query) {
      return getCachedCustomers();
    }
    return fetchCustomers(query);
  } catch (error) {
    throw new Error("Failed to fetch contact data");
  }
};

const getCachedCustomers = unstable_cache(
  () => fetchCustomers(""),
  ["customers-list"],
  { revalidate: 120, tags: ["contacts"] }
);

async function fetchContactIncomesByDate() {
  const { year: currentYear, month: currentMonth, day: currentDay } =
    getVietnamYMD(new Date());

  const monthStart = vietnamDayRange(currentYear, currentMonth, 1).start;
  const monthEnd = vietnamDayRange(
    currentYear,
    currentMonth,
    currentDay
  ).endExclusive;

  const rows = await prisma.$queryRaw<
    Array<{ day: Date; count: bigint }>
  >`
    SELECT
      (ci."dateCreated" AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Ho_Chi_Minh')::date AS day,
      COUNT(*)::bigint AS count
    FROM "ContactIncome" ci
    WHERE ci."dateCreated" >= ${monthStart}
      AND ci."dateCreated" < ${monthEnd}
    GROUP BY 1
    ORDER BY 1
  `;

  const countByDay = new Map<number, number>();
  for (const row of rows) {
    const { day } = getVietnamYMD(new Date(row.day));
    countByDay.set(day, Number(row.count));
  }

  const dailyTotals = [];
  for (let day = 1; day <= currentDay; day++) {
    const { start } = vietnamDayRange(currentYear, currentMonth, day);
    dailyTotals.push({
      date: start,
      totalContactIncome: countByDay.get(day) ?? 0,
    });
  }

  return dailyTotals;
}

export const getContactIncomesByDate = unstable_cache(
  async () => {
    try {
      return await fetchContactIncomesByDate();
    } catch (error) {
      throw new Error("Failed to fetch daily totals up to the current date");
    }
  },
  ["contact-incomes-by-date"],
  { revalidate: 60, tags: ["contacts"] }
);