import MyInput from "./MyInput";
import { createBehavior, createResource } from "@designable/core";
import { createFieldSchema } from "../../components/Field";
// 步骤2. 将这个组件转成formily组件(属性设置)

// 右边菜单组件属性
const MyInputDesignerSchemas = {
  type: "object",
  properties: {
    size: {
      type: "string",
      enum: ["large", "small", "middle", null],
      "x-decorator": "FormItem",
      "x-component": "Select",
      "x-component-props": {
        defaultValue: "middle",
      },
    },
  },
};
// 定义设计器行为属性
MyInput.Behavior = createBehavior({
  name: "MyInput",
  extends: ["Field"],
  selector: (node) => node.props?.["x-component"] === "MyInput",
  // 设计器属性
  designerProps: {
    // createFieldSchema是内部源码封装好的一些属性
    propsSchema: createFieldSchema(MyInputDesignerSchemas as any),
    designerLocales: {
      "zh-CN": {
        title: "自定义输入框",
      },
    },
  },
});
// 定义设计器资源
MyInput.Resource = createResource({
  icon: "InputSource",
  elements: [
    {
      componentName: "Field",
      props: {
        type: "string",
        title: "MyInput",
        "x-decorator": "FormItem",
        "x-component": "MyInput",
      },
    },
  ],
});

export { MyInput };
