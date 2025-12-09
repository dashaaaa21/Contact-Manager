import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from 'react';

import ContactList from "./pages/ContactList/ContactList"
import NewContact from "./pages/NewContact/NewContact"
import UpdateContact from "./pages/UpdateContact/UpdateContact"
import NotFound from "./pages/NotFound/NotFound"
import Header from './components/Header/Header';



function App() {
    const [stor, setStor] = useState(
        [
            {
                avatar: "//sdf.png",
                email: "dasha@fmail.com",
                favorite: true,
                firstName: "Daria",
                gender: "Women",
                id: "0ade6e5f-07ef-4e72-85de-b940aabea656",
                lastName: "Tkachenko",
                phone: "0680423116",
                status :"Family",
            }
        ]
    )


    const handleNewContact = (newContact) => {
        setStor(prevStor => [...prevStor, newContact])
    }

    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<ContactList stor={stor}/>}/>
                <Route path="/new-contact" element={<NewContact onNewContact={handleNewContact}/>}/>
                <Route path="/update-contact" element={<UpdateContact/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    )
}

export default App