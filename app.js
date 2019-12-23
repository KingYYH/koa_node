const Koa = require('koa')
const app = new Koa()
const InitManager = require('./core/init')
const bodyParser = require('koa-bodyparser');

const catchError = require('./middlewares/exception')
const cors = require('koa-cors');
app.use(cors());

app.use(catchError);
app.use(bodyParser());
InitManager.initCore(app)
app.listen(3000);
