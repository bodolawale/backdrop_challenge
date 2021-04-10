const http = require("http");
const app = require("../app");

const server = http.createServer(app);

before((done) => {
	const port = process.env.PORT;
	server.listen(port, (err) => {
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${port}`
		);
		if (err) return done(err);
		return done();
	});
});

after((done) => {
	server.close(() => {
		console.log("Server closed");
		return done();
	});
});
