import { Avatar, Button, Card, Row, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { follow, unFollow } from "../../../redux/actions/auth";

function User({ u, onlineUsers, lastSeen }) {
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);

	function isUserOnline(userId) {
		return onlineUsers.find(user => user.userId === userId);
	}

	return (
		<Row
			key={u._id}
			css={{
				padding: "$6 0",
				gap: "$8",
				alignItems: "center"
			}}
		>
			<Avatar squared src={u.avatar} />

			<div
				style={{
					flex: 1
				}}
			>
				<Text color h4>
					{u.displayName}
				</Text>

				{user && isUserOnline(u._id) && <p>🟢</p>}

				{!isUserOnline(u._id) && (
					<Text color h6>
						Last seen{" "}
						<Moment fromNow ago>
							{lastSeen ? new Date(lastSeen) : new Date(u.lastSeen)}
						</Moment>{" "}
						ago
					</Text>
				)}
			</div>
			{u.followers.includes(user?._id) ? (
				<Button
					onClick={() => dispatch(unFollow(u._id))}
					color="error"
					size="sm"
				>
					unfollow
				</Button>
			) : (
				<Button onClick={() => dispatch(follow(u._id))} size="sm">
					follow
				</Button>
			)}
		</Row>
	);
}

export default User;
