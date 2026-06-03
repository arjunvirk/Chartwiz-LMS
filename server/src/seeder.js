import mongoose from "mongoose";

import dotenv from "dotenv";

import colors from "colors";

import users from "./data/users.js";

import User from "./models/User.js";


dotenv.config({
  path: "./server/.env",
});

// ---------------- CONNECT DATABASE ----------------

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected".green.bold);
  })
  .catch((error) => {
    console.log(`${error}`.red.bold);

    process.exit(1);
  });

// ---------------- IMPORT DATA ----------------

const importData = async () => {
  try {
    // DELETE OLD DATA

    await User.deleteMany();

    // INSERT USERS

    await User.insertMany(users);

    console.log("Users Imported Successfully".green.inverse);

    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);

    process.exit(1);
  }
};

// ---------------- DESTROY DATA ----------------

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log("Users Destroyed Successfully".red.inverse);

    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);

    process.exit(1);
  }
};

// ---------------- RUN COMMAND ----------------

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
