import { Button, Card, Loading, Row, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "../../utils/axios";
import { socket } from "../../utils/socketio";

function PhotoModal({ closeModal }) {
	const [file, setFile] = useState(null);
	const [capTxt, setCapTxt] = useState("");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const uploadPost = e => {
		e.preventDefault();
		const formdata = new FormData();
		formdata.append("file", file);
		formdata.append("captionTxt", capTxt);

		setLoading(true);
		axios
			.post("/post/create", formdata)
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
						message: err.response.data.error,
						type: "error"
					}
				});
			});
	};
	return (
		<Right onSubmit={uploadPost}>
			<UploadBtn onChange={e => setFile(e.target.files[0])} htmlFor="formId">
				Upload a photo
				<BsCameraFill color="currentColor" />
				<input name="" type="file" id="formId" hidden />
			</UploadBtn>
			{file && (
				<Row>
					<Card bordered shadow={false} css={{ mw: "400px" }}>
						<p>{file.name}</p>
						<IoIosCloseCircle
							onClick={() => setFile(null)}
							fontSize="1.5rem"
							color="#f21361"
						/>
					</Card>
				</Row>
			)}
			<Textarea
				value={capTxt}
				onChange={e => setCapTxt(e.target.value)}
				label="Write your caption"
				placeholder="..."
			/>
			<Row justify="space-between">
				<Button
					css={{
						minWidth: "$5",
						borderRadius: ".2rem",
						background: "#9da6af"
					}}
					size="sm"
					onClick={closeModal}
					type="button"
				>
					Close
				</Button>
				<Button
					css={{
						minWidth: "$5",
						borderRadius: ".2rem",
						background: "#00b8ff",
						opacity: !file || capTxt.length < 1 ? 0.5 : 1
					}}
					size="sm"
					type={!file || capTxt.length < 1 ? "button" : "submit"}
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

export default PhotoModal;

export const Right = styled.form`
	background: #fff;
	color: #000;
	border-radius: 5px;
	flex: 1;

	display: flex;
	flex-direction: column;
	padding: 1rem;
	gap: 1.4rem;

	input {
	}
`;

const UploadBtn = styled.label`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 2rem;
	background: ${props => props.theme.colors.primary};
	color: #fff;
	padding: 0.6rem;
	border-radius: 5px;
`;
