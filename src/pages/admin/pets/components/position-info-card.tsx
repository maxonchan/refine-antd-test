import React from "react";
import { List } from "antd";
import {
  CheckableCard,
  InfoRow,
  InfoCardTable,
  type InfoCardTableItem,
} from "../../../../components";

export interface PositionTableItem {
  title?: React.ReactNode;
  items: InfoCardTableItem[];
  labelWidth?: number | string;
}

export interface PositionCardItem {
  id: string;
  name: string;
  tables: PositionTableItem[];
  /** 兼容可能存在的旧格式 tableData */
  tableData?: Array<Record<string, any>>;
}

export interface PositionInfoCardProps {
  item: PositionCardItem;
  /** 第一行标签，默认为 "位置" */
  nameLabel?: React.ReactNode;
  /** 第二行标签，默认为 "信息" */
  infoLabel?: React.ReactNode;
  /** 卡片右上方是一个X【删除】按钮，删除按钮可配置是否显示 */
  showDelete?: boolean;
  onDelete?: (item: PositionCardItem) => void;
  /** 弹窗选择控制 */
  selectable?: boolean;
  selected?: boolean;
  /** 选择控件类型，默认 "radio"（单选），可设置为 "checkbox"（多选） */
  selectionType?: "checkbox" | "radio";
  onSelectChange?: (selected: boolean, item: PositionCardItem) => void;
  style?: React.CSSProperties;
}

/**
 * 位置信息卡片业务组件（基于通用的 CheckableCard 封装）
 * 分两行展示：
 * 第一行：【位置：XXX】
 * 第二行：【信息：展示多个 InfoCardTable 的 List】
 */
export const PositionInfoCard: React.FC<PositionInfoCardProps> = ({
  item,
  nameLabel = "位置",
  infoLabel = "信息",
  showDelete = false,
  onDelete,
  selectable = false,
  selected = false,
  selectionType = "radio",
  onSelectChange,
  style,
}) => {
  // 如果提供了 tables 则使用 tables，兼容旧的 tableData
  const tables: PositionTableItem[] =
    item.tables ??
    (item.tableData
      ? item.tableData.map((row, index) => ({
          title: `エリア ${index + 1}`,
          items: Object.entries(row).map(([k, v]) => ({
            label: k,
            value: String(v),
          })),
        }))
      : []);

  return (
    <CheckableCard
      selectable={selectable}
      selected={selected}
      selectionType={selectionType}
      onSelectChange={(checked) => onSelectChange?.(checked, item)}
      showDelete={showDelete}
      onDelete={() => onDelete?.(item)}
      style={style}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
        }}
      >
        {/* 第一行：【位置：XXX】 */}
        <InfoRow label={nameLabel} align="center">
          {item.name}
        </InfoRow>

        {/* 第二行：【信息：展示多个 info-card-table 的 list】 */}
        <InfoRow label={infoLabel} align="flex-start" offsetLabelTop={4}>
          <List
            size="small"
            split={false}
            dataSource={tables}
            style={{ width: "100%" }}
            renderItem={(table, index) => (
              <List.Item
                key={index}
                style={{
                  padding: 0,
                  marginBottom: index < tables.length - 1 ? 8 : 0,
                  borderBottom: "none",
                }}
              >
                <InfoCardTable
                  title={table.title}
                  items={table.items}
                  labelWidth={table.labelWidth ?? "35%"}
                />
              </List.Item>
            )}
          />
        </InfoRow>
      </div>
    </CheckableCard>
  );
};
