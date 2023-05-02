import express from "express";
import sql from "../../../config/database.js";

const usuariosRouter = express.Router();

usuariosRouter.get('/Usuarios/create', (req, res) => {
    res.render('create');
});

usuariosRouter.post('/create', async (req, res) => {
    const { CnombreU, CemailU, CcontraseñaU, CdireccionU, CciudadU, CpaisU } = req.body;
    try {
      await sql`
        INSERT INTO usuario (nombre, correo, contraseña, direccion, ciudad, pais)
        VALUES (${CnombreU}, ${CemailU}, ${CcontraseñaU}, ${CdireccionU}, ${CciudadU}, ${CpaisU})`;
      res.send(`El usuario ${CnombreU} ha sido creado`);
    } catch (error) {
      console.error(error);
      res.send('Ocurrió un error al crear el usuario');
    }
  });
  

usuariosRouter.get('/', async (req, res) => {
    const usuarios = await sql`
        select
        id_usuario,
        nombre,
        correo,
        contraseña,
        direccion,
        ciudad,
        pais
        from usuario`
    res.render('usuarios', { usuarios });
});

export default usuariosRouter;