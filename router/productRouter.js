const express = require("express");
const product = require("../modules/productModule");

const router = express.Router();

router.get("/getproduct", (req, res, next) => {
	product.find((err, data) => {
		console.log(data, err);
		if (err) {
			console.log(err);

			res.status(404).json({
				message: "data failed",
			});
		} else {
			res.send(data).status(201);
		}
	});
});

router.post("/createproduct", (req, res, next) => {
	const payload = req.body;
	const newproduct = new product(payload);
	newproduct.save((err, data) => {
		if (err) {
			console.log(err);
			res.status(405).json({ message: "Create Failed" });
		} else {
			res.send(data).status(201);
		}
	});
});

router.put("/updateproduct/:proID", (req, res, next) => {
	try {
		product.findByIdAndUpdate({ _id: req.params.proID }, { $set: req.body }, (err, data) => {
			if (err) {
				console.log(err);
				res.status(400).json({ message: "Not Update Products" });
			} else {
				res.status(201).json({
					data: data,
					message: "Update the Products",
				});
			}
		});
	} catch (error) {
		console.log(error);
		res.send({ message: "Internal server error " }).status(400);
	}
});
router.delete("/deleteproduct/:proID", (req, res) => {
	product.deleteOne({ _id: req.params.proID }, (err, data) => {
		if (err) {
			console.log(err);
			res.send({ message: "Not Delete The products" }).status(400);
		} else {
			res.send({ message: `Delete the ${req.params.proID} was Deleted` }).status(200);
		}
	});
});

module.exports = router;
