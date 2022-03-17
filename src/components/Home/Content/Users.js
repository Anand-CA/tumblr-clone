import { Spacer } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getUsers } from "../../../redux/actions/auth";
import { socket } from "../../../utils/socketio";
import User from "./User";

function Users() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);
	const users = useSelector(state => state.auth.users);
	const [onlineUsers, setOnlineUsers] = useState([]);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	useEffect(() => {
		user &&
			socket.on("connected:users", data => {
				setOnlineUsers(data);
			});

		user &&
			socket.on("disconnected:users", data => {
				setOnlineUsers(data);
			});
		user &&
			socket.on("follow", data => {
				dispatch({
					type: "SET_FOLLOWING_FOLLOWERS",
					payload: {
						senderId: data.senderId,
						receiverId: data.receiverId
					}
				});
			});

		user &&
			socket.on("unfollow", data => {
				dispatch({
					type: "UNSET_FOLLOWING_FOLLOWERS",
					payload: {
						senderId: data.senderId,
						receiverId: data.receiverId
					}
				});
			});

		return () => {
			socket.off("connected:users");
			socket.off("disconnected:users");
			socket.off("follow");
			socket.off("unfollow");
		};
	}, [dispatch, user]);

	return (
		<Wrapper>
			<h3>Users</h3>

			{users?.map(
				u =>
					u._id !== user?._id && (
						<>
							<Spacer y={1} />
							<User u={u} onlineUsers={onlineUsers} />
						</>
					)
			)}

			<a href="#">See more</a>
		</Wrapper>
	);
}

export default Users;

const Wrapper = styled.div`
	a {
		text-decoration: none;
		color: #00b8ff;
		font-size: 0.9rem;
	}

	p {
		/* color: #000; */
	}

	h3 {
		font-size: 1.3rem;
		padding: 0.3rem 0;
		border-bottom: 1px solid lightblue;
	}
`;
