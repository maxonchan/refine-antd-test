import { Create, useForm } from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
import {
  Button,
  Empty,
  Form,
  Input,
  List,
  Modal,
  Space,
  Typography,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";
import {
  PetInfoCard as PetCard,
  type PetCardItem,
} from "./components/pet-info-card";
import {
  PositionInfoCard,
  type PositionCardItem,
} from "./components/position-info-card";
import type { SimpleTableColumn } from "../../../components/simple-table";

const { Text } = Typography;

const mockPetCardList: PetCardItem[] = [
  {
    id: "1",
    name: "ラッキー (Lucky)",
    tableData: [
      {
        job: "健康診断",
        fileName: "lucky_health_report_2026.pdf",
        remark: "体重 12kg、異常なし",
      },
      {
        job: "ワクチン接種",
        fileName: "lucky_vaccine_cert.pdf",
        remark: "狂犬病予防接種完了",
      },
    ],
  },
  {
    id: "2",
    name: "ミケ (Mike)",
    tableData: [
      {
        job: "栄養計画",
        fileName: "mike_diet_plan.xlsx",
        remark: "シニア猫用特別療法食",
      },
      {
        job: "アレルギー検査",
        fileName: "mike_allergy_test.pdf",
        remark: "小麦粉成分注意",
      },
    ],
  },
  {
    id: "3",
    name: "ポチ (Pochi)",
    tableData: [
      {
        job: "しつけ訓練",
        fileName: "pochi_training_routine.docx",
        remark: "基本服従訓練（初級）合格",
      },
      {
        job: "登録証",
        fileName: "pochi_license_card.png",
        remark: "マイクロチップ登録済み",
      },
    ],
  },
  {
    id: "4",
    name: "モモ (Momo)",
    tableData: [
      {
        job: "保険加入",
        fileName: "momo_insurance_contract.pdf",
        remark: "入院・通院70%補償プラン",
      },
      {
        job: "手術記録",
        fileName: "momo_surgery_summary.pdf",
        remark: "避妊手術完了、経過良好",
      },
    ],
  },
  {
    id: "5",
    name: "クロ (Kuro)",
    tableData: [
      {
        job: "血液検査",
        fileName: "kuro_blood_test.pdf",
        remark: "肝機能・腎機能正常",
      },
      {
        job: "トリミングカルテ",
        fileName: "kuro_trimming_record.xlsx",
        remark: "爪切り・耳掃除実施",
      },
    ],
  },
  {
    id: "6",
    name: "レオ (Leo)",
    tableData: [
      {
        job: "歯科治療",
        fileName: "leo_dental_cleaning.pdf",
        remark: "歯石除去実施、歯周病予防",
      },
      {
        job: "体重管理記録",
        fileName: "leo_weight_tracking.xlsx",
        remark: "目標 28kg 達成",
      },
    ],
  },
];

const mockPositionList: PositionCardItem[] = [
  {
    id: "pos-1",
    name: "東京本部 - 第1診察室 (Tokyo HQ - Room 1)",
    tables: [
      {
        title: "診察エリア 1",
        items: [
          { label: "Job feature", value: "健康診断・問診" },
          { label: "Position / Area", value: "本館 1F - Aエリア" },
          { label: "Remark", value: "診察台・基本測定機器完備" },
        ],
      },
      {
        title: "処置エリア 2",
        items: [
          { label: "Job feature", value: "ワクチン接種" },
          { label: "Position / Area", value: "本館 1F - Bエリア" },
          { label: "Remark", value: "保冷薬品保管庫あり" },
        ],
      },
    ],
  },
  {
    id: "pos-2",
    name: "東京本部 - 中央手術室 (Tokyo HQ - Operation Room)",
    tables: [
      {
        title: "手術エリア 1",
        items: [
          { label: "Job feature", value: "外科手術" },
          { label: "Position / Area", value: "本館 2F - 無菌室" },
          { label: "Remark", value: "麻酔モニター・生体情報装置" },
        ],
      },
      {
        title: "回復・ICUエリア 2",
        items: [
          { label: "Job feature", value: "術後回復・ICU" },
          { label: "Position / Area", value: "本館 2F - ICUケージ" },
          { label: "Remark", value: "24時間酸素供給対応" },
        ],
      },
    ],
  },
  {
    id: "pos-3",
    name: "横浜支所 - 検査センター (Yokohama - Lab Center)",
    tables: [
      {
        title: "生化学検査エリア 1",
        items: [
          { label: "Job feature", value: "血液・生化学検査" },
          { label: "Position / Area", value: "検査棟 1F - 第1ラボ" },
          { label: "Remark", value: "全自動血液分析器設置" },
        ],
      },
      {
        title: "画像診断エリア 2",
        items: [
          { label: "Job feature", value: "画像・CT診断" },
          { label: "Position / Area", value: "検査棟 B1F - 放射線科" },
          { label: "Remark", value: "高精度デジタルX線設備" },
        ],
      },
    ],
  },
  {
    id: "pos-4",
    name: "埼玉センター - トレーニング棟 (Saitama - Training Facility)",
    tables: [
      {
        title: "リハビリエリア 1",
        items: [
          { label: "Job feature", value: "リハビリ運動" },
          { label: "Position / Area", value: "南棟 1F - ハイドロセラピー室" },
          { label: "Remark", value: "温水歩行プール設置" },
        ],
      },
      {
        title: "しつけ訓練エリア 2",
        items: [
          { label: "Job feature", value: "しつけ訓練" },
          { label: "Position / Area", value: "屋外フィールド - 区画A" },
          { label: "Remark", value: "障害物アジリティ設備完備" },
        ],
      },
    ],
  },
  {
    id: "pos-5",
    name: "千葉ステーション - 入院病棟 (Chiba - Ward Station)",
    tables: [
      {
        title: "一般病室エリア 1",
        items: [
          { label: "Job feature", value: "一般入院管理" },
          { label: "Position / Area", value: "病棟 2F - 201号室" },
          { label: "Remark", value: "中・大型犬用個別ケージ" },
        ],
      },
      {
        title: "隔離病室エリア 2",
        items: [
          { label: "Job feature", value: "感染症隔離" },
          { label: "Position / Area", value: "病棟 1F - 隔離室" },
          { label: "Remark", value: "陰圧空調・専用消毒設備" },
        ],
      },
    ],
  },
  {
    id: "pos-6",
    name: "大阪分室 - サポートオフィス (Osaka - Care Support)",
    tables: [
      {
        title: "カルテ管理窓口 1",
        items: [
          { label: "Job feature", value: "総合受付・カルテ管理" },
          { label: "Position / Area", value: "西館 1F - 受付カウンター" },
          { label: "Remark", value: "電子カルテ・予約管理系统" },
        ],
      },
      {
        title: "オンライン診療窓口 2",
        items: [
          { label: "Job feature", value: "遠隔医療相談" },
          { label: "Position / Area", value: "西館 3F - オンラインブース" },
          { label: "Remark", value: "Web面談・専門医カンファレンス" },
        ],
      },
    ],
  },
];

export const PetCreate = () => {
  const translate = useTranslate();
  const { formProps, saveButtonProps } = useForm({});

  // ===== ファイル名 选择状态 =====
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [fileKeyword, setFileKeyword] = useState("");
  const [selectedFileCards, setSelectedFileCards] = useState<PetCardItem[]>([]);
  const [tempSelectedFileIds, setTempSelectedFileIds] = useState<string[]>([]);

  // ===== 位置 选择状态（单选） =====
  const [isPosModalOpen, setIsPosModalOpen] = useState(false);
  const [posKeyword, setPosKeyword] = useState("");
  const [selectedPosCard, setSelectedPosCard] = useState<PositionCardItem | null>(null);
  const [tempSelectedPosId, setTempSelectedPosId] = useState<string | null>(null);

  // 弹窗过滤后的文件卡片列表
  const filteredFiles = useMemo(() => {
    const trimmed = fileKeyword.trim().toLowerCase();
    if (!trimmed) {
      return mockPetCardList;
    }
    return mockPetCardList.filter((item) => {
      const matchName = item.name.toLowerCase().includes(trimmed);
      const matchTable = item.tableData.some(
        (t) =>
          t.job?.toLowerCase().includes(trimmed) ||
          t.fileName?.toLowerCase().includes(trimmed) ||
          t.remark?.toLowerCase().includes(trimmed),
      );
      return matchName || matchTable;
    });
  }, [fileKeyword]);

  // 弹窗过滤后的位置卡片列表
  const filteredPositions = useMemo(() => {
    const trimmed = posKeyword.trim().toLowerCase();
    if (!trimmed) {
      return mockPositionList;
    }
    return mockPositionList.filter((item) => {
      const matchName = item.name.toLowerCase().includes(trimmed);
      const matchTables = item.tables.some(
        (t) =>
          (typeof t.title === "string" &&
            t.title.toLowerCase().includes(trimmed)) ||
          t.items.some(
            (row) =>
              (typeof row.label === "string" &&
                row.label.toLowerCase().includes(trimmed)) ||
              (typeof row.value === "string" &&
                row.value.toLowerCase().includes(trimmed)),
          ),
      );
      return matchName || matchTables;
    });
  }, [posKeyword]);

  // ----- 文件选择相关逻辑 -----
  const handleOpenFileModal = () => {
    setTempSelectedFileIds(selectedFileCards.map((c) => c.id));
    setFileKeyword("");
    setIsFileModalOpen(true);
  };

  const handleToggleSelectFile = (checked: boolean, item: PetCardItem) => {
    if (checked) {
      setTempSelectedFileIds((prev) => [...prev, item.id]);
    } else {
      setTempSelectedFileIds((prev) => prev.filter((id) => id !== item.id));
    }
  };

  const isAllCurrentFilteredFilesSelected =
    filteredFiles.length > 0 &&
    filteredFiles.every((item) => tempSelectedFileIds.includes(item.id));

  const handleToggleSelectAllFiles = () => {
    if (isAllCurrentFilteredFilesSelected) {
      const currentFilteredIds = new Set(filteredFiles.map((f) => f.id));
      setTempSelectedFileIds((prev) =>
        prev.filter((id) => !currentFilteredIds.has(id)),
      );
    } else {
      const combined = new Set([
        ...tempSelectedFileIds,
        ...filteredFiles.map((f) => f.id),
      ]);
      setTempSelectedFileIds(Array.from(combined));
    }
  };

  const handleConfirmFileModal = () => {
    const newSelected = mockPetCardList.filter((item) =>
      tempSelectedFileIds.includes(item.id),
    );
    setSelectedFileCards(newSelected);

    const selectedIds = newSelected.map((item) => item.id);

    formProps.form?.setFieldsValue({
      file_name: selectedIds.length > 0 ? selectedIds : undefined,
    });
    formProps.form?.validateFields(["file_name"]).catch(() => {});

    setIsFileModalOpen(false);
  };

  const handleDeleteFileCard = (cardItem: PetCardItem) => {
    const newSelected = selectedFileCards.filter((c) => c.id !== cardItem.id);
    setSelectedFileCards(newSelected);

    const selectedIds = newSelected.map((item) => item.id);

    formProps.form?.setFieldsValue({
      file_name: selectedIds.length > 0 ? selectedIds : undefined,
    });
    formProps.form?.validateFields(["file_name"]).catch(() => {});
  };

  // ----- 位置选择相关逻辑（单选） -----
  const handleOpenPosModal = () => {
    setTempSelectedPosId(selectedPosCard ? selectedPosCard.id : null);
    setPosKeyword("");
    setIsPosModalOpen(true);
  };

  const handleSelectPos = (item: PositionCardItem) => {
    setTempSelectedPosId((prev) => (prev === item.id ? null : item.id));
  };

  const handleConfirmPosModal = () => {
    const newSelected =
      mockPositionList.find((item) => item.id === tempSelectedPosId) || null;
    setSelectedPosCard(newSelected);

    formProps.form?.setFieldsValue({
      posId: newSelected ? newSelected.id : undefined,
    });
    formProps.form?.validateFields(["posId"]).catch(() => {});

    setIsPosModalOpen(false);
  };

  const handleDeletePosCard = () => {
    setSelectedPosCard(null);

    formProps.form?.setFieldsValue({
      posId: undefined,
    });
    formProps.form?.validateFields(["posId"]).catch(() => {});
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={translate("pets.fields.name", "名前")}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={translate("pets.fields.file_name", "ファイル名")}
          name={["file_name"]}
          rules={[
            {
              required: true,
              type: "array",
              message: translate(
                "pets.messages.file_required",
                "ファイルを選択してください",
              ),
            },
          ]}
        >
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            {/* 选择完之后，页面显示选择的卡片（每个卡片占一行，右上角带X【删除】按钮） */}
            {selectedFileCards.length > 0 && (
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                {selectedFileCards.map((item) => (
                  <PetCard
                    key={item.id}
                    item={item}
                    showDelete={true}
                    onDelete={handleDeleteFileCard}
                  />
                ))}
              </Space>
            )}

            {/* 选择按钮 */}
            <Button type="primary" onClick={handleOpenFileModal}>
              {translate("buttons.select", "選択")}
            </Button>
          </Space>
        </Form.Item>

        <Form.Item
          label={translate("pets.fields.posId", "位置")}
          name={["posId"]}
          rules={[
            {
              required: true,
              message: translate(
                "pets.messages.pos_required",
                "位置を選択してください",
              ),
            },
          ]}
        >
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            {/* 选择完之后，页面显示单选的位置卡片（右上角带X【删除】按钮） */}
            {selectedPosCard && (
              <PositionInfoCard
                item={selectedPosCard}
                nameLabel="位置"
                showDelete={true}
                onDelete={handleDeletePosCard}
              />
            )}

            {/* 选择位置按钮 */}
            <Button type="primary" onClick={handleOpenPosModal}>
              {translate("buttons.select", "選択")}
            </Button>
          </Space>
        </Form.Item>
      </Form>

      {/* ファイル多选弹窗 */}
      <Modal
        title={translate("pets.modals.select_file_title", "ファイル選択")}
        open={isFileModalOpen}
        onCancel={() => setIsFileModalOpen(false)}
        onOk={handleConfirmFileModal}
        okText={translate("buttons.confirm", "確定")}
        cancelText={translate("buttons.cancel", "キャンセル")}
        width={800}
        destroyOnClose
      >
        <Space
          direction="vertical"
          size="middle"
          style={{ width: "100%", marginTop: 12 }}
        >
          {/* 关键字搜索框与全选操作 */}
          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Input.Search
              placeholder={translate(
                "pets.search.placeholder",
                "名前、ファイル名またはキーワードで検索...",
              )}
              allowClear
              enterButton={<SearchOutlined />}
              value={fileKeyword}
              onChange={(e) => setFileKeyword(e.target.value)}
              style={{ width: 450 }}
            />
            <Space>
              <Button size="small" onClick={handleToggleSelectAllFiles}>
                {isAllCurrentFilteredFilesSelected ? "選択解除" : "すべて選択"}
              </Button>
              <Text type="secondary" style={{ fontSize: 13 }}>
                選択済み: <strong>{tempSelectedFileIds.length}</strong> 件
              </Text>
            </Space>
          </Space>

          {/* 卡片分页列表（弹窗内多选，一个卡片占一行，删除按钮配置为不显示） */}
          <List
            pagination={{
              pageSize: 3,
              align: "center",
              size: "small",
              showTotal: (total) => `合計 ${total} 件`,
            }}
            dataSource={filteredFiles}
            locale={{
              emptyText: (
                <Empty
                  description={translate(
                    "pets.empty.no_files",
                    "一致するデータが見つかりません",
                  )}
                />
              ),
            }}
            renderItem={(item) => {
              const isSelected = tempSelectedFileIds.includes(item.id);
              return (
                <List.Item style={{ padding: "8px 0", borderBottom: "none" }}>
                  <PetCard
                    item={item}
                    selectable={true}
                    selected={isSelected}
                    onSelectChange={handleToggleSelectFile}
                    showDelete={false}
                  />
                </List.Item>
              );
            }}
          />
        </Space>
      </Modal>

      {/* 位置多选弹窗 */}
      <Modal
        title={translate("pets.modals.select_pos_title", "位置選択")}
        open={isPosModalOpen}
        onCancel={() => setIsPosModalOpen(false)}
        onOk={handleConfirmPosModal}
        okText={translate("buttons.confirm", "確定")}
        cancelText={translate("buttons.cancel", "キャンセル")}
        width={800}
        destroyOnClose
      >
        <Space
          direction="vertical"
          size="middle"
          style={{ width: "100%", marginTop: 12 }}
        >
          {/* 关键字搜索框与单选状态（单选模式不提供全选操作） */}
          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Input.Search
              placeholder={translate(
                "pets.search.pos_placeholder",
                "位置名、作業内容またはキーワードで検索...",
              )}
              allowClear
              enterButton={<SearchOutlined />}
              value={posKeyword}
              onChange={(e) => setPosKeyword(e.target.value)}
              style={{ width: 450 }}
            />
            <Space>
              {tempSelectedPosId && (
                <Button size="small" onClick={() => setTempSelectedPosId(null)}>
                  選択解除
                </Button>
              )}
              <Text type="secondary" style={{ fontSize: 13 }}>
                選択済み: <strong>{tempSelectedPosId ? 1 : 0}</strong> 件
              </Text>
            </Space>
          </Space>

          {/* 卡片分页列表（弹窗内单选，一个卡片占一行，删除按钮配置为不显示） */}
          <List
            pagination={{
              pageSize: 3,
              align: "center",
              size: "small",
              showTotal: (total) => `合計 ${total} 件`,
            }}
            dataSource={filteredPositions}
            locale={{
              emptyText: (
                <Empty
                  description={translate(
                    "pets.empty.no_positions",
                    "一致するデータが見つかりません",
                  )}
                />
              ),
            }}
            renderItem={(item) => {
              const isSelected = tempSelectedPosId === item.id;
              return (
                <List.Item style={{ padding: "8px 0", borderBottom: "none" }}>
                  <PositionInfoCard
                    item={item}
                    nameLabel="位置"
                    selectable={true}
                    selected={isSelected}
                    selectionType="radio"
                    onSelectChange={() => handleSelectPos(item)}
                    showDelete={false}
                  />
                </List.Item>
              );
            }}
          />
        </Space>
      </Modal>
    </Create>
  );
};
