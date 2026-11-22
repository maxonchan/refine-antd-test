import React from "react";
import { theme } from "antd";

const { useToken } = theme;

export interface SimpleTableColumn<RecordType = any> {
  title: React.ReactNode;
  key: string;
  dataIndex?: string;
  render?: (value: any, record: RecordType, index: number) => React.ReactNode;
}

export interface SimpleTableProps<RecordType = any> {
  columns: SimpleTableColumn<RecordType>[];
  dataSource?: RecordType[];
}

export const SimpleTable = <RecordType extends Record<string, any> = any>({
  columns,
  dataSource = [],
}: SimpleTableProps<RecordType>) => {
  const { token } = useToken();

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: token.colorBgContainer,
        color: token.colorText,
      }}
    >
      <thead>
        <tr
          style={{
            backgroundColor: token.colorFillAlter,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          {columns.map((col) => (
            <th
              key={String(col.key)}
              style={{
                padding: `${token.paddingSM}px ${token.padding}px`,
                color: token.colorTextSecondary,
                textAlign: "left",
              }}
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((item, rowIndex) => (
          <tr
            key={item.id ?? rowIndex}
            style={{
              borderBottom: `1px solid ${token.colorSplit}`,
            }}
          >
            {columns.map((col) => {
              const dataKey = col.dataIndex ?? col.key;
              const value = item[dataKey];

              return (
                <td
                  key={String(col.key)}
                  style={{
                    padding: `${token.paddingSM}px ${token.padding}px`,
                  }}
                >
                  {col.render ? col.render(value, item, rowIndex) : value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
