import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store.js';

import ContactList from "./pages/ContactList/ContactList";
import NewContact from "./pages/NewContact/NewContact";
import UpdateContact from "./pages/UpdateContact/UpdateContact";
import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Welcome from "./pages/Welcome/Welcome";
import Header from './components/Header/Header';

function AppContent() {
    const [authState, setAuthState] = useState(() => ({
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    }));

    const handleAuthSuccess = ({ token, user }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({ token, user });
        window.location.href = '/';
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ token: null, user: null });
    };

    const routes = authState.user ? (
        <>
            <Header user={authState.user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<ContactList />} />
                <Route path="/new-contact" element={<NewContact />} />
                <Route path="/update-contact/:id" element={<UpdateContact />} />
                <Route path="/login" element={<ContactList />} />
                <Route path="/register" element={<ContactList />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    ) : (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<SignIn onLoginSuccess={handleAuthSuccess} />} />
            <Route path="/register" element={<SignUp onRegisterSuccess={handleAuthSuccess} />} />
            <Route path="*" element={<Welcome />} />
        </Routes>
    );

    return <Router>{routes}</Router>;
}

function App() {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
}

export default App;