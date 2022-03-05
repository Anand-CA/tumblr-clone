import { Card, Text } from "@nextui-org/react";
import React from "react";
import { useEffect } from "react";
import useSound from "use-sound";

function Toast({ show, type, children }) {
	const [play] = useSound("/sfx/rising-pops.mp3");
	useEffect(() => {
		if (show) {
			play();
		}
	}, [show, play]);

	return (
		<Card
			css={{
				position: "fixed",
				top: 15,
				zIndex: 99,
				maxWidth: "20rem",
				left: 0,
				right: 0,
				margin: "auto auto",
				display: show ? "block" : "none"
			}}
			color={type}
		>
			<Text small css={{ color: "$white" }} transform="capitalize">
				{children}
			</Text>
		</Card>
	);
}

export default Toast;
