import React from "react";
import PostHeader from "./PostHeader";
import { Container, Left, Right } from "./Content.styled";
import Blogs from "./Blogs";
import Post from "./Post";

function Content() {
  return (
    <Container>
      <Left>
        <PostHeader />

        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </Left>
      <Right>
        <Blogs />
        {/* <Radar />
        <Sponsored /> */}
      </Right>
    </Container>
  );
}
export default Content;
