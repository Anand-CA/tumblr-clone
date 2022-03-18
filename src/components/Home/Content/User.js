import { Avatar, Button, Card, Row, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { follow, unFollow } from "../../../redux/actions/auth";

function User({ u }) {
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);
	console.log("🚀 ~ file: User.js ~ line 10 ~ User ~ user", user);

	// function isUserOnline(userId) {
	// 	return onlineUsers?.users?.find(user => user.userId === userId);
	// }

	return (
		<Row
			key={u._id}
			css={{
				padding: "$6 0",
				gap: "$8",
				alignItems: "center"
			}}
		>
			<div
				style={{
					position: "relative"
				}}
			>
				<Avatar referrerPolicy="no-referrer" squared src={u.avatar} />
				{user && u.isOnline && (
					<div
						style={{
							backgroundColor: "lightgreen",
							width: "13px",
							height: "13px",
							borderRadius: "50%",
							position: "absolute",
							zIndex: "100",
							bottom: "-5px",
							right: "-5px"
						}}
					/>
				)}
			</div>

			<div
				style={{
					flex: 1
				}}
			>
				<Text color h4>
					{u.displayName}
				</Text>

				{user ? (
					!u.isOnline ? (
						<Text color h6>
							Last seen{" "}
							<Moment fromNow ago>
								{new Date(u.lastSeen)}
							</Moment>{" "}
							ago
						</Text>
					) : (
						<Text color h6>
							Active now
						</Text>
					)
				) : null}
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
