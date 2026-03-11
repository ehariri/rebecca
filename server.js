const express = require('express');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Railway uses a reverse proxy — needed for correct per-IP rate limiting
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rate limit: 5 password attempts per minute per IP
const decryptLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts. Please try again in a minute.' },
});

const ENCRYPTED_BLOB = process.env.ENCRYPTED_SLIDES;
if (!ENCRYPTED_BLOB) {
  console.error('ENCRYPTED_SLIDES environment variable is not set.');
  process.exit(1);
}

app.post('/api/decrypt', decryptLimiter, (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required' });

  try {
    const raw = Buffer.from(ENCRYPTED_BLOB, 'base64');
    const salt = raw.subarray(0, 16);
    const iv = raw.subarray(16, 28);
    const encrypted = raw.subarray(28, raw.length - 16);
    const authTag = raw.subarray(raw.length - 16);

    const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, null, 'utf8');
    decrypted += decipher.final('utf8');

    return res.json({ slides: JSON.parse(decrypted) });
  } catch (err) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
