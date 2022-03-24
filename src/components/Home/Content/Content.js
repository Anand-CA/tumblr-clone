import { Loading, Row } from "@nextui-org/react";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../layout/Loading/Loader";
import { addPost, fetchPosts, removePost } from "../../../redux/actions/post";
import { socket } from "../../../utils/socketio";
import { Container, Left, Right } from "./Content.styled";
import Post from "./Post";
import PostHeader from "./PostHeader";
import Users from "./Users";

function Content() {
	const dispatch = useDispatch();
	const posts = useSelector(state => state.post.posts);
	const posts_status = useSelector(state => state.post.posts_status);

	useEffect(() => {
		socket.on("post-create", data => {
			dispatch(addPost(data));
		});

		socket.on("post-delete", data => {
			dispatch(removePost(data.postId));
		});

		socket.on("post-create-notify", data => {
			dispatch({
				type: "OPEN_TOAST",
				payload: {
					message: data,
					type: "warning"
				}
			});
		});

		socket.on("post-like-notify", data => {
			dispatch({
				type: "ADD_NOTIFICATION",
				payload: data.notif
			});

			dispatch({
				type: "OPEN_TOAST",
				payload: {
					message: data.msg,
					type: "warning"
				}
			});
		});

		socket.on("comment-notify", data => {
			console.log("🚀 ~ file: Content.js ~ line 38 ~ useEffect ~ data", data);
			dispatch({
				type: "ADD_NOTIFICATION",
				payload: data.notif
			});

			dispatch({
				type: "OPEN_TOAST",
				payload: {
					message: data.msg,
					type: "warning"
				}
			});
		});

		socket.on("comment-like-notify", data => {
			dispatch({
				type: "ADD_NOTIFICATION",
				payload: data.notif
			});

			dispatch({
				type: "OPEN_TOAST",
				payload: {
					message: data.msg,
					type: "warning"
				}
			});
		});

		socket.on("comment-like", data => {
			dispatch({
				type: "LIKE_COMMENT",
				payload: data
			});
		});

		socket.on("comment-dislike", data => {
			dispatch({
				type: "DISLIKE_COMMENT",
				payload: data
			});
		});

		return () => {
			socket.off("post-create");
			socket.off("post-create");
			socket.off("post-create-notify");
			socket.off("post-like-notify");
			socket.off("comment-notify");
			socket.off("comment-like-notify");
			socket.off("comment-like");
			socket.off("comment-dislike");
		};
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	return (
		<Container>
			<Left>
				<PostHeader />
				{posts_status === "loading" && (
					<Row
						css={{
							height: "27rem",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: "100%"
						}}
					>
						<Loader />
					</Row>
				)}
				{posts_status === "failed" && <div>Failed to load posts</div>}
				<AnimateSharedLayout>
					<AnimatePresence>
						{posts_status === "succeeded" &&
							posts?.map(p => {
								return <Post p={p} key={p._id} />;
							})}
					</AnimatePresence>
				</AnimateSharedLayout>
			</Left>
			<Right>
				<Users />
			</Right>
		</Container>
	);
}
export default Content;
