import { useMutation, gql } from '@apollo/client';
import { PenSquareIcon, CircleCheckIcon } from "lucide-react";
import { Link } from "react-router";
import toast from 'react-hot-toast';

const DELETE_REEL = gql`
    mutation DeleteReel($id: String!) {
        removeReel(id: $id) {
            id
            title
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

interface Reel {
    id: string;
    title: string;
    year: number;
    director?: string;
    rating?: number;
}

interface ReelCardProps {
    reel: Reel;
}

function ReelCard({ reel }: ReelCardProps) {
    const [deleteReel, { loading: deleting }] = useMutation(DELETE_REEL, {
        refetchQueries: [{ query: GET_REELS }],
        onCompleted: () => {
            toast.success("Watched and Deleted");
        },
        onError: (error) => {
            console.error("Error in handleDelete", error);
            toast.error("Failed to delete reel");
        }
    });

    const handleDelete = () => {
        if (!window.confirm("Watched and ready to delete?")) {
            return;
        }
        deleteReel({ variables: { id: reel.id } });
    };

    return (
        <div
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-primary"
        >
            <div className="card-body">
                <h3 className="card-title text-base-content">{reel.title}</h3>
                <div className="text-base-content/70">
                    <p>Year: {reel.year}</p>
                    {reel.director && <p>Director: {reel.director}</p>}
                    {reel.rating && <p>Rating: {reel.rating}/10</p>}
                </div>
                <div className="card-actions justify-between items-center mt-4">
                    <div className="flex items-center gap-1">
                        <Link
                            to={`/reel/${reel.id}`}
                            className="btn btn-ghost btn-xs"
                        >
                            <PenSquareIcon className="size-4" />
                        </Link>
                        <button
                            className={`btn btn-ghost btn-xs text-success ${deleting ? 'loading' : ''}`}
                            onClick={handleDelete}
                            disabled={deleting}
                        >
                            <CircleCheckIcon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReelCard;
