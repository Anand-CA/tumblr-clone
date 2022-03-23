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

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			socket.on("user-online", data => {
				// { id , isOnline}
				// update this user's isOnline status
				dispatch({ type: "SET_USER_ONLINE", payload: data });
			});

			socket.on("user-offline", data => {
				// { id , isOnline}
				// update this user's isOnline status
				dispatch({ type: "SET_USER_OFFLINE", payload: data });
			});

			socket.on("follow-notify", data => {
				dispatch({
					type: "OPEN_TOAST",
					payload: {
						message: data.msg,
						type: "success"
					}
				});
			});

			socket.on("follow", data => {
				dispatch({
					type: "SET_FOLLOWING_FOLLOWERS",
					payload: {
						senderId: data.senderId,
						receiverId: data.receiverId
					}
				});
			});

			socket.on("unfollow", data => {
				dispatch({
					type: "UNSET_FOLLOWING_FOLLOWERS",
					payload: {
						senderId: data.senderId,
						receiverId: data.receiverId
					}
				});
			});
		}

		return () => {
			socket.off("user-online");
			socket.off("user-offline");
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
						<div key={u._id}>
							<Spacer y={1} />
							<User u={u} />
						</div>
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
