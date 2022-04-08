import { Row, Text } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import LoadingScreen from "../../layout/Loading/LoadingScreen";
import { googleAuth } from "../../redux/actions/auth";
import Signin from "./Signin";
import Signup from "./Signup";
import Image from "next/image";

export default function Auth() {
	const dispatch = useDispatch();
	const googleAuthStatus = useSelector(state => state.auth.googleAuthStatus);
	function onGoogleSuccess(response) {
		dispatch(googleAuth(response.tokenId));
	}

	const onGoogleFailure = response => {};
	const tabs = ["Log in", "Sign up"];
	const [active, setActive] = React.useState(tabs[0]);

	if (googleAuthStatus === "loading") {
		return <LoadingScreen />;
	}

	return (
		<Wrapper>
			<Container>
				<Image
					src="/tumblr-text.svg"
					alt="tumblr logo"
					width={200}
					height={80}
					layout="responsive"
				/>
				{active === "signin" && <Signin />}
				<h2>Make stuff, look at stuff, talk about stuff, find your people.</h2>

				<Row
					css={{
						flex: 1
					}}
				>
					{tabs.map((t, i) => (
						<Row
							key={i}
							css={{
								flexDirection: "column"
							}}
						>
							<button
								onClick={() => setActive(t)}
								style={{
									background: "transparent",
									color: "#fff",
									width: "100%"
								}}
							>
								{t}
							</button>
							{t == active ? (
								<motion.div
									style={{
										height: "3px",
										width: "100%",
										background: "#00CF35",
										borderRadius: "3px"
									}}
								/>
							) : null}
						</Row>
					))}
				</Row>

				{active === "Log in" && <Signin />}
				{active === "Sign up" && <Signup />}
				<Row
					css={{
						gap: "$5",
						alignItems: "center"
					}}
				>
					<div
						style={{
							height: "3px",
							background: "#e6e6e6",
							flex: 1
						}}
					/>
					<p>or</p>
					<div
						style={{
							height: "3px",
							background: "#e6e6e6",
							flex: 1
						}}
					/>
				</Row>
				<p></p>
				<GoogleLogin
					clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
					render={renderProps => (
						<button
							className="google-btn"
							onClick={renderProps.onClick}
							disabled={renderProps.disabled}
						>
							<FcGoogle fontSize="1.5rem" />
							<span>Sign in with Google</span>
						</button>
					)}
					onSuccess={onGoogleSuccess}
					onFailure={onGoogleFailure}
				/>
				<p
					style={{
						fontSize: "0.8rem",
						opacity: 0.7
					}}
				>
					🚀 Only your email, displayName and photo will be accessed.
				</p>
				<Text color="error" small>
					Only google authentication works for now!!!
				</Text>
			</Container>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	min-height: 100vh;
`;
const Container = styled.div`
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	text-align: center;
	padding: 2em;
	max-width: 25rem;

	button {
		border: none;
		padding: 0.5em 0;
		border-radius: 0.2rem;
		font-weight: 500;
	}

	.signup {
		background: ${props => props.theme.colors.primary};
	}

	.signin {
		background: ${props => props.theme.colors.tertiary};
	}

	.google-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		background: #fff;
	}
`;
