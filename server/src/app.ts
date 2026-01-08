import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth-routes';
import contactsRoutes from './routes/contacts-routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);

export default app;
