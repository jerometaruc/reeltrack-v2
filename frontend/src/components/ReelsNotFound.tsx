import { ClapperboardIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router";

const ReelsNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
            <div className="bg-primary/10 rounded-full p-8">
                <ClapperboardIcon className="size-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Nothing to watch</h3>
            <Link to="/add" className="btn btn-primary">
                <PlusIcon className="size-5" />
                Add your first reel
            </Link>
        </div>
    );
};

export default ReelsNotFound;
