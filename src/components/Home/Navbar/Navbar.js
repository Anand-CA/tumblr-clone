import React from "react";
import { Container, Left, Logo, Right, Wrapper } from "./Navbar.styled";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineExplore, MdOutlineMailOutline } from "react-icons/md";
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { Input } from "@nextui-org/react";

const Navbar = () => {
  return (
    <Wrapper>
      <Container>
        <Left>
          <Logo src="/tumblr-logo.svg" alt="tumblr logo" />
          <Input clearable placeholder="Type something..." />
        </Left>

        <Right>
          <AiFillHome fontSize="2rem" />
          <MdOutlineExplore fontSize="2rem" />
          <MdOutlineMailOutline fontSize="2rem" />
          <BsEmojiSunglassesFill fontSize="1.7rem" />
        </Right>
      </Container>
    </Wrapper>
  );
};

export default Navbar;
