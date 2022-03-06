import {
	Button,
	Checkbox,
	Input,
	Modal,
	Row,
	Spacer,
	Text
} from "@nextui-org/react";
import React from "react";
import { Container, Left, Logo, Right, Wrapper } from "./Navbar.styled";
import { HiLockClosed } from "react-icons/hi";
import { FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useTheme } from "styled-components";
import axios from "axios";
import Link from "next/link";
import { GoogleLogin } from "react-google-login";

const Navbar = () => {
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);
	const [visible, setVisible] = React.useState(false);
	const [showPass, setShowPass] = React.useState(false);
	const open = () => setVisible(true);
	const close = () => {
		setVisible(false);
	};
	const theme = useTheme();

	function onGoogleSuccess(response) {
		axios
			.post("http://localhost:8000/api/v1/auth/google", {
				tokenId: response.tokenId
			})
			.then(res => {
				console.log(res);
				setIsAuthenticated(true);
				setVisible(false);
				// store user in redux and persist user
			})
			.catch(err => {
				console.log(err);
			});
	}

	function onGoogleFailure(response) {
		console.log(response);
	}
	return (
		<>
			<Modal
				closeButton
				aria-labelledby="modal-title"
				open={visible}
				onClose={close}
			>
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
						clientId="43606210965-2cgmfflk9qhp485q39mtrg4gactu0veh.apps.googleusercontent.com"
						buttonText="Login with google"
						onSuccess={onGoogleSuccess}
						onFailure={onGoogleFailure}
					/>
				</Modal.Body>
				<Modal.Footer></Modal.Footer>
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
								<img src="/navbar/avatar.svg" alt="avatar" />
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
