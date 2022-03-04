import Image from "next/image";
import styled from "styled-components";

function PostHeader() {
  const icons = ["text", "photo", "quote", "link", "chat", "video", "audio"];

  return (
    <Wrapper>
      <Left>
        <ImageContainer>
          <Image
            src="/avatar.png"
            layout="fill"
            objectFit="cover"
            alt="avatar image"
          />
        </ImageContainer>
      </Left>
      <Right>
        {icons.map((item, i) => (
          <Icon key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/headIcons/${item}.svg`} alt="" />
            <span>{item}</span>
          </Icon>
        ))}
      </Right>
    </Wrapper>
  );
}
export default PostHeader;

const Wrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  z-index: 1;

  @media (max-width: 1124px) {
    display: none;
  }
`;
const Left = styled.div`
  position: sticky;
  top: 0.6rem;
  height: fit-content;
`;
const Right = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 0.2rem;
  flex: 1;

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

  span {
    text-transform: capitalize;
  }
`;
