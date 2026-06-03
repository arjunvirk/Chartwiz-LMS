import bcrypt from "bcryptjs";

const users = [
  {
    name: "Rahul Sharma",

    email: "teacher@chartwiz.com",

    password: bcrypt.hashSync("123456", 10),

    role: "teacher",

    isVerified: true,

    authProvider: "manual",

    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
  },

  {
    name: "Aman Gupta",

    email: "student1@chartwiz.com",

    password: bcrypt.hashSync("123456", 10),

    role: "student",

    isVerified: true,

    authProvider: "manual",

    profilePic: "https://randomuser.me/api/portraits/men/75.jpg",
  },

  {
    name: "Priya Verma",

    email: "student2@chartwiz.com",

    password: bcrypt.hashSync("123456", 10),

    role: "student",

    isVerified: true,

    authProvider: "manual",

    profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
  },

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
