import Head from "next/head";
import { createGlobalStyle } from "styled-components";
import { useCallback, useEffect } from "react";
import { socket } from "../utils/socketio";
import { ThemeProvider } from "styled-components";

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

function intitialiseSocket() {
	console.log("render");
	socket.auth = {
		userId: "568u6787"
	};
	socket.connect();
}

function MyApp({ Component, pageProps }) {
	const memo = useCallback(() => {}, []);
	useEffect(() => {
		memo();
	}, [memo]);

	const theme = {
		colors: {
			primary: "#00b8ff",
			secondary: "#001935"
		}
	};

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default MyApp;
