const { User } = require("../models");

const userData =[
    {
        username: "Tyler",
        password: "password"
    },
    {
        username: "Cleo",
        password: "thekittycat"
    },
    {
        username: "Farley",
        password: "alsothecat"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;