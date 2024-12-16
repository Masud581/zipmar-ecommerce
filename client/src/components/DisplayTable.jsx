import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const DisplayTable = ({ data, columns }) => {
  const table = useReactTable({
    data: data || [], // Ensure data is always an array
    columns: columns, // Fixed column prop naming
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 overflow-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-800 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className="border px-4 py-2">Sr. No</th>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border px-4 py-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id} className="odd:bg-gray-100 even:bg-white">
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-4 py-2 text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No data available to display.
        </div>
      )}
    </div>
  );
};

export default DisplayTable;
