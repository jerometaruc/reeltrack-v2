import NavBar from "../components/NavBar";
import ReelsNotFound from "../components/ReelsNotFound";
import ReelCard from "../components/ReelCard";
import { LoaderIcon } from "lucide-react";
import { useReels } from "../hooks/useReels";

function HomePage() {
    const { reels, loading, error } = useReels();

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200">
                <NavBar />
                <div className="min-h-screen bg-base-200 flex items-center justify-center">
                    <LoaderIcon className="animate-spin size-10" />
                </div>
            </div>
        );
    }

    if (error) {
        console.error("Error getting Reels:", error);
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
