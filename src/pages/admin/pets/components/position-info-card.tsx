import React from "react";
import { Flex, List, Space } from "antd";
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
  tableData?: Array<Record<string, any>>;
}

export interface PositionInfoCardProps {
  item: PositionCardItem;
  nameLabel?: React.ReactNode;
  infoLabel?: React.ReactNode;
  showDelete?: boolean;
  onDelete?: (item: PositionCardItem) => void;
  selectable?: boolean;
  selected?: boolean;
  selectionType?: "checkbox" | "radio";
  onSelectChange?: (selected: boolean, item: PositionCardItem) => void;
  style?: React.CSSProperties;
}

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
        <InfoRow label={nameLabel} align="center">
          {item.name}
        </InfoRow>

        <InfoRow label={infoLabel} align="flex-start" offsetLabelTop={4}>
          <Flex align="flex-start" gap={8} wrap="wrap">
            {tables.map((tableItem, index) => (
              <InfoCardTable
                key={index}
                title={tableItem.title}
                items={tableItem.items}
                labelWidth={tableItem.labelWidth ?? "35%"}
                style={{
                  flex: "1 1 calc(33.333% - 8px)",
                  minWidth: 200,
                }}
              />
            ))}
          </Flex>
        </InfoRow>
      </div>
    </CheckableCard>
  );
};
