import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";
import { useReelForm } from "../hooks/useReelForm";
import { useCreateReel } from "../hooks/useReels";

function AddPage() {
    const {
        title,
        year,
        director,
        rating,
        setTitle,
        setYear,
        setDirector,
        setRating,
        validateForm,
        getCreateInput
    } = useReelForm();

    const { createReel, loading } = useCreateReel();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        const input = getCreateInput();
        await createReel(input);
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
