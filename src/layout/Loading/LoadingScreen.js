import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "../../../public/lottie.json";

export default function LoadingScreen() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice"
		}
	};
	return (
		<Backdrop>
			<Lottie options={defaultOptions} height="100%" width="100%" />
		</Backdrop>
	);
}

const Backdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.2);
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
`;
