import express from "express";
import fetch from "node-fetch";
import NodeRSA from "encrypt-rsa";
import cors from 'cors';
import 'dotenv/config';
import fs from 'fs';

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


import User from '@routes/user';
app.use('/user', User);

let privateKey: string = '';

fs.readFile('RSA_privateKey.pem', 'utf8', (err, data) => {
    if (err) return console.log('Ошибка файл с приватным ключом RSA');
    privateKey = data.trim()
});

const nodeRSA = new NodeRSA();

interface IData {
    data: string
}

app.post('/post', async function(req, res) {
    const data: IData = req.body;
    res.send('OK')
    console.log(nodeRSA.decryptStringWithRsaPrivateKey({
        text: data.data,
        privateKey: privateKey
    }));
    // try {
    //     let csrfToken = '';
    //     let cookies = '';

    //     // Step 1: Fetch the login page to get CSRF token and cookies
    //     const loginPageResponse = await fetch('https://euniver.vku.edu.kz/login', {
    //         method: 'GET'
    //     });

    //     if (!loginPageResponse.ok) {
    //         throw new Error(`Failed to fetch login page: ${loginPageResponse.statusText}`);
    //     }

    //     // Extract CSRF token
    //     const loginPageText = await loginPageResponse.text();
    //     const tokenMatch = loginPageText.match(/<meta name="csrf-token" content="(.*?)"/);
    //     if (tokenMatch) {
    //         csrfToken = tokenMatch[1];
    //     } else {
    //         throw new Error('CSRF token not found');
    //     }

    //     // Extract cookies
    //     cookies = loginPageResponse.headers.raw()['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');

    //     // Step 2: Prepare URLSearchParams
    //     const params = new URLSearchParams();
    //     params.append('_token', csrfToken);
    //     params.append('iin', '050701500786');
    //     params.append('password', '050852060');

    //     // Step 3: Submit the login form
    //     const loginResponse = await fetch('https://euniver.vku.edu.kz/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Cookie': cookies
    //         },
    //         body: params,
    //         redirect: 'manual'
    //     });

    //     // if (!loginResponse.ok) {
    //     //     throw new Error(`Login failed: ${loginResponse.statusText}`);
    //     // }
    //     if (loginResponse.status === 302) {
    //         console.log('Redirect Location:', loginResponse.headers.get('location'));
    //     }

    //     // Print login response
    //     let loginResponseText = await loginResponse.text();
    //     console.log('Login Response:', loginResponseText);
    //     console.log('Response Headers:', loginResponse.headers.raw());

    //     const loginPageResponse1 = await fetch('https://euniver.vku.edu.kz/login', {
    //         method: 'GET',
    //         headers: {
    //             'Cookie': loginResponse.headers.raw()['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ')
    //         }
    //     }).then(e => e.text()).then(e => console.log(e));

    //     // Send response to client
    //     res.send(loginResponseText);
    // } catch (error) {
    //     console.error('Error during login process:', error);
    //     res.status(500).send('Internal Server Error');
    // }
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3000');
});
