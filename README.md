## This is a small example of security practices of Node.js backend development: [JWT](https://jwt.io/), [OAuth](https://www.oauth.com/), SSL/TLS

### Prerequisites
0. Familiarize yourself with [NodeJS security cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)

1. Generate self-signed certificate for SSL (openssl should be installed prior):
    - `openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365`
    - `key.pem` - name of a key file
    - `cert.pem` - name of a certificate file

2. [Helmet.js](https://helmetjs.github.io/)
    - Middleware to secure Node.js web server

3. Integration with [Google OAuth](https://developers.google.com/identity/protocols/oauth2)

4. Usage of [Passport.js](https://www.passportjs.org/)
    - Simple authentification middleware for Node.js
    - `npm install passport-google-oauth20`

5. User session management
    - server-side: [express-session](https://expressjs.com/en/resources/middleware/session.html)
    - client-side: [cookie-session](https://expressjs.com/en/resources/middleware/cookie-session.html)

### How to deploy and start the app
1. Install dependencies:
    - `npm install`
2. Start the app:
    - `npm start`
