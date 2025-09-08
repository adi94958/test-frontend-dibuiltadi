import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button, Text, Loading, SelectInput } from "../Elements";

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No data found.",
  className = "",
  pagination = null,
  onPageChange = null,
  onPerPageChange = null,
  showPagination = true,
}) => {
  // Loading state
  const LoadingState = ({ colSpan }) => (
    <tr>
      <td colSpan={colSpan} className="px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2">
          <Loading size="md" />
          <Text variant="body" color="secondary">
            Loading Data...
          </Text>
        </div>
      </td>
    </tr>
  );

  // Empty state
  const EmptyState = ({ colSpan, message }) => (
    <tr>
      <td colSpan={colSpan} className="px-6 py-8 text-center">
        <Text variant="body" color="secondary">
          {message}
        </Text>
      </td>
    </tr>
  );

  return (
    <div className={className}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 border-t border-gray-300">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-3 md:px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase"
                  style={{ width: column.width }}
                >
                  <Text variant="body">{column.title}</Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <LoadingState colSpan={columns.length} />
            ) : data.length === 0 ? (
              <EmptyState colSpan={columns.length} message={emptyMessage} />
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || `row-${rowIndex}`}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-3 md:px-6 py-4 whitespace-nowrap"
                    >
                      {column.render ? (
                        column.render(row[column.key], row, rowIndex)
                      ) : (
                        <Text variant="caption">{row[column.key] || "-"}</Text>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPagination && pagination && data.length > 0 && (
        <PaginationControls
          pagination={pagination}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
        />
      )}
    </div>
  );
};

const PaginationControls = ({ pagination, onPageChange, onPerPageChange }) => {
  const perPageOptions = [
    { value: 10, label: "10" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  const startItem = (pagination.currentPage - 1) * pagination.perPage + 1;
  const endItem = Math.min(
    pagination.currentPage * pagination.perPage,
    pagination.total
  );

  return (
    <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 order-2 sm:order-1 h-8">
          <Text variant="caption" color="secondary" className="leading-8">
            Show
          </Text>
          <SelectInput
            value={pagination.perPage}
            onChange={(e) => onPerPageChange?.(parseInt(e.target.value))}
            options={perPageOptions}
            className="w-16 sm:w-20 mb-0 h-8"
            labelType="placeholder"
          />
          <Text
            variant="caption"
            color="secondary"
            className="hidden sm:inline leading-8"
          >
            entries
          </Text>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 order-1 sm:order-2">
          <Text
            variant="caption"
            color="secondary"
            className="text-center sm:text-left leading-8"
          >
            {startItem}-{endItem} of {pagination.total}
          </Text>

          <div className="flex items-center gap-1 h-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1}
              icon={<ChevronLeftIcon className="w-4 h-4" />}
              className="w-8 h-8 p-0 flex items-center justify-center"
            />

            <div className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded border border-blue-200 min-w-[2rem] h-8 flex items-center justify-center">
              {pagination.currentPage}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(pagination.currentPage + 1)}
              disabled={
                pagination.currentPage * pagination.perPage >= pagination.total
              }
              icon={<ChevronRightIcon className="w-4 h-4" />}
              className="w-8 h-8 p-0 flex items-center justify-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
