const { nanoid: nano } = require("nanoid");
function nanoid(size) {
	return nano(size);
}

module.exports = nanoid;
