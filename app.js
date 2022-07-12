const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/products');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

// app.engine(
//     'hbs',
//     expressHbs({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs' }));
// app.set('view engine', 'hbs');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

// One User can may have a lot of Products
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
// Un Usuario puede tener un carrito
User.hasOne(Cart);
Cart.belongsTo(User);
// Un carrito puede tener mucho productos y un producto estar en muchos carritos
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});


sequelize
    .sync()
    //.sync({force: true})
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            User.create({ name: 'Seb', email: 'sgonzalez11@gmail.com'});
        }
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
