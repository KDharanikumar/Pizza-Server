const mongo = require("../connect");

module.exports.getProducts = async (req, res) => {
	try {
		const PostsData = await mongo.selectedDb.collection("products").find().toArray();
		res.send(PostsData);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};
//
module.exports.createProducts = async (req, res) => {
	try {
		const insertedResponse = await mongo.selectedDb.collection("products").insertOne(req.body);
		res.send(insertedResponse);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};
module.exports.updateProducts = async (req, res) => {
	try {
		const id = req.params.id;
		const updatePostData = await mongo.selectedDb
			.collection("products")
			.findOneAndUpdate({ _id: ObjectId(id) }, { $set: { ...req.body } }, { returnDocument: "after" });
		res.send(updatePostData);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};
module.exports.deleteProducts = async (req, res) => {
	try {
		const id = req.params.id;
		const deletePostData = await mongo.selectedDb.collection("products").remove({ _id: ObjectId(id) });
		res.send(deletePostData);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};
