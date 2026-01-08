import express from 'express';
import { getContacts, createContact, updateContact, deleteContact } from '../controllers/contacts-controller';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getContacts);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
