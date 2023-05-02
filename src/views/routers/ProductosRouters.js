import express from "express";
import sql from "../../../config/database.js";

const productosRouter = express.Router();

productosRouter.get('/Productos/create', (req, res) => {
    res.render('create');
});

productosRouter.post('/create', async (req, res) => {
    const { Cnombrep, Cpreciop, Cdescripcionp } = req.body;
    try {
      await sql`
        INSERT INTO producto (nombre, descripcion, precio)
        VALUES (${Cnombrep}, ${Cdescripcionp}, ${Cpreciop})`;
      res.send(`El producto ${Cnombrep} ha sido creado`);
    } catch (error) {
      console.error(error);
      res.send('Ocurrió un error al crear el producto');
    }
  });
  

productosRouter.get('/', async (req, res) => {
    const accesorios = await sql`
        select
        id_producto,
        nombre,
        descripcion,
        precio
        from producto`
    res.render('accesorios', { accesorios });
});

export default productosRouter;