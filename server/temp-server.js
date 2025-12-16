const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Тимчасове зберігання користувачів в пам'яті
let users = [];

// Реєстрація
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Перевірка чи користувач існує
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Хешування пароля
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Створення користувача
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword
        };
        
        users.push(newUser);
        
        // Створення токена
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            'supersecretjwt',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Логін
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Знаходження користувача
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Перевірка пароля
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Створення токена
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'supersecretjwt',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Temp server running on port ${PORT}`);
});