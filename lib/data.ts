import { prisma } from "@/lib/prisma";
import { getVietnamYMD, vietnamDayRange } from "@/lib/vn-date";


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

export const getCustomers = async (query: string) => {
  try {
    const contacts = await prisma.customer.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive"
        },
      },
      orderBy: {
        id: 'desc',
      }
    });
    return contacts;
  } catch (error) {
    throw new Error("Failed to fetch contact data");
  }
};

export const getContactIncomesByDate = async () => {
  try {
    const { year: currentYear, month: currentMonth, day: currentDay } =
      getVietnamYMD(new Date());

    const dailyTotals = [];

    for (let day = 1; day <= currentDay; day++) {
      const { start, endExclusive } = vietnamDayRange(
        currentYear,
        currentMonth,
        day
      );

      const totalContactIncome = await prisma.contactIncome.count({
        where: {
          dateCreated: {
            gte: start,
            lt: endExclusive,
          },
        },
      });

      dailyTotals.push({
        date: start,
        totalContactIncome: totalContactIncome,
      });
    }

    return dailyTotals;
  } catch (error) {
    throw new Error("Failed to fetch daily totals up to the current date");
  }
};