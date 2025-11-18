const adminAuth = (req, res, next) => {
  const token = "xyzzzaada";
  const isAdminAuthorized = token === "xyzzzaada";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized Access");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
