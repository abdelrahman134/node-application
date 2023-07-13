const User = require("../model/user");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
exports.register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const user = new User({ ...req.body, password: hash });
    await user.save();
    res.statuse(200).send(user);
  } catch (e) {
    next(e);
  }
};
exports.login = async (req, res) => {
  try {
    const user = await User.findOne(req.body.username);
    if (!user) next(createError(404, "username or password is wrong"));
    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isMatch) next(createError(404, "username or password is wrong"));
    const token = jwt.sign({ userId: user._id }, "secretKey");
    user.lastLogin = new Date();
    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (e) {
    next(e);
  }
};
exports.logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
