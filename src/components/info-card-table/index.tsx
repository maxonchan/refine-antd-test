import React from "react";
import { theme } from "antd";

const { useToken } = theme;

export interface InfoCardTableItem {
  key?: string | number;
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface InfoCardTableProps {
  /** 顶部标题（通栏展示） */
  title?: React.ReactNode;
  /** 数据项列表 */
  items: InfoCardTableItem[];
  /** 左侧标签列宽度，默认 "40%" */
  labelWidth?: number | string;
  /** 是否带有边框，默认 true */
  bordered?: boolean;
  /** 外层容器自定义样式 */
  style?: React.CSSProperties;
  className?: string;
  /** 表头标题单元格自定义样式 */
  headerStyle?: React.CSSProperties;
  /** 标签单元格自定义样式 */
  labelStyle?: React.CSSProperties;
  /** 内容单元格自定义样式 */
  valueStyle?: React.CSSProperties;
}

/**
 * 信息展示卡片表格组件
 * 顶部为通栏标题，下方为两列 key-value 单元格，带完整表格网格线
 */
export const InfoCardTable: React.FC<InfoCardTableProps> = ({
  title,
  items = [],
  labelWidth = "40%",
  bordered = true,
  style,
  className,
  headerStyle,
  labelStyle,
  valueStyle,
}) => {
  const { token } = useToken();

  const cellBorder = bordered ? `1px solid ${token.colorBorderSecondary}` : "none";

  const baseCellStyle: React.CSSProperties = {
    border: cellBorder,
    padding: `${token.paddingXS}px ${token.paddingSM}px`,
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    color: token.colorText,
    verticalAlign: "middle",
  };

  return (
    <table
      className={className}
      style={{
        width: "100%",
        borderCollapse: "collapse",
        border: cellBorder,
        backgroundColor: token.colorBgContainer,
        ...style,
      }}
    >
      {title && (
        <thead>
          <tr>
            <th
              colSpan={2}
              style={{
                ...baseCellStyle,
                textAlign: "left",
                fontWeight: token.fontWeightStrong,
                backgroundColor: token.colorFillAlter,
                ...headerStyle,
              }}
            >
              {title}
            </th>
          </tr>
        </thead>
      )}
      <tbody>
        {items.map((item, index) => (
          <tr key={item.key ?? index}>
            <td
              style={{
                ...baseCellStyle,
                width: labelWidth,
                color: token.colorTextSecondary,
                ...labelStyle,
              }}
            >
              {item.label}
            </td>
            <td
              style={{
                ...baseCellStyle,
                ...valueStyle,
              }}
            >
              {item.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
