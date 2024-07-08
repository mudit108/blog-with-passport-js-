const blog = require('../models/blog');
const User = require('../models/User');

exports.getblogs = async (req, res) => {
    try {
        const blogs = await blog.find({});
        return res.render('index', { blogs });
    } catch (err) {
        console.error(err);
        res.send('Server Error');
    }
};


exports.getblogById = async (req, res) => {
    const {id}=req.params
    console.log(id);
    try {
        const blogs = await blog.findById(id);
        
        if (!blogs) {
            return res.send('blog not found');
        }
        return res.render('blog', { blogs });
    } catch (err) {
        console.error(err);
        console.log(blog);
        res.send('Server Error');
    }
};

exports.addblog = (req, res) => {
    res.render('addblog');
};

exports.createblog = async (req, res) => {
    try {
        const { title, genre, location, description, date, image } = req.body;
        const newblog = new blog({
            title,
            genre,
            location,
            description,
            date,
            image
        });
        await newblog.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send('Server Error1212121212');
    }
};

exports.editblog = async (req, res) => {
    try {
        const blog = await blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send('blog not found');
        }
        res.render('editblog', { blog });
    } catch (err) {
        console.error(err);
        res.send('Server Error');
    }
};

exports.updateblog = async (req, res) => {
    try {
        const { title, genre, location, description, date, imageUrl } = req.body;
        let blog = await blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send('blog not found');
        }
        blog.title = title;
        blog.genre = genre;
        blog.location = location;
        blog.description = description;
        blog.date = date;
        blog.imageUrl = imageUrl;

        await blog.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send('Server Error');
    }
};

exports.deleteblog = async (req, res) => {
    try {
        await blog.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send('Server Error');
    }
};


exports.signupPage = (req, res) => {
    res.render('signup');
};
exports.signup =  async (req, res) => {
    const { username, email, password, phoneNumber } = req.body;

    try {
        let user = await User.findOne({ email });
        user = new User({
            username,
            email,
            password,
            phoneNumber
        });
        // await user.save();
        
        res.redirect('login');
    } catch (err) {
        console.error(err.message);
        res.send('Server Error');
    }
};
exports.loginPage = (req, res) => {
    res.render('login');
};



exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (!user) {
            console.log("wrong username");
            return false;
        }

        if (password !== user.password) {
            console.log("wrong password");
            return false;
        }

        // req.session.user = user.id;
        return res.redirect('/');
        
    } catch (err) {
        console.error(err.message);
        res.send('Server Error');
    }
};


exports.logout =  (req, res) => {
    res.clearCookie('user');
    res.redirect('login');
};

