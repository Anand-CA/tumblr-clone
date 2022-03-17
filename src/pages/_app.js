import Head from "next/head";
import { Provider } from "react-redux";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import useAuth from "../hooks/useAuth";
import { useStore } from "../redux/store";
import Toast from "../layout/Toast";
import { NextUIProvider } from "@nextui-org/react";

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
	const store = useStore(pageProps.initialReduxState);
	useAuth(store.dispatch);

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
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					<Toast />
					<Component {...pageProps} />
				</ThemeProvider>
			</Provider>
		</>
	);
}

export default MyApp;
