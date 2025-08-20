import { gql } from "@apollo/client";

export const CREATE_REEL = gql`
    mutation CreateReel($createReelInput: CreateReelInput!) {
        createReel(createReelInput: $createReelInput) {
            id
            title
            year
            director
            rating
        }
    }
`;

export const UPDATE_REEL = gql`
    mutation UpdateReel($updateReelInput: UpdateReelInput!) {
        updateReel(updateReelInput: $updateReelInput) {
            id
            title
            year
            director
            rating
        }
    }
`;

export const DELETE_REEL = gql`
    mutation DeleteReel($id: String!) {
        removeReel(id: $id) {
            id
        }
    }
`;
