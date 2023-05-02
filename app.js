import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import * as dotenv from 'dotenv'
import path, { dirname } from 'path';
import sql from './config/database.js';
import productosRouter from './src/views/routers/ProductosRouters.js';
import usuariosRouter from './src/views/routers/UsuariosRouters.js';
import pedidosRouter from './src/views/routers/PedidosRouters.js';

dotenv.config();

const app = express();
const debugApp = debug('app');
const PORT = process.env.PORT || 3000


app.use(express.static(path.join(dirname('.'), '/public/')));
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: false}));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/accesorios', productosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/pedidos', pedidosRouter);

app.get('/', (req, res) => {
    res.render('index', { name: "My class", data: ['a', 'b', 'c']});
});

app.use('/Productos', productosRouter);
app.use('/Usuarios', usuariosRouter);
app.use('/Pedidos', pedidosRouter);

productosRouter.get('/create', (req, res) => {
    res.render('Productos/create');
});

usuariosRouter.get('/create', (req, res) => {
    res.render('Usuarios/create');
});

pedidosRouter.get('/create', (req, res) => {
    res.render('Pedidos/create');
});

app.listen(PORT, () => {
    debugApp('Listening on port ' + chalk.green(PORT));
});

app.get('/accesorios');