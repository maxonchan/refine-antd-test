import {
  DeleteButton,
  EditButton,
  ShowButton,
  useModalForm,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { useTranslate } from "@refinedev/core";
import { Card, Descriptions, Flex, Space } from "antd";
import React, { useMemo } from "react";
import { EditableList } from "../../../components/editable-list";
import { SimpleTable } from "../../../components/simple-table";

export const PetList = () => {
  const translate = useTranslate();

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createShow,
  } = useModalForm({
    resource: "pets",
    action: "create",
    syncWithLocation: false,
  });

  // const {
  //   modalProps: editModalProps,
  //   formProps: editFormProps,
  //   show: editShow,
  // } = useModalForm({
  //   resource: "pets",
  //   action: "edit",
  //   syncWithLocation: false,
  // });

  const columns = useMemo(
    () => [
      {
        title: translate("pets.fields.id", "ID"),
        key: "id",
        dataIndex: "id",
      },
      {
        title: translate("pets.fields.title", "name"),
        key: "name",
        dataIndex: "name",
      },
      {
        title: translate("pets.fields.actions", "操作"),
        key: "actions",
        dataIndex: "actions",
        render: (_: any, record: BaseRecord) => (
          <Space>
            <EditButton
              hideText
              size="small"
              recordItemId={record.id}
              onClick={(e) => {
                e.preventDefault();
                // editShow(record.id);
              }}
            />
            <ShowButton hideText size="small" recordItemId={record.id} />
            <DeleteButton hideText size="small" recordItemId={record.id} />
          </Space>
        ),
      },
    ],
    // [translate, editShow],
    [translate],
  );

  return (
    <>
      <SimpleTable
        columns={[
          {
            title: "Job feature",
            key: "job",
          },
          {
            title: "File Name",
            key: "fileName",
          },
        ]}
        dataSource={[
          {
            job: "test",
            fileName: "Test.txt",
          },
          {
            job: "test2",
            fileName: "Test2.txt",
          },
        ]}
      ></SimpleTable>
      <Flex gap={50}>
        <Card title="User Info" size="small" style={{ width: 400 }}>
          <Descriptions size="small" bordered column={1}>
            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
            <Descriptions.Item label="Live">
              Hangzhou, Zhejiang
            </Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Address">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Descriptions title="User Info" size="small" bordered column={1}>
          <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
          <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label="Remark">empty</Descriptions.Item>
          <Descriptions.Item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
      </Flex>
      ;<EditableList columns={columns}></EditableList>
    </>
  );
};
