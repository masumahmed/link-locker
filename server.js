const crypto = require('crypto');

const encode = (string, password) => {
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(password).digest();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(string, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const hash = iv.toString('hex') + ':' + encrypted;
    return hash;
}

const decode = (hash, password) => {
    const algorithm = 'aes-256-cbc';
    const key = crypto.createHash('sha256').update(password).digest();
    const parts = hash.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encrypted = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/encode/:url/:password', async (req, res) => {
    try {
        const URL = req.params.url
        const password = req.params.password
        res.send(encode(URL, password));
        console.log(URL + " " + password);
    } catch (err) {
        console.log(err)
    }
});

app.get('/decode/:hash/:password', (req, res) => {
    try {
        const Hash = req.params.hash
        const password = req.params.password
        res.send(decode(Hash, password));
        console.log(Hash + " " + password);
    } catch (err) {
        console.log(err)
    }
});
