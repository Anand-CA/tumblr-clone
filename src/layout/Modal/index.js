import { Avatar } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useOnClickOutside from "../../hooks/useOutsideClick";

function Modal({ open, closeModal, children }) {
	const ref = useRef();
	useOnClickOutside(ref, closeModal);
	if (open) {
		return (
			<Wrapper>
				<Container ref={ref}>
					<Left>
						<Avatar size="xl" squared src="/avatar.png" />
					</Left>

					{children}
				</Container>
			</Wrapper>
		);
	} else {
		return null;
	}
}

export default Modal;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	height: 100vh;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	z-index: 99999;
	background: rgba(0, 0, 0, 0.5);
	@media (max-width: 40em) {
		align-items: start;
	}
`;
const Container = styled.div`
	margin: 0 auto;
	display: flex;
	width: min(100%, 30rem);
	gap: 2rem;

	@media (max-width: 40em) {
		flex-direction: column;
	}
`;
const Left = styled.div`
	@media (max-width: 40em) {
		display: none;
	}
`;
