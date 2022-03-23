import {
	Avatar,
	Button,
	Card,
	Checkbox,
	Col,
	Input,
	Modal,
	Row,
	Spacer,
	Text,
	Tooltip
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { Container, Left, Logo, Right, Wrapper } from "./Navbar.styled";
import { HiLockClosed } from "react-icons/hi";
import { FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "styled-components";
import axios from "../../utils/axios";
import Link from "next/link";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { FaBell } from "react-icons/fa";
import { socket, startSocket, stopSocket } from "../../utils/socketio";
import {
	deleteNotification,
	fetchNotifications,
	setNotificationAsRead
} from "../../redux/actions/notification";
import styled from "styled-components";
import Loader from "../Loading/Loader";

const Navbar = () => {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();
	const [visible, setVisible] = React.useState(false);
	const [showPass, setShowPass] = React.useState(false);
	const notifications = useSelector(state => state.notification.notifications);
	const [isLoading, setIsLoading] = React.useState(false);
	const unreadNotifications = useSelector(
		state => state.notification.unreadNotifications
	);
	const open = () => setVisible(true);
	const close = () => {
		setVisible(false);
	};
	const theme = useTheme();

	useEffect(() => {
		user && dispatch(fetchNotifications(user._id));
	}, [dispatch, user]);

	function onGoogleSuccess(response) {
		setIsLoading(true);
		axios
			.post("/auth/google", {
				tokenId: response.tokenId
			})
			.then(res => {
				localStorage.setItem("accesstoken", res.data.accesstoken);
				dispatch({ type: "SET_USER", payload: res.data.user });
				startSocket(res.data.user._id);
				setVisible(false);
				setIsLoading(false);
			})
			.catch(err => {
				dispatch({
					type: "OPEN_TOAST",
					payload: {
						message: err.response.data.error,
						type: "error"
					}
				});
				setIsLoading(false);
			});
	}

	function onGoogleFailure(response) {
		console.log(response);
	}

	return (
		<>
			<Modal
				closeButton={!isLoading}
				aria-labelledby="modal-title"
				open={visible}
				onClose={close}
				css={{
					background: isLoading && "transparent"
				}}
			>
				{isLoading ? (
					<Row
						css={{
							height: "27rem",
							display: "flex",
							background: "transparent",
							justifyContent: "center",
							alignItems: "center",
							width: "100%"
						}}
					>
						<Loader />
					</Row>
				) : (
					<>
						<Modal.Header>
							<Text id="modal-title" size={30}>
								Login
							</Text>
						</Modal.Header>
						<Modal.Body>
							<Input
								clearable
								bordered
								fullWidth
								color="primary"
								size="lg"
								placeholder="Email"
								contentLeft={<FiMail />}
							/>
							<Input
								clearable
								bordered
								fullWidth
								color="primary"
								type={showPass ? "text" : "password"}
								size="lg"
								placeholder="Password"
								contentLeft={<HiLockClosed />}
							/>
							<Button
								css={{
									background: theme.colors.primary
								}}
							>
								Sign In
							</Button>
							<Text css={{ textAlign: "center" }}>OR</Text>
							<Spacer y="$3" />
							<GoogleLogin
								clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
								buttonText="Login with google"
								onSuccess={onGoogleSuccess}
								onFailure={onGoogleFailure}
							/>
						</Modal.Body>
					</>
				)}
			</Modal>
			{/* ---------------------------------------------------- */}
			<Wrapper>
				<Container>
					<Left>
						<Logo src="/tumblr-logo.svg" alt="tumblr logo" />
						<Input clearable placeholder="Type something..." />
					</Left>

					<Right>
						{isAuthenticated ? (
							<>
								<img src="/navbar/home.svg" alt="home" />
								<img src="/navbar/explore.svg" alt="explore" />
								<img src="/navbar/chat.svg" alt="chat" />
								<Tooltip
									content={
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												gap: ".3rem"
											}}
										>
											{notifications.length > 0 ? (
												notifications?.map(n => (
													<Card
														key={n._id}
														bordered
														shadow={false}
														css={{ w: "250px" }}
													>
														<Row justify="space-between">
															<p>{n.msg}</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="20"
																viewBox="0 0 20 20"
																fill="red"
																onClick={() => {
																	dispatch(deleteNotification(n._id));
																}}
															>
																<path
																	fillRule="evenodd"
																	d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
																	clipRule="evenodd"
																/>
															</svg>
														</Row>
													</Card>
												))
											) : (
												<p>No notifications 😞</p>
											)}
										</div>
									}
									rounded
									trigger="click"
									onVisibleChange={visible => {
										visible &&
											unreadNotifications.length > 0 &&
											dispatch(
												setNotificationAsRead(notifications.map(n => n._id))
											);
									}}
									css={{
										backgroundColor: "#fff",
										borderRadius: 3,
										maxHeight: "300px",
										overflowY: "scroll"
									}}
									placement="bottomEnd"
								>
									<div
										style={{
											display: "flex",
											position: "relative"
										}}
									>
										{unreadNotifications.length > 0 && <CircleIndication />}
										<FaBell fontSize="1.6rem" color="#fff" />
									</div>
								</Tooltip>
								<Tooltip
									content={
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												gap: ".3rem"
											}}
										>
											<Text h3 color="primary">
												Following {user?.following?.length}
											</Text>
											<Text
												css={{
													whiteSpace: "nowrap"
												}}
												h3
												color="error"
											>
												Followers {user?.followers?.length}
											</Text>
											<Button
												onClick={() => {
													dispatch(logout());
													stopSocket();
												}}
												color="white"
												css={{ color: "#000", borderRadius: 0 }}
												auto
											>
												Log out
											</Button>
										</div>
									}
									trigger="click"
									css={{ backgroundColor: "#fff", borderRadius: 3 }}
									placement="bottomEnd"
								>
									<Avatar size="md" src={user.avatar} zoomed />
								</Tooltip>
							</>
						) : (
							<Button
								css={{
									background: theme.colors.primary
								}}
								onClick={open}
								auto
							>
								Sign In
							</Button>
						)}
					</Right>
				</Container>
			</Wrapper>
		</>
	);
};

export default Navbar;

export const CircleIndication = styled.div`
	height: 0.6rem;
	width: 0.6rem;
	position: absolute;
	right: -4px;
	top: -4px;
	border-radius: 50%;
	background: #17c964;
`;
