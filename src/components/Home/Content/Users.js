import { Avatar, Button } from "@nextui-org/react";
import axios from "../../../utils/axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { socket } from "../../../utils/socketio";
import { useDispatch, useSelector } from "react-redux";
import { follow, getUsers, unFollow } from "../../../redux/actions/auth";

function Users() {
	const user = useSelector(state => state.auth.user);
	const users = useSelector(state => state.auth.users);
	const [online, setOnline] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			socket.on("follow", data => {
				// data.senderId
				// data.receiverId

				dispatch({
					type: "SET_FOLLOWING_FOLLOWERS",
					payload: {
						sender: data.senderId,
						receiver: data.receiverId
					}
				});
			});

			socket.on("unfollow", data => {
				// data.senderId
				// data.receiverId
				dispatch({
					type: "UNSET_FOLLOWING_FOLLOWERS",
					payload: {
						sender: data.senderId,
						receiver: data.receiverId
					}
				});
			});
		}

		return () => {
			socket.off("follow");
			socket.off("unfollow");
		};
	}, [dispatch, user]);

	return (
		<Wrapper>
			<h3>Users</h3>
			{users?.map(
				u =>
					user?._id !== u._id && (
						<Item key={u._id}>
							<div>
								<Avatar src={u.avatar} size="lg" />
							</div>
							<div>
								<h4>{u.displayName}</h4>
								<p>Following: {u?.following?.length}</p>
								<p>Followers: {u?.followers?.length}</p>
							</div>
							{user?.following.includes(u._id) ? (
								<Button
									onClick={() => dispatch(unFollow(u._id))}
									light
									color="primary"
									auto
								>
									Following
								</Button>
							) : (
								<Button
									onClick={() => dispatch(follow(u._id))}
									light
									color="primary"
									auto
								>
									Follow
								</Button>
							)}
						</Item>
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

	h3 {
		font-size: 1.3rem;
		padding: 0.3rem 0;
		border-bottom: 1px solid lightblue;
	}
`;
const Item = styled.div`
	display: flex;
	align-items: center;
	gap: 0.8rem;
	padding: 0.8rem 0;

	h4 {
		font-size: 0.8rem;
	}

	p {
		font-size: 0.6rem;
	}
`;
