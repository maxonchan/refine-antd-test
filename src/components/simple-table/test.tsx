import { theme } from "antd";
import React from "react";

interface SimpleTableColumn<RecordType = any> {
  title: React.ReactNode;
  key: string;
  render?: (value: any, record: RecordType, index: number) => React.ReactNode;
}

interface SimpleTableProps<RecordType = any> {
  columns: SimpleTableColumn[];
  dataSource: RecordType[];
}

const { useToken } = theme;

export const SimpleTable = <RecordType extends Record<string, any> = any>({
  columns,
  dataSource,
}: SimpleTableProps<RecordType>) => {
  const token = useToken();
  return (
    <>
      <table
        style={{
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => {
              return <th key={col.key}>{col.title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((item, index) => {
            return (
              <tr key={item.id ?? index}>
                {columns.map((col) => {
                  const key = col.key;
                  const value = item[key];
                  return (
                    <td key={key}>
                      {col.render ? col.render(value, item, index) : value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
