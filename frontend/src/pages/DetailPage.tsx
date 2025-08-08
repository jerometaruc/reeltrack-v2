import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { Link, useParams } from "react-router";
import { useReel, useUpdateReel, useDeleteReel } from "../hooks/useReels";
import { useReelForm } from "../hooks/useReelForm";

function DetailPage() {
    const { id } = useParams<{ id: string }>();

    const { reel, loading, error } = useReel(id);

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
        getUpdateInput
    } = useReelForm({ initialReel: reel });

    const { updateReel, loading: saving } = useUpdateReel();
    const { deleteReel } = useDeleteReel();

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm() || !id) return;

        const input = getUpdateInput();
        await updateReel(id, input);
    };

    const handleDelete = async () => {
        if (!id) return;
        await deleteReel(id);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }

    if (error || !reel) {
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
