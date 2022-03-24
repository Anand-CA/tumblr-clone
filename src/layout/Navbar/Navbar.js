import {
	Avatar,
	Button,
	Card,
	Checkbox,
	Col,
	Grid,
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
import Moment from "react-moment";
import { RiDeleteBack2Line } from "react-icons/ri";

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

	return (
		<Wrapper>
			<Container>
				<Left>
					<Logo src="/tumblr-logo.svg" alt="tumblr logo" />
					<Input clearable placeholder="Type something..." />
				</Left>

				<Right>
					<img src="/navbar/home.svg" alt="home" />
					<img src="/navbar/explore.svg" alt="explore" />
					<img src="/navbar/chat.svg" alt="chat" />
					{/* notifications */}
					<Tooltip
						hideArrow
						content={
							<Grid.Container css={{ width: "12rem" }} gap={1}>
								{notifications.length > 0 ? (
									notifications?.map(n => (
										<Row
											key={n._id}
											css={{
												padding: "$4 $5",
												borderBottom: "2px solid $blue200",
												gap: "$4"
											}}
										>
											<Row css={{ flexDirection: "column", flex: 1 }}>
												<Text color="default">{n.msg}</Text>
												<Text color="error" size="0.7rem">
													<Moment fromNow>{n.createdAt}</Moment>
												</Text>
											</Row>
											<RiDeleteBack2Line
												onClick={() => dispatch(deleteNotification(n._id))}
												fontSize="1.5rem"
											/>
										</Row>
									))
								) : (
									<Row justify="center">
										<Text color="default" size="1rem">
											No notifications 🔔
										</Text>
									</Row>
								)}
							</Grid.Container>
						}
						rounded
						trigger="click"
						onVisibleChange={visible => {
							visible &&
								unreadNotifications > 0 &&
								dispatch(setNotificationAsRead(notifications.map(n => n._id)));
						}}
						placement="bottomEnd"
					>
						<BellIcon>
							{unreadNotifications > 0 && (
								<div className="badge">{unreadNotifications}</div>
							)}
							<FaBell fontSize="1.6rem" color="#fff" />
						</BellIcon>
					</Tooltip>

					{/* user avatar */}
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
				</Right>
			</Container>
		</Wrapper>
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

const BellIcon = styled.div`
	display: flex;
	position: relative;
	.badge {
		position: absolute;
		right: -5px;
		top: -5px;
		background: #17c964;
		width: 1.2rem;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8rem;
		font-weight: bold;
		height: 1.2rem;
	}
`;
