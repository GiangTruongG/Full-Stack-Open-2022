const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');

const api = supertest(app);

test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')

    expect(response.header['content-type']).toContain('application/json');
    expect(response.body).toHaveLength(2)

}, 100000);

test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
        expect(blog.id).toBeDefined();
    });
});

test('a new blog can be added', async () => {
    const newBlog = {
        "title": "This is for testing1!",
        "author": "Jasmine",
        "url": "25",
        "likes": 15
    };

    const loginUser = {
        "username": "Jasmine Bui",
        "password": "123456"
    };

    const loginResponse = await api.post('/api/login').send(loginUser);

    const { token } = loginResponse.body;

    const initalResponse = await api.get('/api/blogs');

    const initialBlogs = initalResponse.body;

    await api.post('/api/blogs')
        .set('Authorization', `Bearer ${ token }`)
        .set('Content-Type', 'application/json')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs');
    
    expect(response.body).toHaveLength(initialBlogs.length + 1);

    const blogs = response.body.map(blog => blog.title);

    expect(blogs).toContain('This is for testing1!');
});

test('a new blog cannot be added without a token or with invalid token', async () => {
    const newBlog = {
        "title": "This is for testing2!",
        "author": "Hana",
        "url": "35",
        "likes": 25
    };

    const loginUser = {
        "username": "Jasmine Bui",
        "password": "123456"
    };

    const initalResponse = await api.get('/api/blogs');

    const initialBlogs = initalResponse.body;

    const invalidToken = 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikphc21pbmUgQnVpIiwiaWQiOiI2NDc4OTM2MWI4NmFiOTMwYmYyMzc2N2YiLCJpYXQiOjE2ODU3NTExODl9.zVtHVvebAwchWq2AwYXAxCG6ayrv4XwCoN_jU3Hycoo';

    await api.post('/api/blogs')
        .set('Authorization', `Bearer ${invalidToken}`)
        .set('Content-Type', 'application/json')
        .send(newBlog)
        .expect(401)

    const response = await api.get('/api/blogs');
    
    expect(response.body).toHaveLength(initialBlogs.length);
});

test('the newly added blog has likes property', async () => {
    const newBlog = {
        "title": "This is for testing (Jasmine)!",
        "author": "Jasmine",
        "url": ""
    };

    const response = await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0);
});

test('if title or url property is missing', async () => {
    const newBlog = {
        "author": "Jasmine",
        "likes": 12
    };

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
});

test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]
    const blogsAtStartLength = blogsAtStart.body.length

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body).toHaveLength(blogsAtStartLength - 1)

    const titles = blogsAtEnd.body.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
});

test('Update the likes property of a blog', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart.body[0]

    const updatedLikes = {
        likes: 50
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedLikes)

    const blogsAtEnd = await api.get('/api/blogs')

    const likes = blogsAtEnd.body.map(blog => blog.likes)

    expect(likes).toContain(50);
});

afterAll(async () => {
    await mongoose.connection.close()
});
