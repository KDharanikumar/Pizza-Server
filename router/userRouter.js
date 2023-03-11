const express = require("express");
const user = require("../modules/userModule");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const checkpassword = (password, confirmpassword) => {
	return password !== confirmpassword ? false : true;
};

router.post("/signup", async (req, res) => {
	try {
		const exuser = await user.findOne({ email: req.body.email });
		if (exuser)
			res.status(409).json({
				message: "You are already exist User Please SignIn Here",
				success: false,
			});

		const isSameePassword = checkpassword(req.body.password, req.body.confirmpassword);
		if (!isSameePassword) {
			return res.status(400).send({ msg: "password doesnot match" });
		} else delete req.body.confirmpassword;

		const salt = await bcrypt.genSalt(Number(10));
		const hashpassword = await bcrypt.hash(req.body.password, salt);

		let newuser = new user({ ...req.body, password: hashpassword });
		await newuser.save((err, data) => {
			if (err) {
				return res.status(400).send({
					message: "Error while adding new employee. Please check the data",
				});
			}
			res.send({ message: "user create Successfully" }).status(201);
		});
	} catch (error) {
		console.log(error);
		res.send({ message: "Internal Server Error" }).status(500);
	}
});
router.post("/signin", async (req, res) => {
	try {
		const users = await user.findOne({ email: req.body.email });
		if (!users) {
			res.status(400).send({ message: "Your not exist user please signup here" });
		}

		const validpass = await bcrypt.compare(req.body.password, users.password);
		// console.log(validpass);
		if (!validpass) {
			res.status(409).send({ message: "Please Enter Valid Password" });
		}

		const token = jwt.sign({ users }, process.env.SECRET_KEY, { expiresIn: "1hr" });

		res.send(token).status(200);
	} catch (error) {
		res.send({ message: `Internal Server Error${error}` }).status(500);
	}
});

router.get("/getuser", (req, res, next) => {
	user.find((err, data) => {
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

module.exports = router;
