const http = require("http");
const app = require("../app");

const server = http.createServer(app);

before((done) => {
	const port = process.env.PORT;
	server.listen(port, (err) => {
		// eslint-disable-next-line no-console
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${port}`
		);
		if (err) return done(err);
		return done();
	});
});

after((done) => {
	server.close(() => {
		// eslint-disable-next-line no-console
		console.log("closed server");
		return done();
	});
});
