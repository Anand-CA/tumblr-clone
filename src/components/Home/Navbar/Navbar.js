import React from "react";
import { Container, Icon, Left, Logo, Right, Wrapper } from "./Navbar.styled";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineExplore, MdOutlineMailOutline } from "react-icons/md";

const Navbar = () => {
  return (
    <Wrapper>
      <Container>
        <Left>
          <Logo src="/tumblr-logo.svg" alt="tumblr logo" />
        </Left>

        <Right>
          <AiFillHome fontSize="2rem" />
          <MdOutlineExplore fontSize="2rem" />
          <MdOutlineMailOutline fontSize="2rem" />
        </Right>
      </Container>
    </Wrapper>
  );
};

export default Navbar;
