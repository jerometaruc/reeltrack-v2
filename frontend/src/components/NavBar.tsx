import { Link } from 'react-router';
import { PlusIcon, ClapperboardIcon } from 'lucide-react';

function NavBar() {
    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="flex items-center gap-2 text-3xl font-bold text-primary font-mono tracking-tight">
                        ReelTrack
                        <ClapperboardIcon className="size-8 text-primary" />
                    </h1>
                    <div className="flex items-center gap-4">
                        <Link to={"/add"} className="btn btn-primary">
                            <PlusIcon className="size-5" />
                            <span>Add Reel</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
