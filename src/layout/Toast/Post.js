import { Card, Text } from "@nextui-org/react";
import React from "react";

function Post() {
  return (
    <Card
      css={{
        position: "fixed",
        top: 15,
        zIndex: 99,
        maxWidth: "20rem",
        left: 0,
        right: 0,
        margin: "auto auto",
        display: "none",
      }}
      color="success"
    >
      <Text small css={{ color: "$white" }} transform="capitalize">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, eos.
      </Text>
    </Card>
  );
}

export default Post;
