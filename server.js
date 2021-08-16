import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';

const app = express();
const db = knex({
    client: 'pg',
    connection: {
        host: 'hostname',
        user: 'username',
        password: '',
        database: 'DB name'
    }
});

// Allow connection to frontend over HTTP
app.use(cors());
// Parse JSON data from frontend 
app.use(express.json());

//Registering new User
app.post('/register', (req, res) => { handleRegister(req, res, bcrypt, db) });

//Signing In
app.post('/signin', (req, res) => { handleSignIn(req, res, bcrypt, db) });

// Getting users profile
app.get('/profile/:id', (req, res) => { handleProfile(req, res, db)});

// Incrementing entry score
app.put('/image', (req, res) => { handleImage(req, res, db) });

// Hiding API Key
app.post('/imageurl', (req, res) => { handleApiCall(req, res) });

app.listen(3030);