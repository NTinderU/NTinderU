import { gql } from "@apollo/client";

export default gql`
    query($id: ID!) {
        chatroom(id: $id) {
            id
            users
            messages {
                from
                body
                timestamp
            }
        }
    }
`;
