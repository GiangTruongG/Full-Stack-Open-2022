const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');

const api = supertest(app);

test('User with missing username will not be added', async () => {
    const newUser = {
        "name": "Jason Bui",
        "password": "258741369"
    };

    const initalResponse = await api.get('/api/users');

    const initialUsers = initalResponse.body;

    await api.post('/api/users')
        .send(newUser)
        .expect(400)

    const responseAfter = await api.get('/api/users');

    expect(responseAfter.body).toHaveLength(initialUsers.length);
});

test('User with exsisting username will not be added', async () => {
    const newUser = {
        "username": "Bui",
        "name": "Jason Bui",
        "password": "258741369"
    };

    const initalResponse = await api.get('/api/users');

    const initialUsers = initalResponse.body;

    await api.post('/api/users')
        .send(newUser)
        .expect(400)

    const responseAfter = await api.get('/api/users');

    expect(responseAfter.body).toHaveLength(initialUsers.length);
});

test('Username or Password that are fewer 3 characters will not be added', async () => {
    const newUser = {
        "username": "aa",
        "name": "Jason Bui",
        "password": "258741369"
    };

    const initalResponse = await api.get('/api/users');

    const initialUsers = initalResponse.body;

    await api.post('/api/users')
        .send(newUser)
        .expect(400)

    const responseAfter = await api.get('/api/users');

    expect(responseAfter.body).toHaveLength(initialUsers.length);
});

test('Add a new user', async () => {
    const newUser = {
        "username": "Jasmine Bui",
        "name": "Dinh Bui",
        "password": "123456"
    };

    const initalResponse = await api.get('/api/users');

    const initialUsers = initalResponse.body;

    await api.post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const responseAfter = await api.get('/api/users');

    expect(responseAfter.body).toHaveLength(initialUsers.length + 1);
});

afterAll(async () => {
    await mongoose.connection.close()
});
