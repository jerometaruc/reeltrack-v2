import { gql, useQuery } from "@apollo/client";
import NavBar from "../components/NavBar";
import ReelsNotFound from "../components/ReelsNotFound";
import toast from "react-hot-toast";
import ReelCard from "../components/ReelCard";

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

interface GetReelsData {
    reels: Reel[];
}

function HomePage() {
    const { data, loading, error } = useQuery<GetReelsData>(GET_REELS, {
        onError: (error) => {
            console.error("Error getting Reels:", error);
            toast.error("Failed to load Reels");
        }
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200">
                <NavBar />
                <div className="max-w-6xl mx-auto p-4 mt-6">
                    <div className="text-center text-primary py-10">Loading Reels</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-base-200">
                <NavBar />
                <div className="max-w-6xl mx-auto p-4 mt-6">
                    <div className="text-center text-error py-10">
                        Error loading reels: {error.message}
                    </div>
                </div>
            </div>
        );
    }

    const reels = data?.reels || [];

    return (
        <div className="min-h-screen bg-base-200">
            <NavBar />
            <div className="max-w-6xl mx-auto p-4 mt-6">
                {reels.length === 0 && <ReelsNotFound />}

                {reels.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reels.map((reel) => (
                            <ReelCard key={reel.id} reel={reel} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
