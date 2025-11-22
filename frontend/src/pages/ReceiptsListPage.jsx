import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useOperationStore } from "../stores/useOperationStore";

const ReceiptsListPage = () => {
  const { fetchOperations, operations, loading } = useOperationStore();

  useEffect(() => {
    fetchOperations("receipt");
  }, [fetchOperations]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-pink-300">Receipts</h1>

        <Link
          to="/operations/receipts/new"
          className="px-3 py-1 rounded bg-pink-500 text-sm hover:bg-pink-600"
        >
          New Receipt
        </Link>
      </div>

      {loading && <p className="text-sm text-slate-400">Loading...</p>}

      <div className="border border-pink-400/40 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-900/80 border-b border-pink-400/40">
            <tr>
              <th className="px-3 py-2 text-left">Reference</th>
              <th className="px-3 py-2 text-left">From</th>
              <th className="px-3 py-2 text-left">To</th>
              <th className="px-3 py-2 text-left">Schedule date</th>
              <th className="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((op) => (
              <tr
                key={op._id}
                className="border-b border-slate-800 last:border-none"
              >
                <td className="px-3 py-2">
                  <Link
                    to={`/operations/receipts/${op._id}`}
                    className="text-pink-300 hover:underline"
                  >
                    {op.reference}
                  </Link>
                </td>
                <td className="px-3 py-2">{op.fromParty}</td>
                <td className="px-3 py-2">{op.toParty}</td>
                <td className="px-3 py-2">
                  {op.scheduleDate
                    ? new Date(op.scheduleDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-3 py-2 capitalize">{op.status}</td>
              </tr>
            ))}
            {!operations.length && !loading && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-4 text-center text-slate-500"
                >
                  No receipts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceiptsListPage;
