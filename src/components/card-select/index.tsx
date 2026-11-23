import React, { useState, useMemo, useEffect } from "react";
import { Button, Empty, Input, List, Modal, Space, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Text } = Typography;

export interface CardSelectModalProps<T extends { id: string }> {
  open: boolean;
  title: React.ReactNode;
  dataSource: T[];
  value?: string[];
  multiple?: boolean;
  searchPlaceholder?: string;
  emptyText?: React.ReactNode;
  filterItem: (item: T, keyword: string) => boolean;
  renderItem: (item: T, isSelected: boolean, toggle: () => void) => React.ReactNode;
  onOk: (selectedIds: string[]) => void;
  onCancel: () => void;
}

export function CardSelectModal<T extends { id: string }>({
  open,
  title,
  dataSource,
  value = [],
  multiple = false,
  searchPlaceholder = "検索...",
  emptyText = "データが見つかりません",
  filterItem,
  renderItem,
  onOk,
  onCancel,
}: CardSelectModalProps<T>) {
  const [keyword, setKeyword] = useState("");
  const [tempIds, setTempIds] = useState<string[]>(value);

  useEffect(() => {
    if (open) {
      setTempIds(value);
      setKeyword("");
    }
  }, [open, value]);

  const filteredList = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return q ? dataSource.filter((item) => filterItem(item, q)) : dataSource;
  }, [dataSource, keyword, filterItem]);

  const toggle = (id: string) => {
    if (multiple) {
      setTempIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
    } else {
      setTempIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const isAllSelected =
    filteredList.length > 0 &&
    filteredList.every((item) => tempIds.includes(item.id));

  const toggleSelectAll = () => {
    const curIds = filteredList.map((f) => f.id);
    if (isAllSelected) {
      setTempIds((prev) => prev.filter((id) => !curIds.includes(id)));
    } else {
      setTempIds((prev) => Array.from(new Set([...prev, ...curIds])));
    }
  };

  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      onOk={() => onOk(tempIds)}
      okText="確定"
      cancelText="キャンセル"
      width={800}
      destroyOnClose
    >
      <Space
        direction="vertical"
        size="middle"
        style={{ width: "100%", marginTop: 12 }}
      >
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Input.Search
            placeholder={searchPlaceholder}
            allowClear
            enterButton={<SearchOutlined />}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ width: 450 }}
          />
          <Space>
            {multiple ? (
              <Button size="small" onClick={toggleSelectAll}>
                {isAllSelected ? "選択解除" : "すべて選択"}
              </Button>
            ) : (
              tempIds.length > 0 && (
                <Button size="small" onClick={() => setTempIds([])}>
                  選択解除
                </Button>
              )
            )}
            <Text type="secondary" style={{ fontSize: 13 }}>
              選択済み: <strong>{tempIds.length}</strong> 件
            </Text>
          </Space>
        </Space>

        <List
          pagination={{
            pageSize: 3,
            align: "center",
            size: "small",
            showTotal: (total) => `合計 ${total} 件`,
          }}
          dataSource={filteredList}
          locale={{ emptyText: <Empty description={emptyText} /> }}
          renderItem={(item) => (
            <List.Item style={{ padding: "8px 0", borderBottom: "none" }}>
              {renderItem(item, tempIds.includes(item.id), () => toggle(item.id))}
            </List.Item>
          )}
        />
      </Space>
    </Modal>
  );
}
