## This is a small example of security practices of Node.js backend development: JWT, OAuth, SSL/TLS

### How to deploy and start the app

1. Generate self-signed certificate for SSL (openssl should be installed prior):
`openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365`

`key.pem` - name of key file
`cert.pem` - name of certificate file

2. Install dependencies:
`npm install`

3. Start the app:
`npm start`
