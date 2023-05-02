import express from "express";
import sql from "../../../config/database.js";

const pedidosRouter = express.Router();

pedidosRouter.get('/Pedidos/create', (req, res) => {
    res.render('create');
});

pedidosRouter.post('/create', async (req, res) => {
    const { Cid_usuario, Cid_producto, Cfecha_Pedido, Cdireccion_entrega, Cciudad_entrega, Cpais_entrga } = req.body;
    try {
      await sql`
        INSERT INTO pedido (id_usuario, id_producto, fecha_pedido, direccion_entrega, ciudad_entrega, pais_entrega)
        VALUES (${Cid_usuario}, ${Cid_producto}, ${ Cfecha_Pedido}, ${Cdireccion_entrega}, ${Cciudad_entrega}, ${Cpais_entrga})`;
      res.send(`La compra ha sido exitosa`);
    } catch (error) {
      console.error(error);
      res.send('Ocurrió un error al crear el usuario');
    }
  });
  

pedidosRouter.get('/', async (req, res) => {
    const pedidos = await sql`
        select
        id_pedido,
        id_usuario,
        id_producto,
        fecha_pedido,
        direccion_entrega,
        ciudad_entrega,
        pais_entrega
        from pedido`
    res.render('pedidos', { pedidos });
});

export default pedidosRouter;