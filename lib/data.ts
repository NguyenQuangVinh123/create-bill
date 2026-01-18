import { prisma } from "@/lib/prisma";


export const getContactIncomes = async (query: string, date?: string) => {
  try {
    let startOfDay, endOfDay;
    if (date) {
      const selectedDate = new Date(date);
      startOfDay = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate(), 0, 0, 0));
      endOfDay = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate(), 23, 59, 59, 999));
    } else {
      const currentDate = new Date();
      startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
      endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
    }
    const dateFilter = {
      dateCreated: {
        gte: startOfDay,
        lte: endOfDay,
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
    const currentDate = new Date();
    const currentMonth = currentDate.getUTCMonth();
    const currentYear = currentDate.getUTCFullYear();
    const currentDay = currentDate.getUTCDate(); // Get current day of the month

    const dailyTotals = [];

    for (let day = 1; day <= currentDay; day++) { // Loop only up to the current day
      const startOfDay = new Date(Date.UTC(currentYear, currentMonth, day, 0, 0, 0));
      const endOfDay = new Date(Date.UTC(currentYear, currentMonth, day, 23, 59, 59, 999));

      const totalContactIncome = await prisma.contactIncome.count({
        where: {
          dateCreated: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
      });

      dailyTotals.push({
        date: startOfDay,
        totalContactIncome: totalContactIncome,
      });
    }

    return dailyTotals;
  } catch (error) {
    throw new Error("Failed to fetch daily totals up to the current date");
  }
};