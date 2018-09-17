// A simple API skeleton in Node.js using express
const express = require('express')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

/** The success status codes */

// 200 Ok
app.get('/', (req, res) => res.status(200).sendFile(`${__dirname}/html/register.html`));
app.get('/update', (req, res) => res.status(200).sendFile(`${__dirname}/html/update.html`));
app.get('/bad-request', (req, res) => res.status(200).sendFile(`${__dirname}/html/bad-request.html`));
app.get('/complete', (req, res) => res.status(200).sendFile(`${__dirname}/html/complete.html`));
app.get('/old-registration', (req, res) => res.status(200).sendFile(`${__dirname}/html/old-register.html`));
app.get('/old-reg-fail', (req, res) => res.status(200).sendFile(`${__dirname}/html/old-reg-fail.html`));
app.get('/user/john-new.html', (req, res) => res.status(200).send({message : "This is John's new page"}));
app.get('/user/jane-new', (req, res) => res.status(200).send({message : "This is Jane's new page"}));
app.get('/thank-you-page', (req, res) => res.status(200).send({message : "Thank you for registering!"}));

// 201 Created
app.post('/register', (req, res) => {
  	// logic to save to database
  	res.status(201).send({message : 'registrations compelete'})
});
app.post('/login', (req, res) => {
  	// logic to login
  	res.status(201).send('You have been logged in')
});
// 204 No Content
app.put('/update', (req, res) => {
  	// logic to update database record
  	res.status(204).end()
});

/** The redirection status codes */

// 301 Moved Permanently
app.get('/user/john', (req, res) => {
  	res.set('location', '/user/john-new.html')
  	res.status(301).send()
});
app.post('/old-registration-fail', (req, res) => {
  	res.set('location', '/register')
  	res.status(301).send()
});

// 302 Found
app.get('/user/jane', (req, res) => {
  	res.set('location', '/user/jane-new')
  	res.status(302).send()
});

// 303 See Other
app.post('/complete-registration', (req, res) => {
  	res.set('location', '/thank-you-page')
  	res.status(303).send()
});

// 307 Temporal Redirect
app.post('/old-registration', (req, res) => {
  	res.set('location', '/register')
  	res.status(307).send()
});

// 308 Permanent Redirect
app.post('/old-login', (req, res) => {
  	res.set('location', '/login')
  	res.status(308).send()
});

/** Client error status codes */
// 400 Bad Request
app.post('/bad-request', (req, res) => {
	res.status(400).send({message : "You are missing vital credentials"})
});
// 401 Unauthorized
app.get('/user', (req, res) => {
	res.status(401).send({message : "You need to login to view this"})
});
// 403 Forbidden
app.get('/super-secret', (req, res) => {
	res.status(403).send({message : "You are forbidden from seeing this"})
});
// 405 Method Not Allowed
app.all('/only-put', (req, res) => {
	if(req.method == "PUT") res.status(204).end()
	else res.status(405).send({message : "Please use put"})
})

/** Server error status codes */

// 500 Internal Server Error
app.post('/500', (req, res) => {
	res.status(500).send({message : "I failed. I'm sorry"})
});
// 501 Unauthorized
app.patch('*', (req, res) => {
	res.status(501).send({message : "I will patch no such thing"})
});
// 503 Service Unavailable
app.get('/503', (req, res) => {
	res.status(503).send({message : "I had to take a break. Getting too old for this"})
});
// 505 Method Not Allowed
app.all('/http2', (req, res) => {
	if(req.httpVersion == "2.0") res.status(200).send({message : "You get a response. She gets a response. They get a response... Everybody gets a response"})
	else res.status(505).send({message : "Only http2 baby"})
})

// 404 Not Found — We put it last because we want to catch everything else not defined
app.all('*', (req, res) => {
	res.status(404).send({message : "This resource was not found"})
})

app.listen(3000, () => console.info('Application running on port 3000'));