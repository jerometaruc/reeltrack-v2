import { PenSquareIcon} from "lucide-react";
import type { Reel } from '../types/Reel';
import { Link } from "react-router";

interface ReelCardProps {
    reel: Reel;
}

function ReelCard({ reel }: ReelCardProps) {
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReelCard;
