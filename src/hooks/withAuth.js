import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Auth } from "../components/Auth";
import LoadingScreen from "../layout/Loading/LoadingScreen";

function withAuth(Component) {
	const AuthenticatedComponent = () => {
		const user = useSelector(state => state.auth.user);
		const userCheckStatus = useSelector(state => state.auth.userCheckStatus);

		if (typeof window !== "undefined") {
			const token = localStorage.getItem("accesstoken");
			if (token) {
				if (userCheckStatus === "loading") {
					return <LoadingScreen />;
				} else if (userCheckStatus === "succeeded") {
					if (!user) {
						return <Auth />;
					} else if (user) {
						return <Component />;
					}
				}
			} else {
				return <Auth />;
			}
		}
		return <Auth />;
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
