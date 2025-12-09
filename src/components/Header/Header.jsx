import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <header className="w-full bg-black text-white">

            <div className="py-6 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">

                <div className="flex items-center gap-2">
                   <img src="/logo.svg" alt="Logo" className="w-12" />
                </div>

                <nav className="flex flex-wrap items-center gap-4 md:gap-10 text-gray-300 justify-center">
                    <Link to="/" className="text-white hover:text-white transition">Contact List</Link>
                    <Link to="/new-contact" className="hover:text-white transition">New Contact</Link>
                    <Link to="/update-contact" className="hover:text-white transition">Update Contact</Link>
                </nav>

                <div className="flex items-center gap-3 md:gap-4 flex-wrap justify-center">
                    <button
                        className="bg-lime-300 text-black px-4 md:px-6 py-2 rounded-full font-medium hover:bg-lime-200 transition">
                        Sign in
                    </button>
                    <button
                        className="bg-lime-900 text-white px-4 md:px-6 py-2 rounded-full font-medium hover:bg-lime-600 transition">
                        Register
                    </button>
                </div>

            </div>

            <div className="w-full h-px bg-white/20"></div>

        </header>
    );
}
