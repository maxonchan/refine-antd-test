import { Create, useForm } from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
import { Button, Form, Input } from "antd";
import React from "react";

export const PetCreate = () => {
  const translate = useTranslate();
  const { formProps, saveButtonProps } = useForm({});

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
            },
          ]}
        >
          <Button type="primary">選択</Button>
        </Form.Item>
      </Form>
    </Create>
  );
};
