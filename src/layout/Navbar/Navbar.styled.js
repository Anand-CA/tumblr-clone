import styled from "styled-components";
export const Wrapper = styled.div``;
export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 auto;
	padding: 0.5rem 0.7em;
`;
export const Left = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;
export const Logo = styled.img`
	height: 2.4rem;
	width: 2.4rem;
	object-fit: contain;
`;
export const Right = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;

	img {
		cursor: pointer;
		user-select: none;
		height: 25px;

		@media (max-width: 40em) {
			display: none;
		}

		&:active {
			transform: scale(0.9);
		}
	}
`;
