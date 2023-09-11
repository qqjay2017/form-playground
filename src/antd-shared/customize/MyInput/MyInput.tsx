import { DnFC } from "@designable/react";

import { connect, mapProps } from "@formily/react";
// 步骤1. 先自定义一个组件,和正常函数组件一样
const MyInput = ({
  value,
  onChange,
  size,
  ...rest
}: {
  value?: string;
  onChange?: any;
  size?: any;
}) => {
  console.log(size, rest, "size");
  return (
    <input
      style={{ border: "2px solid red" }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
// 步骤2: 使用connect函数包裹
export const FormilyMyInput: DnFC<React.ComponentProps<typeof MyInput>> =
  connect(
    MyInput,
    mapProps((props, field) => {
      console.log(props, "props", field, "field");
      return {
        ...props,
        type: "number",
        title: "MyInputTitle",
        description: "MyInputDescription",
        required: true,
        validateStatus: true,
      };
    })
  );

export default FormilyMyInput;
