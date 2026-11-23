import React from "react";
import { Button, Card, Checkbox, Radio, Space, theme } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { useToken } = theme;

export interface CheckableCardProps {
  /** 卡片标题（可选） */
  title?: React.ReactNode;
  /** 右上角附加自定义内容 */
  extra?: React.ReactNode;
  children?: React.ReactNode;
  /** 卡片右上方是一个X【删除】按钮，删除按钮可配置是否显示 */
  showDelete?: boolean;
  onDelete?: () => void;
  deleteTitle?: string;
  /** 是否处于选择模式 */
  selectable?: boolean;
  selected?: boolean;
  /** 选择控件类型，默认 "checkbox"（多选），可配置为 "radio"（单选） */
  selectionType?: "checkbox" | "radio";
  onSelectChange?: (selected: boolean) => void;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * 通用单行可勾选/可删除卡片容器组件
 */
export const CheckableCard: React.FC<CheckableCardProps> = ({
  title,
  extra,
  children,
  showDelete = false,
  onDelete,
  deleteTitle = "削除",
  selectable = false,
  selected = false,
  selectionType = "checkbox",
  onSelectChange,
  onClick,
  style,
  className,
}) => {
  const { token } = useToken();

  const handleCardClick = () => {
    if (selectable) {
      if (selectionType === "radio") {
        onSelectChange?.(!selected);
      } else {
        onSelectChange?.(!selected);
      }
    }
    onClick?.();
  };

  const actionExtra = (
    <Space size={8} align="center" onClick={(e) => e.stopPropagation()}>
      {selectable &&
        (selectionType === "radio" ? (
          <Radio
            checked={selected}
            onChange={(e) => onSelectChange?.(e.target.checked)}
          />
        ) : (
          <Checkbox
            checked={selected}
            onChange={(e) => onSelectChange?.(e.target.checked)}
          />
        ))}
      {showDelete && (
        <Button
          type="text"
          size="small"
          icon={<CloseOutlined />}
          onClick={onDelete}
          title={deleteTitle}
          style={{
            color: token.colorErrorText,
            width: 24,
            height: 24,
          }}
        />
      )}
      {extra}
    </Space>
  );

  return (
    <Card
      size="small"
      title={title}
      extra={selectable || showDelete || extra ? actionExtra : undefined}
      hoverable={selectable}
      onClick={handleCardClick}
      className={className}
      styles={{
        header: {
          borderBottom: 0,
          marginBottom: -38,
        },
      }}
      style={{
        width: "100%", // 一个卡片占一行
        borderRadius: 8,
        border: selected
          ? `2px solid ${token.colorPrimary}`
          : `1px solid ${token.colorBorderSecondary}`,
        backgroundColor: selected
          ? token.colorPrimaryBg
          : token.colorBgContainer,
        transition: "all 0.2s ease-in-out",
        cursor: selectable ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </Card>
  );
};
