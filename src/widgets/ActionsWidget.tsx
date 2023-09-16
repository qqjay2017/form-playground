import { useEffect } from "react";
import { Space } from "antd";

import { useDesigner } from "@designable/react";
import { GlobalRegistry } from "@designable/core";
import { observer } from "@formily/react";

export const ActionsWidget = observer(() => {
  const designer = useDesigner();
  useEffect(() => {
    console.log(designer, "designer");
  }, []);

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
