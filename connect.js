const { MongoClient } = require("mongodb");

module.exports = {
	selectedDb: [],
	async connect() {
		try {
			const client = await MongoClient.connect(process.env.DATA_URL);
			this.selectedDb = client.db("pizza");
		} catch (error) {
			console.log(error);
		}
	},
};
