import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import type { Reel } from "../types/Reel";
import type { CreateReelInput } from "../types/CreateReelInput";
import type { UpdateReelInput } from "../types/UpdateReelInput";
import { GET_REELS, GET_REEL } from "../gql/ReelQueries";
import { CREATE_REEL, UPDATE_REEL, DELETE_REEL } from "../gql/ReelMutations";

export const useReels = () => {
    const { data, loading, error } = useQuery<{ reels: Reel[] }>(GET_REELS);

    return {
        reels: data?.reels || [],
        loading,
        error
    };
};

export const useReel = (id: string | undefined) => {
    const { data, loading, error } = useQuery<{ reel: Reel }, { id: string }>(
        GET_REEL,
        {
            variables: { id: id! },
            skip: !id,
            onError: (error) => {
                console.error("Error fetching reel:", error);
            }
        }
    );

    return {
        reel: data?.reel,
        loading,
        error
    };
};

export const useCreateReel = () => {
    const navigate = useNavigate();

    const [createReel, { loading }] = useMutation<
        { createReel: Reel },
        { createReelInput: CreateReelInput }
    >(CREATE_REEL, {
        refetchQueries: [{ query: GET_REELS }],
        onCompleted: () => {
            navigate("/");
        },
        onError: (error) => {
            console.error("Error creating reel:", error);
        }
    });

    const handleCreateReel = async (input: CreateReelInput) => {
        await createReel({ variables: { createReelInput: input } });
    };

    return {
        createReel: handleCreateReel,
        loading
    };
};

export const useUpdateReel = () => {
    const navigate = useNavigate();

    const [updateReel, { loading }] = useMutation<
        { updateReel: Reel },
        { updateReelInput: UpdateReelInput }
    >(UPDATE_REEL, {
        refetchQueries: [{ query: GET_REELS }],
        onCompleted: () => {
            navigate("/");
        },
        onError: (error) => {
            console.error("Error updating reel:", error);
        }
    });

    const handleUpdateReel = async (id: string, input: UpdateReelInput) => {
        const updatedInput = { ...input, id };
        await updateReel({ variables: { updateReelInput: updatedInput } });
    };

    return {
        updateReel: handleUpdateReel,
        loading
    };
};

export const useDeleteReel = () => {
    const navigate = useNavigate();

    const [deleteReel] = useMutation<
        { removeReel: Reel },
        { id: string }
    >(DELETE_REEL, {
        refetchQueries: [{ query: GET_REELS }],
        onCompleted: () => {
            navigate("/");
        },
        onError: (error) => {
            console.error("Error deleting reel:", error);
        }
    });

    const handleDeleteReel = async (id: string) => {
        if (!window.confirm("Confirm delete?")) {
            return;
        }
        await deleteReel({ variables: { id } });
    };

    return {
        deleteReel: handleDeleteReel
    };
};
