import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import type { Reel } from "../types/Reel";
import type { CreateReelInput } from "../types/CreateReelInput";
import { CREATE_REEL } from "../gql/ReelMutations";
import { GET_REELS } from "../gql/ReelQueries";

interface CreateReelData {
    createReel: Reel;
}

interface CreateReelVariables {
    createReelInput: CreateReelInput;
}

function AddPage() {
    const [title, setTitle] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [director, setDirector] = useState<string>("");
    const [rating, setRating] = useState<string>("");

    const navigate = useNavigate();

    const [createReel, { loading }] = useMutation<CreateReelData, CreateReelVariables>(
        CREATE_REEL,
        {
            refetchQueries: [{ query: GET_REELS }],
            onCompleted: () => {
                navigate("/");
            },
            onError: (error) => {
                console.error("Error creating reel:", error);
            }
        }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const yearNumber = parseInt(year);

        const input: CreateReelInput = {
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

        await createReel({ variables: { createReelInput: input } });
    };

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Link to={"/"} className="btn btn-ghost mb-6">
                        <ArrowLeftIcon className="size-5" />
                        Back to Reels
                    </Link>
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">New Reel</h2>
                            <form onSubmit={handleSubmit}>
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
                                        disabled={loading}
                                    >
                                        {loading ? "Adding..." : "Add Reel"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPage;
