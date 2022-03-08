import { Button, Row, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import styled from "styled-components";

function TextModal({ closeModal, setToast }) {
	const [values, setValues] = useState({
		title: "",
		desc: ""
	});

	const handleSubmit = e => {
		e.preventDefault();
		console.log("success");
	};
	return (
		<Right onSubmit={handleSubmit}>
			<Row
				css={{
					justifyContent: "space-between",
					alignItems: "center",
					gap: "1rem"
				}}
			>
				<Text small>densecblogs</Text>
				<FiSettings fontSize="1.4rem" color="grey" />
			</Row>
			<TitleInput placeholder="Title" />
			<TextArea
				name=""
				id=""
				cols="30"
				placeholder="Your text here..."
				rows="10"
			></TextArea>

			<Row justify="space-between">
				<Button
					css={{
						minWidth: "$5",
						background: "#9da6af"
					}}
					size="sm"
					onClick={closeModal}
				>
					Close
				</Button>
				<Button
					css={{
						minWidth: "$5",
						background: "#00b8ff"
					}}
					size="sm"
					type="submit"
				>
					Post
				</Button>
			</Row>
		</Right>
	);
}

export default TextModal;

export const Right = styled.form`
	flex: 1;
	border-radius: 5px;
	background: #fff;
	display: flex;
	flex-direction: column;
	padding: 1rem;
`;

export const TitleInput = styled.input`
	font-size: 2rem;
	border: none;
	outline: none;
`;
export const TextArea = styled.textarea`
	border: none;
	outline: none;
`;
