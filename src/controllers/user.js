const User = require("../model/user");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};
exports.delete = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (
    req.user._id !== user._id.toString() ||
    req.user.role !== "Manager" ||
    req.user.role !== "Admin"
  ) {
    return next(401, "Unauthorized");
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};
exports.updates=async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) {
      return next(createError(403,"No user is found"));
    }

    updates.forEach((ele) => (user[ele] = req.body[ele]));
    await user.save();

    res.status(200).send(user);
  } catch (e) {
   ;next(e)
  }
};
