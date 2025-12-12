import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { readDb, writeDb } from "../../database/database.js";

const JWT_SECRET = "secret";

export default {
  async register({ username, password, profilePicture }) {
    
    const db = await readDb();
    
    const existingUser = db.users.find((user) => user.username === username);
    if (existingUser) {
      const err = new Error("Username already taken");
      err.statusCode = 400;
      throw err;
    }
    
    const newUser = {
      id: crypto.randomUUID(),
      username: username,
      password: password,
      profilePicture: profilePicture,
    }
    db.users.push(newUser);
    
    await writeDb(db);
    
    return {
      id: newUser.id,
      username: newUser.username,
      profilePicture: newUser.profilePicture,
    };
  },

  async login({ username, password }) {
    // TODO: get ahold of the db using readDb();
    // TODO: check the database for a user with a matching username and password
    // TODO: if there is no user:
    //       - construct a new Error("Invalid username or password");
    //       - set the statusCode of that error object to 401
    //       - throw the err
    // TODO: otherwise, create a login token. I'll help you out with this one:
    // const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" })
    // TODO:  return an object that contains 2 things:
    //  - token
    //  - user : { id: user.id, username: user.username, profilePicture: user.profilePicture }

    return {
      token,
      user: {
        id: "dummy-id",
        username: "dummy-username",
        profilePicture: "dummy-profilePicture",
      },
    };
  },
};
