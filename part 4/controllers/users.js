const usersRouter = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs');

    response.json(users);
});

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;

    const exsistingUserName = await User.find({ username });

    if (!(username && password)) {
        return response.status(400).send({
            error: "Username and password both need to be given"
        });
    } else if (!(username.length >= 3 && password.length >= 3)) {
        return response.status(400).send({
            error: "Username and password both need to be at least 3 characters long"
        });
    } else if (exsistingUserName.length > 0) {
        return response. status(400).send({
            error: "Username exsisting!"
        })
    };

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        username,
        name,
        passwordHash 
    });

    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
});

module.exports = usersRouter
