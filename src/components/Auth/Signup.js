import React from "react";
import styled from "styled-components";

export default function Signup() {
	return (
		<Wrapper>
			<input type="text" placeholder="Email" />
			<input type="text" placeholder="Password" />
			<input type="text" placeholder="Blog name" />
			<p>
				By clicking sign up, or continuing with the other options below, you
				agree to Tumblr’s Terms of Service and have read the Privacy Policy
			</p>
			<button>Sign up</button>
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
