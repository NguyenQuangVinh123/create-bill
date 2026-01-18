import { getContactIncomes, getContactIncomesByDate } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Collapse from "./collapse";

const ContactTable = async ({
  query,
  date,
}: {
  query: string;
  date: string;
}) => {
  const contacts = await getContactIncomes(query, date);
  const contactIncomes = await getContactIncomesByDate();
  return (
    <>
      <div className="">Total: {contacts.length}</div>
      <Collapse contactIncomes={contactIncomes} />
    <table className="w-full m-auto border border-gray-300 shadow-lg rounded-lg overflow-hidden">
      {/* Table Header */}
      <thead className="bg-gradient-to-r bg-pink-400  text-white text-sm uppercase">
        <tr className="text-xs md:text-lg">
          <th className="px-1 py-4 lg:px-6">#</th>
          <th className="px-1 py-4 lg:px-6">Name</th>
          <th className="px-1 py-4 lg:px-6">Note</th>
          <th className="px-1 py-4 lg:px-6">Created</th>
        </tr>
      </thead>
      {/* Table Body */}
      <tbody className="text-gray-700 text-sm bg-white">
        {contacts.map((contact) => (
          <tr
            key={contact.id}
            className="border-b transition-all duration-200 hover:bg-gray-100"
          >
            <td className="px-1 py-4 lg:px-6 text-pink-600 text-center">
              {contact.id}
            </td>
            <td className="px-1 py-4 lg:px-6 font-semibold text-center">
              {contact.customer.name}
            </td>
            <td className="px-1 py-4 lg:px-6 font-semibold text-center">
              {contact.note || "-"}
            </td>
            <td className="px-1 py-4 lg:px-6 text-gray-500 text-center">
              {formatDate(contact.dateCreated)}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};

export default ContactTable;
