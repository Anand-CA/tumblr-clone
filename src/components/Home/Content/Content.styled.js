import styled from "styled-components";
export const Container = styled.div`
  max-width: 66rem;
  height: 100%;
  margin-inline: auto;

  padding: 2rem 1.5em;
  display: grid;
  grid-template-columns: 1fr 23rem;
  gap: 2rem;

  @media (max-width: 1124px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 40em) {
    width: 100%;
    padding: 0;
  }
`;
export const Left = styled.div`
  @media (max-width: 40em) {
    overflow-x: hidden;
  }
`;
export const Right = styled.div`
  position: sticky;
  top: 0.5rem;
  height: fit-content;

  @media (max-width: 1124px) {
    display: none;
  }
`;
