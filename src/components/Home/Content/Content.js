import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, fetchPosts } from "../../../redux/actions/post";
import { socket } from "../../../utils/socketio";
import Blogs from "./Blogs";
import { Container, Left, Right } from "./Content.styled";
import Post from "./Post";
import PostHeader from "./PostHeader";

function Content() {
	const dispatch = useDispatch();
	const posts = useSelector(state => state.post.posts);

	useEffect(() => {
		socket.on("post", data => {
			console.log("new post added", data.mPost);
			dispatch(addPost(data.mPost));
		});

		return () => {
			socket.off("post");
		};
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	return (
		<Container>
			<Left>
				<PostHeader />
				{posts?.map(p => (
					<Post p={p} key={p._id} />
				))}
			</Left>
			<Right>
				<Blogs />
				{/* <Radar />
        <Sponsored /> */}
			</Right>
		</Container>
	);
}
export default Content;
