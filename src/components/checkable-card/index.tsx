import React from "react";
import { Button, Card, Checkbox, Radio, Space, theme } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { useToken } = theme;

export interface CheckableCardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  showDelete?: boolean;
  onDelete?: () => void;
  deleteTitle?: string;
  selectable?: boolean;
  selected?: boolean;
  selectionType?: "checkbox" | "radio";
  onSelectChange?: (selected: boolean) => void;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

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
      onSelectChange?.(!selected);
    }
    onClick?.();
  };

  const hasActions = selectable || showDelete || Boolean(extra);
  const showCardHeader = Boolean(title);

  const actionExtra = hasActions ? (
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
  ) : null;

  return (
    <Card
      size="small"
      title={title}
      extra={showCardHeader ? actionExtra : undefined}
      hoverable={selectable}
      onClick={handleCardClick}
      className={className}
      styles={
        showCardHeader
          ? {
              header: {
                borderBottom: 0,
              },
            }
          : undefined
      }
      style={{
        position: "relative",
        width: "100%",
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
      {!showCardHeader && actionExtra && (
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 12,
            zIndex: 1,
          }}
        >
          {actionExtra}
        </div>
      )}
      {children}
    </Card>
  );
};
