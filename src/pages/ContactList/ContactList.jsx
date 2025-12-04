import ContactItem from "../../components/ContactItem/ContactItem";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function ContactList() {
    return (
        <main className="max-w-6xl mx-auto mt-4 bg-white shadow-lg rounded-md p-4">

            <div className="flex gap-6">

                <div className="w-1/4">
                    <Sidebar />
                </div>

                <div className="w-3/4">
                    <ContactItem />
                </div>

            </div>
        </main>
    );
}
