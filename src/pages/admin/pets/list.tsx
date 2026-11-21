import {
  DeleteButton,
  EditButton,
  ShowButton,
  useModalForm,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { useTranslate } from "@refinedev/core";
import { Space } from "antd";
import React, { useMemo } from "react";
import { EditableList } from "../../../components/editable-list";

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
      <EditableList columns={columns}></EditableList>
    </>
  );
};
