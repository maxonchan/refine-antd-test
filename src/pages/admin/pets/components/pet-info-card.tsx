import React from "react";
import { Space, theme } from "antd";
import { CheckableCard, InfoRow } from "../../../../components";
import {
  SimpleTable,
  SimpleTableColumn,
} from "../../../../components/simple-table";

const { useToken } = theme;

export interface PetCardItem {
  id: string;
  name: string;
  tableData: Array<Record<string, any>>;
}

export interface PetInfoCardProps {
  item: PetCardItem;
  columns?: SimpleTableColumn[];
  /** 第一行标签，默认为 "姓名" */
  nameLabel?: React.ReactNode;
  /** 第二行标签，默认为 "信息" */
  infoLabel?: React.ReactNode;
  /** 卡片右上方是一个X【删除】按钮，删除按钮可配置是否显示 */
  showDelete?: boolean;
  onDelete?: (item: PetCardItem) => void;
  /** 弹窗多选控制 */
  selectable?: boolean;
  selected?: boolean;
  onSelectChange?: (selected: boolean, item: PetCardItem) => void;
  style?: React.CSSProperties;
}

const defaultColumns: SimpleTableColumn[] = [
  {
    title: "Job feature",
    key: "job",
    dataIndex: "job",
  },
  {
    title: "File Name",
    key: "fileName",
    dataIndex: "fileName",
  },
  {
    title: "Remark",
    key: "remark",
    dataIndex: "remark",
  },
];

/**
 * 宠物信息卡片业务组件（基于通用的 CheckableCard 封装）
 * 分两行展示：
 * 第一行：【姓名：XXX】
 * 第二行：【信息：SimpleTable组件展示具体信息】
 */
export const PetInfoCard: React.FC<PetInfoCardProps> = ({
  item,
  columns = defaultColumns,
  nameLabel = "姓名",
  infoLabel = "信息",
  showDelete = false,
  onDelete,
  selectable = false,
  selected = false,
  onSelectChange,
  style,
}) => {
  const { token } = useToken();

  return (
    <CheckableCard
      selectable={selectable}
      selected={selected}
      onSelectChange={(checked) => onSelectChange?.(checked, item)}
      showDelete={showDelete}
      onDelete={() => onDelete?.(item)}
      style={style}
    >
      <Space direction="vertical" size={10} style={{ width: "100%" }}>
        {/* 第一行：【姓名/位置：XXX】 */}
        <InfoRow label={nameLabel} align="center">
          {item.name}
        </InfoRow>

        {/* 第二行：【信息：SimpleTable组件展示具体信息】（左右排列） */}
        <InfoRow label={infoLabel} align="flex-start" offsetLabelTop>
          <div
            style={{
              borderRadius: 6,
              overflow: "hidden",
              border: `1px solid ${token.colorBorderSecondary}`,
            }}
          >
            <SimpleTable columns={columns} dataSource={item.tableData} />
          </div>
        </InfoRow>
      </Space>
    </CheckableCard>
  );
};

export {
  PositionInfoCard,
  type PositionCardItem,
  type PositionInfoCardProps,
  type PositionTableItem,
} from "./position-info-card";

