const express = require("express");
const path = require("path");
const http = require("http");
const dotenv = require("dotenv"); dotenv.config();
const morgan = require("morgan");
const mongoose = require('mongoose');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const SessionStore = require("connect-mongodb-session")(session);
dotenv.config({ path: 'config.env' });
const cors = require("cors");
const compression = require('compression');

const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const userRoute = require("./src/Modules/User/user.Route");
const authRoute = require("./src/Modules/Auth/auth.Route");
const productRoute = require("./src/Modules/product/product.route");
const homeRoute = require("./src/Modules/Home/home.Route");
const AboutusRoute = require("./src/Modules/Aboutus/aboutus.route");
const contactusRouter = require("./src/Modules/Contactus/contactus.route");
const cartRouter = require("./src/Modules/cart/cart.route")
const favRouter = require("./src/Modules/Fav/fav.route")
const orderRouter = require("./src/Modules/Order/order.route")
const virtualTryOnRouter = require("./src/Modules/VirtualTryOn/virtualTryOn.route")
const ErrorModelRouter = require("./src/Modules/VirtualTryOn/errormodel.route")
const ErrorRouter = require("./src/Modules/Errors/error.route")
const adminRouter = require("./src/Modules/Admin/admin.route")

// Connect with db
dbConnection();

// app.use(async (req, res, next) => {
//   if (mongoose.connection.readyState !== 1) {
//     await dbConnection(); // Wait until connected
//   }
//   next();
// });
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


// compress all responses
app.use(compression());
app.use(cors({
  origin: "http://localhost:4200",
  // origin: process.env.BASE_URL2,
  methods: ["GET", "POST", "PUT", 'PATCH', "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // to allow send cookies
}));

// Store session
const STORE = new SessionStore({
  uri: process.env.MONGO_URL,
  collection: 'sessions'
});

// Use session
app.use(session({
  secret: 'this is my secrt to hash express session',
  saveUninitialized: false,
  resave: false,
  store: STORE,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Ensure this is 'true' in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // Cookie expiration (1 day)
  },
  serializeUser: (user, done) => {
    done(null, { _id: user._id, name: user.name, email: user.email });
  }
}));


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

app.use('/home', homeRoute);
app.use('/product', productRoute);
app.use('/users', userRoute);
app.use('/contactUs', contactusRouter);
app.use('/aboutUs', AboutusRoute);
app.use('/', authRoute);
app.use('/', cartRouter);
app.use('/', favRouter);
app.use('/', orderRouter);
app.use('/', virtualTryOnRouter);
app.use('/', ErrorModelRouter);
app.use('/', ErrorRouter);
app.use('/', adminRouter);

app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);


app.listen(PORT, () => {
  console.log(`App Server running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
