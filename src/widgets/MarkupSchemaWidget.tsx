import React from "react";
import { TreeNode } from "@designable/core";
import { MonacoInput } from "@designable/react-settings-form";
import { isEmpty, isPlainObj } from "@formily/shared";
export interface IMarkupSchemaWidgetProps {
  tree: TreeNode;
}

const transformToProFormSchemaCode = (tree: TreeNode) => {
  const printAttribute = (node: TreeNode) => {
    if (!node) return "";
    const props = { ...node.props };
    if (node.depth !== 0) {
      props.name = node.props?.name || node.id;
    }
    return `${Object.keys(props)
      .map((key) => {
        if (
          key === "x-designable-id" ||
          key === "x-designable-source-name" ||
          key === "_isJSONSchemaObject" ||
          key === "version" ||
          key === "type"
        )
          return "";
        const value = props[key];
        if (isPlainObj(value) && isEmpty(value)) return "";
        if (typeof value === "string") return `${key}="${value}"`;
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(" ")}`;
  };
  const root = tree.find((child) => {
    return child.componentName === "Form" || child.componentName === "Root";
  });
  const printTag = (node: TreeNode) => {
    console.log(node, "nodenodenode");
    const nodeProps: any = node.props || {};
    // 根据属性,判断要返回的Element
    const XComponent = nodeProps["x-component"];
    if (XComponent == "Input") {
      return "ProFormText";
    }
    if (XComponent == "Switch") {
      return "ProFormSwitch";
    }
    if (XComponent == "Upload.Dragger") {
      return "ProFormUploadDragger";
    }
    if (XComponent == "Upload") {
      return "ProFormUploadButton";
    }
    if (XComponent == "TimePicker.RangePicker") {
      return "ProFormTimePicker.RangePicker";
    }
    if (XComponent == "TimePicker") {
      return "ProFormTimePicker";
    }
    if (XComponent == "DatePicker.RangePicker") {
      return "ProFormDatePicker.RangePicker";
    }
    if (XComponent == "DatePicker") {
      return "ProFormDatePicker.RangePicker";
    }
    if (XComponent == "Radio.Group") {
      return "ProFormRadio.Group";
    }
    if (XComponent == "Checkbox.Group") {
      return "ProFormCheckbox.Group";
    }
    if (XComponent == "Cascader") {
      return "ProFormCascader";
    }
    if (XComponent == "TreeSelect") {
      return "ProFormTreeSelect";
    }
    if (XComponent == "Select") {
      return "ProFormSelect";
    }
    if (XComponent == "Slider") {
      return "ProFormSlider";
    }
    if (XComponent == "Rate") {
      return "ProFormRate";
    }
    if (XComponent == "NumberPicker") {
      return "ProFormDigit";
    }
    if (XComponent == "Password") {
      return "ProFormText.Password";
    }
    if (XComponent == "Input.TextArea") {
      return "ProFormInput.TextArea";
    }
    if (XComponent == "Input") {
      return "ProFormText";
    }

    if (node.props?.type === "string") return "SchemaField.String";
    if (node.props?.type === "number") return "SchemaField.Number";
    if (node.props?.type === "boolean") return "SchemaField.Boolean";
    if (node.props?.type === "date") return "SchemaField.Date";
    if (node.props?.type === "datetime") return "SchemaField.DateTime";
    if (node.props?.type === "array") return "SchemaField.Array";
    if (node.props?.type === "object") return "SchemaField.Object";
    if (node.props?.type === "void") return "SchemaField.Void";
    return "SchemaField.Markup";
  };
  const printNode = (node: TreeNode) => {
    if (!node) return "";
    return `
    <${printTag(node)} ${printAttribute(node)} ${
      node.children.length
        ? `>${printChildren(node)}</${printTag(node)}>`
        : "/>"
    }
    `;
  };
  const printChildren = (node: TreeNode) => {
    if (!node) return "";
    return node.children
      .map((child) => {
        return printNode(child);
      })
      .join("\r\n");
  };
  return `
  import React, { useMemo ,useRef , useState} from 'react;
  import { Card, Slider, Rate } from 'antd';
  import { PageLayout } from "remote/shared";
  import {
    ProForm,
    ProFormDatePicker,
    ProFormDependency,
    ProFormItem,
    ProFormRadio,
    ProFormText,
    ProFormTextArea,
  } from "@ant-design/pro-components";
  import {
    ProForm,
    ProFormInstance,
  } from "@ant-design/pro-components";

  import {
    usePageContainer,
  } from "@core/rc-components";
  import {  handleTypeEnum } from "@core/shared";

  export default ()=>{
    // 控制loading
    const [loading, setLoading] = useState(false);
    // form实例
    const formRef = useRef<ProFormInstance>();

    // form初始化数据
    const formInitDataMemo = useMemo(()=>{
      return {}
    },[]);


    // 提交逻辑
    const handleSubmit = async ({
      handleType,
    }: {
      handleType: handleTypeEnum;
    }) => {

    }


    // 底下的提交按钮
    const pageContainerConfig = usePageContainer({
      isCancelBtn: true,
      isCancelConfirm: true,
      footerConfig: [
        {
          id: "editSave",
          name: "暂存",
          loading,
          onClick: () => handleSubmit({
                  handleType: handleTypeEnum.save,
            }),
        },
        {
              id: "editSubmit",
              loading,
              name: "提交",
              type: "primary",
              onClick: () => handleSubmit({
                  handleType: handleTypeEnum.submit,
              }),
          },
      ]
    });

    return (
      <PageLayout {...pageContainerConfig}>
          <ProForm
            initialValues={formInitDataMemo}
            submitter={false}
            validateTrigger="onBlur"
            formRef={formRef}
            // labelCol={{
            // xs: { span: 24 },
            // sm: { span: 24 },
            // }}
            // wrapperCol={{
            // xs: { span: 24 },
            // sm: { span: 18 },
            // }}
            ${printAttribute(root)}
        >
        ${printChildren(root)}
        </ProForm>
    </PageLayout>
    )

  }


  `;
};

export const MarkupSchemaWidget: React.FC<IMarkupSchemaWidgetProps> = (
  props
) => {
  return (
    <MonacoInput
      {...props}
      options={{ readOnly: true }}
      value={transformToProFormSchemaCode(props.tree)}
      language="typescript"
    />
  );
};
