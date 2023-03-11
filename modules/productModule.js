const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
	{
		name: { type: String, required: [true, "Please Enter Name"] },

		price: { type: Number, required: [true, "Please Enter Price"] },

		image: { type: String, required: [true, "Please Enter Image"] },

		desc: { type: String, required: [true, "Please Enter Description"] },

		category: {
			type: String,
			require: [true, "Please Enter category"],
			enum: {
				values: ["Veg", "Non-Veg"],
				message: "Please Select category",
			},
		},
	},
	{
		timestamps: true,
	}
);
const productmodel = mongoose.model("product", productSchema);

module.exports = productmodel;
// module.exports.updateProducts = async (req, res) => {
// 	try {
// 		const id = req.params.id;
// 		const updatePostData = await mongo.selectedDb
// 			.collection("products")
// 			.findOneAndUpdate({ _id: ObjectId(id) }, { $set: { ...req.body } }, { returnDocument: "after" });
// 		res.send(updatePostData);
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).send(err);
// 	}
// };
// module.exports.deleteProducts = async (req, res) => {
// 	try {
// 		const id = req.params.id;
// 		const deletePostData = await mongo.selectedDb.collection("products").remove({ _id: ObjectId(id) });
// 		res.send(deletePostData);
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).send(err);
// 	}
// };
