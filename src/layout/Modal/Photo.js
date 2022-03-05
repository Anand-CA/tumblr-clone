import { Button, Row, Text } from "@nextui-org/react";
import React from "react";
import { FiSettings } from "react-icons/fi";
import styled from "styled-components";

function Photo({ closeModal }) {
  return (
    <Container>
      <Left>
        <img src="/avatar.png" alt="avatar" />
      </Left>
      <Right>
        <Row
          css={{
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Text small>densecblogs</Text>
          <FiSettings fontSize="1.4rem" color="grey" />
        </Row>
        <TitleInput placeholder="Title" />
        <TextArea
          name=""
          id=""
          cols="30"
          placeholder="Your text here..."
          rows="10"
        ></TextArea>

        <Row justify="space-between">
          <Button
            css={{
              minWidth: "$5",
              background: "#9da6af",
            }}
            size="sm"
            onClick={closeModal}
          >
            Close
          </Button>
          <Button
            css={{
              minWidth: "$5",
              background: "#00b8ff",
            }}
            size="sm"
          >
            Post
          </Button>
        </Row>
      </Right>
    </Container>
  );
}

export default Photo;

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
`;
export const Left = styled.div`
  img {
    border-radius: 5px;
  }
`;
export const Right = styled.div`
  flex: 1;
  border-radius: 5px;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.4rem;
`;

export const TitleInput = styled.input`
  font-size: 2rem;
  border: none;
  outline: none;
`;
export const TextArea = styled.textarea`
  border: none;
  outline: none;
`;
