import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

import ContactList from "./pages/ContactList/ContactList";
import NewContact from "./pages/NewContact/NewContact";
import UpdateContact from "./pages/UpdateContact/UpdateContact";
import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Welcome from "./pages/Welcome/Welcome";
import Header from './components/Header/Header';

function App() {
    const [stor, setStor] = useState({
        contacts: [
            {
                avatar: "66",
                email: "robert.admin@example.com",
                favorite: true,
                firstName: "Robert",
                gender: "men",
                id: "0ade6e5f-07ef-4ed2-85de-b940aabea656",
                lastName: "Barnabishvili",
                phone: "0680423116",
                status: "family",
            },
            {
                avatar: "12",
                email: "anna.green@example.com",
                favorite: false,
                firstName: "Anna",
                gender: "women",
                id: "4f1b3b6e-31ce-4a6d-9af1-2f3cbb7f91e3",
                lastName: "Green",
                phone: "0952143321",
                status: "friends",
            },
            {
                avatar: "73",
                email: "michael.ross@example.com",
                favorite: true,
                firstName: "Michael",
                gender: "men",
                id: "9be8a9e3-44a3-4ba7-91da-6e26042c4e71",
                lastName: "Ross",
                phone: "0935417854",
                status: "work",
            },
            {
                avatar: "18",
                email: "lisa.moon@example.com",
                favorite: false,
                firstName: "Lisa",
                gender: "women",
                id: "e45f531f-1bb1-456d-a5f4-e9b390fd3d0f",
                lastName: "Moon",
                phone: "0978732164",
                status: "private",
            },
            {
                avatar: "29",
                email: "kevin.snow@example.com",
                favorite: false,
                firstName: "Kevin",
                gender: "men",
                id: "7a9a4a90-060e-4aca-b7d3-63f96cdcf61d",
                lastName: "Snow",
                phone: "0966549921",
                status: "others",
            },
            {
                avatar: "47",
                email: "mary.wood@example.com",
                favorite: true,
                firstName: "Mary",
                gender: "women",
                id: "efdc0d58-5c59-4af7-94a8-d5ba9330e2a7",
                lastName: "Wood",
                phone: "0990023144",
                status: "family",
            },
            {
                avatar: "52",
                email: "alex.kent@example.com",
                favorite: false,
                firstName: "Alex",
                gender: "men",
                id: "f97b5d43-5581-4a44-8a8d-56cf07f022a9",
                lastName: "Kent",
                phone: "0637432299",
                status: "work",
            },
            {
                avatar: "15",
                email: "sofia.miller@example.com",
                favorite: true,
                firstName: "Sofia",
                gender: "women",
                id: "3cba40e7-eeca-4ced-afaf-8ed6eac31a3a",
                lastName: "Miller",
                phone: "0508221347",
                status: "friends",
            },
            {
                avatar: "91",
                email: "john.white@example.com",
                favorite: false,
                firstName: "John",
                gender: "men",
                id: "a6c32937-c1b5-4b4d-93c4-e18a5e590fe0",
                lastName: "White",
                phone: "0679435561",
                status: "private",
            },
            {
                avatar: "33",
                email: "nataly.brown@example.com",
                favorite: false,
                firstName: "Nataly",
                gender: "women",
                id: "da02b49b-31f9-4b35-ae56-c35f8e49dd12",
                lastName: "Brown",
                phone: "0912345689",
                status: "others",
            }  ],
        search: '',
    });

    const [authState, setAuthState] = useState(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        return {
            token: token || null,
            user: user ? JSON.parse(user) : null,
        };
    });

    const [showWelcome, setShowWelcome] = useState(!authState.user);



    const handleNewContact = (newContact) => {
        setStor(prev => ({ ...prev, contacts: [...prev.contacts, newContact] }));
    };

    const handleDeleteContact = (id) => {
        const contacts = stor.contacts.filter(contact => contact.id !== id);
        setStor(prev => ({ ...prev, contacts }));
    };

    const handleUpdateContact = (updatedContact) => {
        const contacts = stor.contacts.map(contact =>
            contact.id === updatedContact.id ? { ...contact, ...updatedContact } : contact
        );
        setStor(prev => ({ ...prev, contacts }));
    };

    const searchBySymbols = (symbols) => {
        setStor(prev => ({ ...prev, search: symbols }));
    };

    const handleWelcomeComplete = () => {
        if (authState.user) {
            setShowWelcome(false);
        }
    };

    const handleAuthSuccess = ({ token, user }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        setAuthState({
            token,
            user,
        });
        
        setShowWelcome(false);
        
        window.location.href = '/';
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({
            token: null,
            user: null,
        });
        setShowWelcome(true);
    };

    if (!authState.user) {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<SignIn onLoginSuccess={handleAuthSuccess} />} />
                    <Route path="/register" element={<SignUp onRegisterSuccess={handleAuthSuccess} />} />
                    <Route path="*" element={<Welcome />} />
                </Routes>
            </Router>
        );
    }
    return (
        <Router>
            <Header
                user={authState.user}
                onLogout={handleLogout}
            />
            <Routes>
                <Route path="/" element={<ContactList stor={stor} onDeleteContact={handleDeleteContact} searchBySymbols={searchBySymbols} />} />
                <Route path="/new-contact" element={<NewContact onNewContact={handleNewContact} />} />
                <Route path="/update-contact/:id" element={<UpdateContact stor={stor.contacts} onUpdateContact={handleUpdateContact} />} />
                <Route path="/login" element={<ContactList stor={stor} onDeleteContact={handleDeleteContact} searchBySymbols={searchBySymbols} />} />
                <Route path="/register" element={<ContactList stor={stor} onDeleteContact={handleDeleteContact} searchBySymbols={searchBySymbols} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
