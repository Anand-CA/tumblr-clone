import Router from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { Auth } from "../components/Auth";
import Loader from "../layout/Loader";
import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "../../public/lottie.json";

function withAuth(Component) {
	const AuthenticatedComponent = () => {
		const user = useSelector(state => state.auth.user);
		const userCheckStatus = useSelector(state => state.auth.userCheckStatus);

		const defaultOptions = {
			loop: true,
			autoplay: true,
			animationData: animationData,
			rendererSettings: {
				preserveAspectRatio: "xMidYMid slice"
			}
		};

		if (userCheckStatus === "loading") {
			return (
				<Backdrop>
					<Lottie options={defaultOptions} height="100%" width="100%" />
				</Backdrop>
			);
		} else if (userCheckStatus === "succeeded") {
			if (!user) {
				return <Auth />;
			} else if (user) {
				return <Component />;
			}
		} else {
			return null;
		}
	};

	return AuthenticatedComponent;
}

export default withAuth;

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
