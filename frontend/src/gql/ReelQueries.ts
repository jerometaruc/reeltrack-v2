import { gql } from "@apollo/client";

export const GET_REELS = gql`
    query GetReels {
        reels {
            id
            title
            year
            director
            rating
        }
    }
`;

export const GET_REEL = gql`
    query GetReel($id: String!) {
        reel(id: $id) {
            id
            title
            year
            director
            rating
        }
    }
`;
