import { Card, Text } from "@nextui-org/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import { motion } from "framer-motion";

function Toast() {
	const [play] = useSound("/sfx/rising-pops.mp3");
	const dispatch = useDispatch();
	const show = useSelector(state => state.layout.toast.open);
	const type = useSelector(state => state.layout.toast.type);
	const message = useSelector(state => state.layout.toast.message);
	useEffect(() => {
		if (show) {
			play();
		}
	}, [show, play]);

	useEffect(() => {
		if (show) {
			setTimeout(() => {
				dispatch({
					type: "CLOSE_TOAST"
				});
			}, 3000);
		}
	}, [dispatch, show]);

	return (
		<Card
			style={{
				position: "fixed",
				top: 15,
				zIndex: 99,
				maxWidth: "20rem",
				left: 0,
				right: 0,
				margin: "auto auto",
				display: show ? "flex" : "none"
			}}
			color={type}
		>
			<Text small css={{ color: "$white" }} transform="capitalize">
				{message}
			</Text>
		</Card>
	);
}

export default Toast;
