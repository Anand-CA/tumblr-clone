import styled from "styled-components";
export const Container = styled.div`
  width: min(90%, 65rem);
  height: 100%;
  margin-inline: auto;

  padding: 2rem 0;
  display: grid;
  grid-template-columns: 1fr 23rem;
  gap: 2rem;

  @media (max-width: 1124px) {
    grid-template-columns: 1fr;
    padding: 0;
  }

  @media (max-width: 40em) {
    width: 100%;
  }
`;
export const Left = styled.div``;
export const Right = styled.div`
  position: sticky;
  top: 0.5rem;
  height: fit-content;

  @media (max-width: 1124px) {
    display: none;
  }
`;
