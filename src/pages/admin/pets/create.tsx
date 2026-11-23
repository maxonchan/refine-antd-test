import { Create, useForm } from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
import { Button, Form, Input, Space } from "antd";
import React, { useState } from "react";
import { PetInfoCard, type PetCardItem } from "./components/pet-info-card";
import {
  PositionInfoCard,
  type PositionCardItem,
} from "./components/position-info-card";
import { CardSelectModal } from "../../../components";

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

const filterPetCard = (item: PetCardItem, keyword: string) => {
  const matchName = item.name.toLowerCase().includes(keyword);
  const matchTable = item.tableData.some(
    (t) =>
      t.job?.toLowerCase().includes(keyword) ||
      t.fileName?.toLowerCase().includes(keyword) ||
      t.remark?.toLowerCase().includes(keyword),
  );
  return matchName || matchTable;
};

const filterPositionCard = (item: PositionCardItem, keyword: string) => {
  const matchName = item.name.toLowerCase().includes(keyword);
  const matchTables = item.tables.some(
    (t) =>
      (typeof t.title === "string" &&
        t.title.toLowerCase().includes(keyword)) ||
      t.items.some(
        (row) =>
          (typeof row.label === "string" &&
            row.label.toLowerCase().includes(keyword)) ||
          (typeof row.value === "string" &&
            row.value.toLowerCase().includes(keyword)),
      ),
  );
  return matchName || matchTables;
};

export const PetCreate = () => {
  const translate = useTranslate();
  const { formProps, saveButtonProps } = useForm({});

  const [fileIds, setFileIds] = useState<string[]>([]);
  const [posId, setPosId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"file" | "pos" | null>(null);

  const updateFiles = (ids: string[]) => {
    setFileIds(ids);
    formProps.form?.setFieldValue(
      "file_name",
      ids.length > 0 ? ids : undefined,
    );
    formProps.form?.validateFields(["file_name"]).catch(() => {});
  };

  const updatePos = (id: string | null) => {
    setPosId(id);
    formProps.form?.setFieldValue("posId", id ?? undefined);
    formProps.form?.validateFields(["posId"]).catch(() => {});
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={translate("pets.fields.name", "名前")}
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={translate("pets.fields.file_name", "ファイル名")}
          name="file_name"
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
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            {mockPetCardList
              .filter((item) => fileIds.includes(item.id))
              .map((item) => (
                <PetInfoCard
                  key={item.id}
                  item={item}
                  showDelete
                  onDelete={() =>
                    updateFiles(fileIds.filter((id) => id !== item.id))
                  }
                />
              ))}
            <Button type="primary" onClick={() => setModalType("file")}>
              {translate("buttons.select", "選択")}
            </Button>
          </Space>
        </Form.Item>

        <Form.Item
          label={translate("pets.fields.posId", "位置")}
          name="posId"
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
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            {posId && (
              <PositionInfoCard
                item={mockPositionList.find((item) => item.id === posId)!}
                nameLabel="位置"
                showDelete
                onDelete={() => updatePos(null)}
              />
            )}
            <Button type="primary" onClick={() => setModalType("pos")}>
              {translate("buttons.select", "選択")}
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <CardSelectModal
        open={modalType === "file"}
        title={translate("pets.modals.select_file_title", "ファイル選択")}
        multiple
        dataSource={mockPetCardList}
        value={fileIds}
        searchPlaceholder={translate(
          "pets.search.placeholder",
          "名前、ファイル名またはキーワードで検索...",
        )}
        emptyText={translate(
          "pets.empty.no_files",
          "一致するデータが見つかりません",
        )}
        filterItem={filterPetCard}
        onOk={(ids) => {
          updateFiles(ids);
          setModalType(null);
        }}
        onCancel={() => setModalType(null)}
        renderItem={(item, isSelected, toggle) => (
          <PetInfoCard
            item={item}
            selectable
            selected={isSelected}
            onSelectChange={toggle}
          />
        )}
      />

      <CardSelectModal
        open={modalType === "pos"}
        title={translate("pets.modals.select_pos_title", "位置選択")}
        multiple={false}
        dataSource={mockPositionList}
        value={posId ? [posId] : []}
        searchPlaceholder={translate(
          "pets.search.pos_placeholder",
          "位置名、作業内容またはキーワードで検索...",
        )}
        emptyText={translate(
          "pets.empty.no_positions",
          "一致するデータが見つかりません",
        )}
        filterItem={filterPositionCard}
        onOk={(ids) => {
          updatePos(ids[0] ?? null);
          setModalType(null);
        }}
        onCancel={() => setModalType(null)}
        renderItem={(item, isSelected, toggle) => (
          <PositionInfoCard
            item={item}
            nameLabel="位置"
            selectable
            selected={isSelected}
            selectionType="radio"
            onSelectChange={toggle}
          />
        )}
      />
    </Create>
  );
};
