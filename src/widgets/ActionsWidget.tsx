import React, { useEffect } from "react";
import { Space, Button, Radio } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { useDesigner, TextWidget } from "@designable/react";
import { GlobalRegistry } from "@designable/core";
import { observer } from "@formily/react";

export const ActionsWidget = observer(() => {
  const designer = useDesigner();
  // useEffect(() => {
  //   loadInitialSchema(designer)
  // }, [])

  useEffect(() => {
    GlobalRegistry.setDesignerLanguage("zh-cn");
  }, []);
  return (
    <Space style={{ marginRight: 10 }}>
      {/* <Button href="https://designable-fusion.formilyjs.org">
        Alibaba Fusion
      </Button> */}

      {/* <Button
        onClick={() => {
          saveSchema(designer)
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button> */}
      {/* <Button
        type="primary"
        onClick={() => {
          saveSchema(designer)
        }}
      >
        <TextWidget>发布</TextWidget>
      </Button> */}
    </Space>
  );
});
