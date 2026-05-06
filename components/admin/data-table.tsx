import Link from "next/link";
import { ReactNode } from "react";

export type Column<T> = {
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
};

type Props<T> = {
  rows: T[];
  columns: Column<T>[];
  rowHref?: (row: T) => string;
  rowKey: (row: T) => string;
};

export function DataTable<T>({ rows, columns, rowHref, rowKey }: Props<T>) {
  return (
    <div className="border border-white/15 overflow-x-auto bg-surface-lowest">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/15 bg-black">
            {columns.map((c) => (
              <th
                key={c.header}
                className={`text-label-caps uppercase text-fg-muted text-left px-5 py-4 font-bold ${c.className ?? ""}`}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const href = rowHref?.(row);
            const cells = columns.map((c, i) => (
              <td
                key={i}
                className={`px-5 py-4 align-top ${c.className ?? ""}`}
              >
                {c.cell(row)}
              </td>
            ));
            return (
              <tr
                key={rowKey(row)}
                className="border-b border-white/10 last:border-b-0 hover:bg-surface-low transition-colors duration-200"
              >
                {href ? (
                  cells.map((cell, i) => (
                    <td key={i} className="p-0 align-top">
                      <Link
                        href={href}
                        className="block w-full h-full px-5 py-4"
                      >
                        {columns[i].cell(row)}
                      </Link>
                    </td>
                  ))
                ) : (
                  cells
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
