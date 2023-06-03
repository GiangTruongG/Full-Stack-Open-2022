const dummy = (blogs) => {
    return 1
};

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0].likes
    } else if (blogs.length > 1) {
        return blogs.reduce((sum, blog) => {
            return sum + blog.likes
        }, 0);
    }
};

const favoriteBlog = (blogs) => {
    let max = 0;

    for (let blog of blogs) {
        if (blog.likes > max) {
            max = blog.likes;
        }
    }

    return blogs.filter(blog => blog.likes === max)[0];
};

const mostBlogs = (blogs) => {
    const authors = [];

    blogs.map(blog => {
        const exsistedAuthor = authors.find(author => author.author === blog.author);

        if (!exsistedAuthor) {
            authors.push({
                author: blog.author,
                blogs: 1
            })
        } else {
            authors.forEach(author => author.author === blog.author ? { ...author, blogs: author.blogs++ } : author)
        }
    });

    const biggestNumberOfBlogs = Math.max(...authors.map(author => author.blogs));

    return authors.find(author => author.blogs === biggestNumberOfBlogs);
};

const mostLikes = (blogs) => {
    const authors = [];

    blogs.map(blog => {
        const exsistedAuthor = authors.find(author => author.author === blog.author);

        if (!exsistedAuthor) {
            authors.push({
                author: blog.author,
                likes: blog.likes
            })
        } else {
            authors.forEach(author => author.author === blog.author ? { ...author, likes: author.likes += blog.likes } : author)
        }
    })

    const biggestNumberOfLikes = Math.max(...authors.map(author => author.likes));

    return authors.find(author => author.likes === biggestNumberOfLikes);
};

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
