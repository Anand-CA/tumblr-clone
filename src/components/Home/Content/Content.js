import React, { useEffect, useState } from "react";
import PostHeader from "./PostHeader";
import { Container, Left, Right } from "./Content.styled";
import Blogs from "./Blogs";
import Post from "./Post";
import axios from "../../../utils/axios";
import { socket } from "../../../utils/socketio";

function Content() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		socket.on("post", data => {
			console.log("new post added", data.mPost);
			setPosts(prev => [data.mPost, ...prev]);
		});

		return () => {
			socket.off("post");
		};
	}, []);

	useEffect(() => {
		axios
			.get("/post/all")
			.then(res => {
				setPosts(res.data.posts);
			})
			.catch(err => {
				console.log(err.response.data);
			});
	}, []);

	return (
		<Container>
			<Left>
				<PostHeader />
				{posts.map(p => (
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
