import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",

    email: "admin@chartwiz.com",

    password: bcrypt.hashSync("123456", 10),

    role: "admin",

    isVerified: true,

    authProvider: "manual",

    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
];

export default users;
