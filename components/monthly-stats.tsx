import { getContactIncomesByDate } from "@/lib/data";
import Collapse from "./collapse";

export default async function MonthlyStats() {
  const contactIncomes = await getContactIncomesByDate();
  return <Collapse contactIncomes={contactIncomes} />;
}
