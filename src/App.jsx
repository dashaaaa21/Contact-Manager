import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from "./pages/ContactList/ContactList.jsx";
import NewContact from "./pages/NewContact/NewContact.jsx";
import UpdateContact from "./pages/UpdateContact/UpdateContact.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Header from "./components/Header/Header.jsx";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<ContactList />} />
                <Route path="/new-contact" element={<NewContact />} />
                <Route path="/update-contact" element={<UpdateContact />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
