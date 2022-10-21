const { ObjectId } = require("mongodb");
const mongo = require("../connect");

//Get Users
module.exports.getUsers = async (req, res) => {
	try {
		const usersData = await mongo.selectedDb.collection("users").find().toArray();
		res.send(usersData);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};

//Create Users
module.exports.createUsers = async (req, res) => {
	try {
		const createdResponse = await mongo.selectedDb.collection("users").insertOne(req.body);
		res.send(createdResponse);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};

//Update Users
module.exports.updateUsers = async (req, res) => {
	try {
		const id = req.params.id;
		const updateUserData = await mongo.selectedDb
			.collection("students")
			.findOneAndUpdate({ _id: ObjectId(id) }, { $set: { ...req.body } }, { returnDocument: "after" });
		res.send(updateUserData);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};

//Delete Users
module.exports.deleteUsers = async (req, res) => {
	try {
		const id = req.params.id;
		const deleteUserData = await mongo.selectedDb.collection("users").remove({ _id: ObjectId(id) });
		res.send(deleteUserData);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};
