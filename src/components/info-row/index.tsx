import React from "react";
import { Flex, theme, type FlexProps } from "antd";

const { useToken } = theme;

export interface InfoRowProps {
  /** 标签文本或节点 */
  label: React.ReactNode;
  /** 右侧内容 */
  children?: React.ReactNode;
  /** 标签宽度（可选，可用于多行统一标签宽度） */
  labelWidth?: number | string;
  /** 垂直对齐方式，默认 "flex-start" */
  align?: FlexProps["align"];
  /** 是否显示冒号，默认 true */
  colon?: boolean;
  /** 左侧与右侧的间距，默认 8 */
  gap?: FlexProps["gap"];
  /** 是否微调标签顶部间距（通常在右侧内容有内边距/表格时对齐表头，为 true 时使用 token.paddingSM，或传入具体数值） */
  offsetLabelTop?: boolean | number;
  /** 容器自定义样式 */
  style?: React.CSSProperties;
  className?: string;
  /** 标签自定义样式 */
  labelStyle?: React.CSSProperties;
  /** 内容自定义样式 */
  contentStyle?: React.CSSProperties;
}

/**
 * 通用左标签、右内容的单行信息展示组件
 */
export const InfoRow: React.FC<InfoRowProps> = ({
  label,
  children,
  labelWidth,
  align = "flex-start",
  colon = true,
  gap = 8,
  offsetLabelTop = false,
  style,
  className,
  labelStyle,
  contentStyle,
}) => {
  const { token } = useToken();

  const calculatedPaddingTop =
    typeof offsetLabelTop === "number"
      ? offsetLabelTop
      : offsetLabelTop
      ? token.paddingSM
      : undefined;

  return (
    <Flex
      className={className}
      align={align}
      gap={gap}
      style={{
        width: "100%",
        ...style,
      }}
    >
      <div
        style={{
          width: labelWidth,
          minWidth: labelWidth,
          fontSize: 14,
          fontWeight: 600,
          color: token.colorTextHeading,
          whiteSpace: "nowrap",
          paddingTop: calculatedPaddingTop,
          ...labelStyle,
        }}
      >
        {label}
        {colon ? "：" : ""}
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          color: token.colorText,
          fontSize: 14,
          ...contentStyle,
        }}
      >
        {children}
      </div>
    </Flex>
  );
};
