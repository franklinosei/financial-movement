import bcrypt from "bcrypt";

// Function to hash a password using bcrypt
function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export { hashPassword };
