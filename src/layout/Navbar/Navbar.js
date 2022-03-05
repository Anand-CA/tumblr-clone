import { Input } from "@nextui-org/react";
import React from "react";
import { Container, Left, Logo, Right, Wrapper } from "./Navbar.styled";

const Navbar = () => {
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
					<img src="/navbar/avatar.svg" alt="avatar" />
				</Right>
			</Container>
		</Wrapper>
	);
};

export default Navbar;
