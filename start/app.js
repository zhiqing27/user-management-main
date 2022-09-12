require('dotenv').config();
const Express = require("express");
const app = Express();
const Helmet = require('helmet');
const BodyParser = require('body-parser');
const bodyParserConfig = require("../config/bodyparser");
const methodOveride = require('method-override');
const routes = require("./routes");
const cors = require('cors');
const Compression = require('compression');
app.use(Helmet());
app.use(BodyParser.json(bodyParserConfig));
app.use(BodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(Express.static('public'));
app.use(require("../app/middlewares/token-verification").handle);
app.use(Compression());
const appRoutes = routes(app);

app.use(methodOveride('_method'))

// define a route handler for the default home page


module.exports = app;