import styled from "styled-components";
import React, { useEffect } from "react";
import { Avatar, Input, Text } from "@nextui-org/react";

import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsReply, BsFillArrowRightSquareFill } from "react-icons/bs";
import {
	MdOutlineModeEditOutline,
	MdOutlineDeleteOutline
} from "react-icons/md";
import { IoMdArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
	deletecomment,
	dislikeComment,
	likeComment
} from "../../../redux/actions/post";
import { motion } from "framer-motion";
import { socket } from "../../../utils/socketio";

const CommentDetail = ({ c }) => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);
	const [toggle, setToggle] = React.useState({
		reply: false,
		like: c.likes.includes(user._id) ? true : false,
		edit: false
	});

	useEffect(() => {
		c.likes.includes(user._id)
			? setToggle({ ...toggle, like: true })
			: setToggle({ ...toggle, like: false });
	}, [c, user, toggle]);

	const handleToggle = type => {
		setToggle({
			...toggle,
			[type]: !toggle[type]
		});
	};

	const [replyTxt, setReplyTxt] = React.useState(c.content);

	const deleteComment = () => {
		dispatch(deletecomment(c._id));
	};

	return (
		<Wrapper>
			<Left>
				<Avatar squared src={c?.userId?.avatar} />
			</Left>
			<Right>
				<Top edit={toggle.edit}>
					<input
						readOnly={!toggle.edit ? true : false}
						value={replyTxt}
						onChange={e => setReplyTxt(e.target.value)}
					/>
					{toggle.edit && <IoMdArrowForward fontSize="1.5rem" />}
				</Top>
				<Bottom>
					{toggle.like ? (
						<AiFillLike
							fill="red"
							fontSize="1.3rem"
							onClick={() => {
								dispatch(dislikeComment(c._id, c.postId, user._id));
							}}
						/>
					) : (
						<AiOutlineLike
							onClick={() => {
								handleToggle("like");
								dispatch(likeComment(c._id, c.postId, user._id));
							}}
							fontSize="1.3rem"
						/>
					)}
					<Text css={{ marginLeft: "-$2" }} small>
						{c.likes.length}
					</Text>
					<BsReply onClick={() => handleToggle("reply")} fontSize="1.3rem" />
					<Text css={{ marginLeft: "-$2" }} small>
						{c.replies.length}
					</Text>

					<MdOutlineModeEditOutline
						onClick={() => handleToggle("edit")}
						fontSize="1.3rem"
					/>
					{user?._id === c?.userId?._id && (
						<MdOutlineDeleteOutline onClick={deleteComment} fontSize="1.3rem" />
					)}
				</Bottom>
			</Right>
		</Wrapper>
	);
};

export default CommentDetail;

export const Wrapper = styled.div`
	margin-top: 1rem;
	display: flex;
	align-items: center;
	gap: 1rem;
`;
export const Left = styled.div``;
export const Right = styled.div``;
export const Top = styled.div`
	display: flex;
	align-items: center;
	gap: 0.4rem;
	input {
		border: ${props => (props.edit ? "1px solid #ccc" : "none")};
		outline: none;
	}

	svg {
		&:active {
			transform: scale(0.9);
		}
	}
`;
export const Bottom = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;
