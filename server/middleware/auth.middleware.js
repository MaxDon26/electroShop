const tokenService = require("../services/token.service");
const userService = require("../services/user.service");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = tokenService.validateAccess(token);
    const user = await userService.getUser(data._id);

    if (!user && user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = data;

    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
