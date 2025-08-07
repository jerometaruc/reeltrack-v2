import { gql, useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import type { Reel } from "../types/Reel";
import type { UpdateReelInput } from "../types/UpdateReelInput";

const GET_REEL = gql`
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

const UPDATE_REEL = gql`
    mutation UpdateReel($id: String!, $updateReelInput: UpdateReelInput!) {
        updateReel(id: $id, updateReelInput: $updateReelInput) {
            id
            title
            year
            director
            rating
        }
    }
`;

const DELETE_REEL = gql`
    mutation DeleteReel($id: String!) {
        removeReel(id: $id) {
            id
        }
    }
`;

const GET_REELS = gql`
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

interface GetReelData {
    reel: Reel;
}

interface GetReelVariables {
    id: string;
}

interface UpdateReelData {
    updateReel: Reel;
}

interface UpdateReelVariables {
    id: string;
    updateReelInput: UpdateReelInput;
}

interface DeleteReelData {
    removeReel: Reel;
}

interface DeleteReelVariables {
    id: string;
}

function DetailPage() {
    const [title, setTitle] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [director, setDirector] = useState<string>("");
    const [rating, setRating] = useState<string>("");

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { data, loading, error } = useQuery<GetReelData, GetReelVariables>(
        GET_REEL,
        {
            variables: { id: id! },
            skip: !id,
            onError: (error) => {
                console.error("Error fetching reel:", error);
            }
        }
    );

    const [updateReel, { loading: saving }] = useMutation<UpdateReelData, UpdateReelVariables>(
        UPDATE_REEL,
        {
            refetchQueries: [{ query: GET_REELS }],
            onCompleted: () => {
                navigate("/");
            },
            onError: (error) => {
                console.error("Error updating reel:", error);
            }
        }
    );

    const [deleteReel] = useMutation<DeleteReelData, DeleteReelVariables>(
        DELETE_REEL,
        {
            refetchQueries: [{ query: GET_REELS }],
            onCompleted: () => {
                navigate("/");
            },
            onError: (error) => {
                console.error("Error deleting reel:", error);
            }
        }
    );

    useEffect(() => {
        if (data?.reel) {
            setTitle(data.reel.title);
            setYear(data.reel.year.toString());
            setDirector(data.reel.director || "");
            setRating(data.reel.rating?.toString() || "");
        }
    }, [data]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim() || !year.trim()) {
            console.error("Title and year are required");
            return;
        }

        if (!id) return;

        const yearNumber = parseInt(year);
        if (isNaN(yearNumber)) {
            console.error("Invalid year");
            return;
        }

        const input: UpdateReelInput = {
            title: title.trim(),
            year: yearNumber,
        };

        if (director.trim()) {
            input.director = director.trim();
        }

        if (rating.trim()) {
            const ratingNumber = parseFloat(rating);
            if (!isNaN(ratingNumber) && ratingNumber >= 0 && ratingNumber <= 10) {
                input.rating = ratingNumber;
            }
        }

        await updateReel({ variables: { id, updateReelInput: input } });
    };

    const handleDelete = async () => {
        if (!window.confirm("Confirm delete?")) {
            return;
        }

        if (!id) return;

        await deleteReel({ variables: { id } });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }

    if (error || !data?.reel) {
        return (
            <div className="min-h-screen bg-base-200">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-2xl mx-auto">
                        <Link to="/" className="btn btn-ghost mb-6">
                            <ArrowLeftIcon className="size-5" />
                            Back to Reels
                        </Link>
                        <div className="alert alert-error">
                            <span>Failed to load reel details</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="size-5" />
                            Back to Reels
                        </Link>
                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="size-5" />
                            Remove Reel
                        </button>
                    </div>

                    <div className="card bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">Edit Reel</h2>
                            <form onSubmit={handleSave}>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Movie Title"
                                        className="input input-bordered"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Year</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Release Year"
                                        className="input input-bordered"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Director</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Director Name"
                                        className="input input-bordered"
                                        value={director}
                                        onChange={(e) => setDirector(e.target.value)}
                                    />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Rating</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="10"
                                        placeholder="Rating out of 10"
                                        className="input input-bordered"
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    />
                                </div>
                                <div className="card-actions justify-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={saving}
                                    >
                                        {saving ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
