import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

export default function Loader() {
	return (
		<Wrapper>
			<div></div>
			<div></div>
			<div></div>
		</Wrapper>
	);
}

// key frames
const k1 = keyframes`
   0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
`;

export const Wrapper = styled.div`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;

	div {
		display: inline-block;
		position: absolute;
		left: 8px;
		width: 16px;
		border-radius: 3px;
		background: #fff;
		animation: ${k1} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
	}
	div:nth-child(1) {
		left: 8px;
		animation-delay: -0.24s;
	}
	div:nth-child(2) {
		left: 32px;
		animation-delay: -0.12s;
	}
	div:nth-child(3) {
		left: 56px;
		animation-delay: 0;
	}
`;
