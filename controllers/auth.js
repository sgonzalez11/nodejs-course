exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get('Cookie').split(';')[4].split('=')[1];
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/')
};

