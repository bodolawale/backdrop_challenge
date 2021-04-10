const app = require("./app");

const port = process.env.PORT || 3231;

app.listen(port, () => {
	console.log(`App started on port ${port}`);
});
