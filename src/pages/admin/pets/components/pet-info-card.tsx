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
  nameLabel?: React.ReactNode;
  infoLabel?: React.ReactNode;
  showDelete?: boolean;
  onDelete?: (item: PetCardItem) => void;
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
        <InfoRow label={nameLabel} align="center">
          {item.name}
        </InfoRow>

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

