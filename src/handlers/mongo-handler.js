const mongoose = require('mongoose');
const mongoPath = process.env.MONGO_URI;

module.exports = async () => {
	await mongoose.connect(mongoPath, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	return mongoose;
}