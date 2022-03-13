import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Post from "../../../layout/Toast";
import Toast from "../../../layout/Toast";
import Text from "../../../layout/Modal/Text";
import Photo from "../../../layout/Modal/Photo";
import { socket } from "../../../utils/socketio";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../layout/Modal";

function PostHeader() {
	const user = useSelector(state => state.auth.user);
	const icons = ["text", "photo", "quote", "link", "chat", "video", "audio"];
	const [visible, setVisible] = useState(false);
	const [notiShow, setNotiShow] = useState(false);
	const [active, setActive] = useState("");
	const [toast, setToast] = useState({
		show: false,
		type: "",
		msg: ""
	});
	const dispatch = useDispatch();
	const openModal = i => {
		setActive(i);
		setVisible(true);
	};
	const closeModal = () => {
		setVisible(false);
	};

	const openNoti = () => {
		setNotiShow(true);
	};

	useEffect(() => {
		socket.on("post-notify", data => {
			console.log("receiver", data);
			dispatch({
				type: "OPEN_TOAST",
				payload: {
					show: true,
					type: data.type,
					msg: data.msg
				}
			});
		});

		socket.on("follow-notify", data => {
			dispatch({
				type: "OPEN_TOAST",
				payload: {
					show: true,
					type: "warning",
					message: data.msg
				}
			});
		});

		socket.on("like", data => {
			console.log("like", data);
			setToast({
				show: true,
				type: "warning",
				msg: data.msg
			});
		});

		return () => {
			socket.off("post-notify");
			socket.off("like");
		};
	}, []);

	useEffect(() => {
		if (toast.show) {
			setTimeout(() => {
				setToast({
					show: false,
					type: "",
					msg: ""
				});
			}, 4000);
		}
	}, [toast.show]);

	return (
		<>
			<Modal open={visible} closeModal={closeModal}>
				{active === "text" && (
					<Text closeModal={closeModal} setToast={setToast} />
				)}
				{active === "photo" && (
					<Photo closeModal={closeModal} setToast={setToast} />
				)}
			</Modal>
			{/* ---------------------------------------------------- */}
			<Wrapper>
				<Left>
					<Avatar
						// bordered
						// borderWeight="light"
						// css={{ borderRadius: ".4rem" }}
						size="xl"
						squared
						src={user?.avatar || "/avatar.png"}
					/>
				</Left>
				<Right>
					{icons.map((item, i) => (
						<Icon onClick={() => openModal(item)} key={i}>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src={`/headIcons/${item}.svg`} alt="" />
							<span>{item}</span>
						</Icon>
					))}
				</Right>
			</Wrapper>
		</>
	);
}
export default PostHeader;

const Wrapper = styled.div`
	display: flex;
	gap: 1.5rem;
	z-index: 1;
`;
const Left = styled.div`
	position: sticky;
	top: 0.6rem;
	height: fit-content;
	@media (max-width: 40em) {
		display: none;
	}
`;
const Right = styled.div`
	background: #fff;
	padding: 1rem;
	border-radius: 0.2rem;
	overflow-x: scroll;
	flex: 1;

	/* hide scrollbar */
	&::-webkit-scrollbar {
		display: none;
	}

	display: flex;
	align-items: center;
	gap: 2rem;
	justify-content: space-between;
`;
const ModalLeft = styled.div`
	margin-right: 1.5rem;
	img {
		border-radius: 5px;
	}
`;
const Icon = styled.div`
	color: #000;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;

	&:hover {
		img {
			transform: scale(1.1);
		}
	}

	span {
		text-transform: capitalize;
	}
`;
