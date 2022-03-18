import { Button, Loading, Row, Text } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

function TextModal({ closeModal, setToast }) {
	const user = useSelector(state => state.auth.user);
	const [values, setValues] = useState({
		title: "",
		desc: ""
	});
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
		axios
			.post(
				`https://www.glitterlyapi.com/image`,
				{
					template_id: "12757e8-8a4e-252c-1ca5-11331410e4",
					size_name: "Square",
					changes: [
						{
							layer: "background",
							background: "#0D0E0D",
							border_color: "black"
						},
						{
							layer: "heading",
							text: values.title,
							font_color: "#FFFFFF",
							background: ""
						},
						{
							layer: "text_2",
							text: new Date().toLocaleDateString(),

							font_color: "#d0d0d0",
							background: "",
							font_highlight: "transparent"
						},
						{
							layer: "text_subheading_2",
							text: values.desc,
							font_color: "#dadada",
							background: "",
							font_highlight: "transparent"
						},
						{
							layer: "image_1",
							url: user.avatar,
							border_color: "#000000"
						}
					]
				},
				{
					headers: {
						"x-api-key": "0c0c9a75-e53c-4d59-88cc-d385cd666fd0"
					}
				}
			)
			.then(res => {
				axios
					.post(
						"http://localhost:8000/api/v1/post/create",
						{
							imageUrl: res.data.url,
							postType: "text"
						},
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
							}
						}
					)
					.then(res => {
						setLoading(false);
						closeModal();
						dispatch({
							type: "OPEN_TOAST",
							payload: {
								message: "post uploaded successfully",
								type: "success"
							}
						});
						socket.emit("notify-post", {
							msg: `${res.data.user.displayName} uploaded a new post`
						});
					})
					.catch(err => {
						setLoading(false);
						closeModal();
						dispatch({
							type: "OPEN_TOAST",
							payload: {
								message: "post uploaded successfully",
								type: "success"
							}
						});
					});
			})
			.catch(err => {
				console.log(err);
			});
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
			<TitleInput
				value={values.title}
				onChange={e => setValues({ ...values, title: e.target.value })}
				placeholder="Title"
			/>
			<TextArea
				name=""
				value={values.desc}
				onChange={e => setValues({ ...values, desc: e.target.value })}
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
						borderRadius: ".2rem",
						background: "#00b8ff",
						opacity: values.title < 1 || values.desc < 1 ? 0.5 : 1
					}}
					size="sm"
					type={values.title < 1 || values.desc < 1 ? "button" : "submit"}
					color="gradient"
				>
					{loading ? (
						<Loading type="spinner" color="white" size="sm" />
					) : (
						"Post"
					)}
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
