const Users = require("../../models/Users");
const bcryptjs = require("bcryptjs");
const auth = require("basic-auth");
require("dotenv/config");

const authenticateUser = async (req, res, next) => {
  let message = null;
  // Parse the user's credentials from the Authorization header.

  const credentials = auth(req);

  // If the user's credentials are available...
  if (credentials) {
    // Attempt to retrieve the user from the data store
    const users = await Users.find();
    const user = users.filter(user =>
      bcryptjs.compareSync(credentials.name, user.username)
    );
    if (Object.keys(user).length > 0) {
      // Compare passwords
      const authenticated = bcryptjs.compareSync(
        credentials.pass,
        user[0].password
      );

      // If passwords match
      if (authenticated) {
        // Store user in request object
        req.currentUser = user;
      } else {
        message = `Authentication failure.`;
      }
    } else {
      message = `Authentication failure for username`;
    }
  } else {
    message = "Auth header not found";
  }

  // If user authentication failed...
  if (message) {
    console.warn(message);
    // Return a response with a 401 Unauthorized HTTP status code.
    res.status(401).json({ message: "Access Denied" });
  } else {
    // Or if user authentication succeeded.
    next();
  }
};
module.exports = authenticateUser;
