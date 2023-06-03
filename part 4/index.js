require('dotenv').config();
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const express = require('express');
const app = express();
const cors = require('cors');
const { info } = require('./utils/logger');
const { PORT } = require('./utils/config');
const jwt = require('jsonwebtoken');
const User = require('./model/user');

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');

    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
        
        next();
        return
    }
    
    next();
};

const userExtractor = async (request, response, next) => {
    if (!request.token) {
        next();
        return
    }

    let decodedToken;

    try {
        decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).send({
                error: 'token invalid!'
            })
        }
    } catch (error) {
        if (error) {
            return response.status(401).send({
                error: 'token invalid!'
            })
        }
    }

    const user = await User.findById(decodedToken.id);

    request.user = user;
    next()
    return
};

app.use(tokenExtractor);

app.use(cors());
app.use(express.json());

app.use('/api/blogs', userExtractor, blogsRouter);

app.use('/api/users', usersRouter);

app.use('/api/login', loginRouter);

app.listen(PORT, () => {
    info(`Sever running on port ${PORT}`);
});

module.exports = app
