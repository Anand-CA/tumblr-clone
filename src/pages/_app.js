import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* box sizing */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* reset margins */
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  body {
    background:#001935;
    font-family:'Helvetica Neue',Arial,sans-serif;
    color:#fff;
    line-height:1.5;
  }

  /* form elements */
  input,
  textarea,
  button,
  select {
    font:inherit;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
