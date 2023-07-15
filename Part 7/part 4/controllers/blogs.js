const blogsRouter = require('express').Router();
const blog = require('../model/blog');
const User = require('../model/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
    const blogs = await blog.find({}).populate('user');

    response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
    let Blog;

    const user = request.user;

    if (!request.body.title || !request.body.url) {
        response.status(400).end();
    } else if (!request.body.likes) {
        Blog = new blog({
            ...request.body,
            "likes": 0,
            "user": user.id
        })
        const savedBlog = await Blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();
        response.status(201).json(savedBlog);
    } else {
        Blog = new blog({
            ...request.body,
            "user": user.id
        });
        const savedBlog = await Blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();
        response.status(201).json(savedBlog);
    }  
});

blogsRouter.get('/:id', async (request, response) => {
    const blogId = request.params.id

    const blogDetails = await blog.findById(blogId)

    response.status(200).json(blogDetails)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blogId = request.params.id;

    const user = request.user;

    const deletedBlog = await blog.findById(blogId);

    if (deletedBlog.user.toString() !== user._id.toString()) {
        return response.status(401).send({
            error: 'Unauthorized!'
        })
    }

    await blog.findByIdAndRemove(blogId);

    user.blogs = user.blogs.filter(blog => blog.toString() !== blogId)

    await user.save();

    response.status(204).send('deleted successfully!');
});

blogsRouter.put('/:id', async (request, response) => {
    const blogId = request.params.id
    const body = request.body

    const newlyUpdatedLikes = {
        likes: body.likes
    }
    
    const updatedBlog = await blog.findByIdAndUpdate(blogId, newlyUpdatedLikes, { new: true })

    response.send(updatedBlog);
});

blogsRouter.post('/:id/comments', async (request, response) => {
    const blogId = request.params.id
    const { comment } = request.body

    const blogToUpdated = await blog.findById(blogId)

    console.log(blogToUpdated.comments);
    console.log(comment);

    if (!blogToUpdated.comments) {
        const newlyUpdatedBlog = {
            ...blogToUpdated,
            comments: [comment]
        }
    
        const updatedBlog = await blog.findByIdAndUpdate(blogId, newlyUpdatedBlog, { new: true })

        console.log('111');
    
        response.send(updatedBlog)
    } else {
        console.log('222');
        const newlyUpdatedBlog = {
            comments: blogToUpdated.comments.concat(comment)
        }
    
        const updatedBlog = await blog.findByIdAndUpdate(blogId, newlyUpdatedBlog, { new: true })
    
        response.send(updatedBlog)
    }
})

module.exports = blogsRouter
