const express = require("express");

const userRouter = express.Router();

const users = require("../modules/userModule");

userRouter.get("/get", users.getUsers);
userRouter.post("/create", users.createUsers);
userRouter.put("/update/:id", users.updateUsers);
userRouter.delete("/delete/:id", users.deleteUsers);

module.exports = userRouter;
