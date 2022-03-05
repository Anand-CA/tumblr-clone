import React from "react";
import styled from "styled-components";

function Blogs() {
	return (
		<Wrapper>
			<h3>Check out these blogs</h3>
			<Item>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					height="50"
					width="50"
					src="https://64.media.tumblr.com/38c7a7e58a637e3b5e03bfcc633b4bd0/a3326fac10c90f8b-50/s64x64u_c1/8f97bcb45b14b525d7858fe0b102a115ee36c8e1.jpg"
					alt=""
				/>
				<div>
					<h4>thefinalimage</h4>
					<p>The Final Image</p>
				</div>
			</Item>
			<a href="#">Explore all of Tumblr</a>
		</Wrapper>
	);
}

export default Blogs;

export const Wrapper = styled.div`
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
export const Item = styled.div`
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
