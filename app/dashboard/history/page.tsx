import HistoryTable from "@/components/HistoryTable";
import { getQueries } from "@/lib/actions";

const HistoryPage = async() => {
  const queries = await getQueries();

  return (
    <div className="p-10 my-5 mx-5 mb-5 rounded-lg bg-white dark:bg-gray-900 transition-all duration-500 ease-in-out border border-gray-100 dark:border-gray-800 shadow-lg dark:shadow-gray-900/30 flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-500">
        History
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2 transition-colors duration-500">
        Your search history
      </p>
      <HistoryTable query={queries.data!}/>
    </div>
  );
};

export default HistoryPage;