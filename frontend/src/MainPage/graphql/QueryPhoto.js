import { gql } from "@apollo/client";

export default gql`
	query($username: String!) {
		user(username: $username) {
			photo
		}
		getrooms(username: $username) {
			target
			roomID
		}
	}
`;
