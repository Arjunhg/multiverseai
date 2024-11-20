import Image from "next/image";

interface Props {
  query: {
    query: string;
    template: any;
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    contents: string | null;
  }[];
}

const HistoryTable = ({ query }: Props) => {
  const wordCount = (text: string) => text.split(" ").length;
    
  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full transition-all duration-500 ease-in-out">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-500">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-500">
                <thead className="bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-500 sm:pl-6 lg:pl-8"
                    >
                      Template
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-500"
                    >
                      Query
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-500"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-500"
                    >
                      Word Count
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900 transition-all duration-500">
                  {query.map((q) => (
                    <tr 
                      key={q.id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 lg:pl-8">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full transition-transform duration-500 hover:scale-110">
                            <Image
                              src={q.template.icon}
                              alt="icon"
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white transition-colors duration-500">
                            {q.template.name}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-500">
                        {q.query}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-500">
                        {q.createdAt.toDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-500">
                        {wordCount(q.contents!)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;