import React, { useState } from "react";
import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import {
	Avatar,
	Button,
	Card,
	Col,
	Input,
	Row,
	Text,
	Tooltip
} from "@nextui-org/react";
import useSound from "use-sound";
import { RiSendPlaneFill } from "react-icons/ri";
import axios from "axios";

function Post({ p }) {
	const [states, setStates] = useState({
		liked: false,
		commentBox: false
	});

	const [playOn] = useSound("/sfx/pop-up-off.mp3", { id: "on" });
	const [playOff] = useSound("/sfx/pop-up-on.mp3", { id: "off" });
	const handleLike = () => {
		if (states.liked) {
			playOff();
		} else {
			playOn();
		}
		setStates({
			...states,
			liked: !states.liked
		});
	};

	const handleComment = () => {
		setStates({
			...states,
			commentBox: !states.commentBox
		});
	};

	const deletePost = () => {
		alert("delete post");
		axios.delete(`/post/delete/${}`);
	};

	return (
		<Wrapper>
			<Left>
				<Avatar
					css={{ borderRadius: ".4rem" }}
					size="xl"
					squared
					src={p?.user?.avatar}
				/>
			</Left>
			<Right>
				<Head>
					<Avatar
						css={{
							"@media (min-width:40em)": {
								display: "none"
							}
						}}
						src={p?.user?.avatar}
						size="md"
					/>
					<p>{p?.user?.email}</p>
					<a href="#">Follow</a>
					<Row style={{ justifyContent: "end" }}>
						<Tooltip
							content={
								<Button onClick={deletePost} color="primary" auto>
									Delete
								</Button>
							}
							placement="bottom"
							trigger="hover"
							color="primary"
						>
							<BsThreeDots fontSize="1.7rem" />
						</Tooltip>
					</Row>
				</Head>

				{/* change with nextjs image */}
				<img src={p?.image} alt="" />

				<ContentContainer>
					<Desc>{p?.caption}</Desc>

					<Tag>#sorry for posting</Tag>

					<Stat>
						<Like>
							<img src="/post/heart.svg" alt="" />
							<span>{p?.likeCount}</span>
						</Like>
						<Comment>
							<img src="/post/comment.svg" alt="" />
							<span>{p?.commentCount}</span>
						</Comment>
					</Stat>

					<Controls>
						<Tooltip
							css={{ color: "#fff" }}
							content={states.liked ? "Liked" : "Like"}
							rounded
							color="invert"
						>
							{states.liked ? (
								<AiFillHeart
									onClick={handleLike}
									color="red"
									fontSize="1.7rem"
								/>
							) : (
								<AiOutlineHeart onClick={handleLike} fontSize="1.7rem" />
							)}
						</Tooltip>

						<Tooltip
							css={{ color: "#fff" }}
							content={"Comment"}
							rounded
							color="invert"
						>
							<FaRegComment
								onClick={handleComment}
								color={states.commentBox && "green"}
								fontSize="1.5rem"
							/>
						</Tooltip>

						<Tooltip
							css={{ color: "#fff" }}
							color="invert"
							content={"Share"}
							rounded
						>
							<FiShare fontSize="1.5rem" />
						</Tooltip>
					</Controls>

					{states.commentBox && (
						<CommentBox>
							<Row
								css={{
									alignItems: "center",
									gap: "$6"
								}}
							>
								<Avatar squared src="avatar.png" />
								<Input
									clearable
									css={{
										width: "100%"
									}}
									placeholder="Write a comment..."
									contentRight={<RiSendPlaneFill fontSize="2rem" />}
								/>
							</Row>

							{/* comment */}
							<Row
								css={{
									alignItems: "center",
									gap: "$6",
									padding: "$8 0"
								}}
							>
								<Avatar squared src="avatar.png" />
								<Card
									bordered
									shadow={false}
									css={{
										width: "fit-content"
									}}
								>
									<Text small>Lorem ipsum dolor sit amet.</Text>
								</Card>
							</Row>
						</CommentBox>
					)}
				</ContentContainer>
			</Right>
		</Wrapper>
	);
}

export default Post;

export const Wrapper = styled.div`
	display: flex;
	margin-top: 1.5rem;
	gap: 1.25rem;

	@media (max-width: 1124px) {
		margin-top: 0.5rem;
	}
`;
export const Left = styled.div`
	position: sticky;
	top: 0.6rem;
	height: fit-content;
	img {
		border-radius: 5px;
	}

	@media (max-width: 40em) {
		display: none;
	}
`;
export const Right = styled.div`
	border-radius: 0.2rem;
	background: #fff;
	color: #000;
	flex: 1;

	img {
		width: 100%;
		object-fit: cover;
	}

	@media (max-width: 40em) {
		border-radius: 0;
	}
`;

const Head = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 1rem 1rem;

	a {
		text-decoration: none;
		color: #00b8ff;
		font-size: 0.95rem;
		margin-bottom: -0.2rem;
	}
`;

export const ContentContainer = styled.div`
	padding: 0.5rem 1rem 1rem 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
`;

export const Desc = styled.div`
	font-size: 1rem;
	opacity: 0.8;
`;
export const Tag = styled.div`
	opacity: 0.5;
	font-size: 1rem;
`;

export const Stat = styled.div`
	display: flex;
	gap: 0.8rem;
	img {
		height: 23px;
		width: 23px;
	}
	span {
		font-size: 0.9rem;
	}
`;
export const Like = styled.div`
	display: flex;
	align-items: center;
	gap: 0.2rem;
`;
export const Comment = styled.div`
	display: flex;
	align-items: center;
	gap: 0.2rem;
`;

export const Controls = styled.div`
	border-top: 1px solid lightgrey;
	padding-top: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	opacity: 0.5;

	svg {
		user-select: none;
	}
`;

export const CommentBox = styled.div`
	padding: 0.5rem 0;
`;
