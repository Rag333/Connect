const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || firstName.trim().length < 2) {
    throw new Error("First name is not valid");
  }

  if (!lastName || lastName.trim().length < 2) {
    throw new Error("Last name is not valid");
  }

  if (!emailId || !validator.isEmail(emailId)) {
    throw new Error("Enter a valid email");
  }

  if (
    !password ||
    !validator.isStrongPassword(password, {
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw new Error(
      "Password must be 8+ chars with uppercase, lowercase, number & symbol"
    );
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "photoUrl",
    "gender",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
