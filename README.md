## This is a small example of security practices of Node.js backend development: JWT, OAuth, SSL/TLS

### Prerequisites
1. Generate self-signed certificate for SSL (openssl should be installed prior):
`openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365`

`key.pem` - name of a key file
`cert.pem` - name of a certificate file

2. [Helmet.js](https://helmetjs.github.io/)
Middleware to secure Node.js web server

### How to deploy and start the app
1. Install dependencies:
`npm install`
2. Start the app:
`npm start`
