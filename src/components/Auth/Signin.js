import React from "react";
import styled from "styled-components";

export default function Signin() {
	return (
		<Wrapper>
			<input type="text" placeholder="Email" />
			<input type="text" placeholder="Password" />
			<p>
				By clicking sign up, or continuing with the other options below, you
				agree to Tumblr’s Terms of Service and have read the Privacy Policy
			</p>
			<button>Log in</button>
			<h4>Forgot your password</h4>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	input {
		border: none;
		border-radius: 0.2rem;
		padding: 0.6rem;
		outline: none;
	}

	button {
		border: none;
		padding: 0.5em 0;
		border-radius: 0.2rem;
		font-weight: 500;
		background: ${props => props.theme.colors.primary};
	}
`;
