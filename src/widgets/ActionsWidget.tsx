import { useEffect } from "react";
import { Space } from "antd";
import { transformToTreeNode } from "@designable/formily-transformer";

import { useDesigner } from "@designable/react";
import { GlobalRegistry } from "@designable/core";
import { observer } from "@formily/react";
import Emittery from "emittery";

export const ActionsWidget = observer(({ emitter }: { emitter: Emittery }) => {
  const designer = useDesigner();
  useEffect(() => {
    emitter.on("setCurrentSchema", (s) => {
      console.log(designer, "designer");
      designer.setCurrentTree(transformToTreeNode(s));
    });
    emitter.emit("getDesignerInstance", designer);
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
