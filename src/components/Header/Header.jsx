import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="w-full bg-black text-white">
        
            <div className="py-6 px-10 flex items-center justify-between">
    
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-green-600 to-teal-900" />
                    <span className="text-lg font-semibold">Daria</span>
                </div>

                <nav className="flex items-center gap-10 text-gray-300">
                    <Link to="/" className="text-white hover:text-white transition">Contact List</Link>
                    <Link to="/new-contact" className="hover:text-white transition">New Contact</Link>
                    <Link to="/update-contact" className="hover:text-white transition">Update Contact</Link>
                </nav>


                <button className="bg-lime-300 text-black px-6 py-2 rounded-full font-medium hover:bg-lime-200 transition">
                    Start
                </button>
            </div>

            <div className="w-full h-px bg-white/20"></div>

        </header>
    );
}
