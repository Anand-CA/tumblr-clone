import { Avatar, Modal } from "@nextui-org/react";
import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import Photo from "../../../layout/Modal/Photo";
import Post from "../../../layout/Toast/Post";

function PostHeader() {
  const icons = ["text", "photo", "quote", "link", "chat", "video", "audio"];
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

  const openModal = (i) => {
    setActive(i);
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };

  return (
    <>
      {/* <Post /> */}
      <Modal
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeModal}
        width="35rem"
        css={{
          borderRadius: "0",
          background: "transparent",
        }}
      >
        <Photo closeModal={closeModal} />
      </Modal>
      {/* ---------------------------------------------------- */}
      <Wrapper>
        <Left>
          <Avatar
            css={{ borderRadius: ".4rem" }}
            size="xl"
            squared
            src="avatar.png"
          />
        </Left>
        <Right>
          {icons.map((item, i) => (
            <Icon onClick={() => openModal(item)} key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/headIcons/${item}.svg`} alt="" />
              <span>{item}</span>
            </Icon>
          ))}
        </Right>
      </Wrapper>
    </>
  );
}
export default PostHeader;

const Wrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  z-index: 1;
`;
const Left = styled.div`
  position: sticky;
  top: 0.6rem;
  height: fit-content;
  @media (max-width: 40em) {
    display: none;
  }
`;
const Right = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 0.2rem;
  overflow-x: scroll;
  flex: 1;

  /* hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }

  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: space-between;
`;
const ImageContainer = styled.div`
  position: relative;
  width: 60px;
  height: 60px;

  overflow: hidden;
  border-radius: 5px;
`;
const Icon = styled.div`
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    img {
      transform: scale(1.1);
    }
  }

  span {
    text-transform: capitalize;
  }
`;
