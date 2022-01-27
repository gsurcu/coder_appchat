const express = require('express');
const {
  listarProductosController,
  listarProductosPorIdController,
  guardarProductoController,
  actualizarProductoController,
  eliminarProductoController
} = require('../../controllers/productos.controllers');

const router = express.Router();

router.get('/', listarProductosController);

router.get('/:idProducto', listarProductosPorIdController);

router.post('/', guardarProductoController);

router.put('/:idProducto', actualizarProductoController);

router.delete('/:idProducto', eliminarProductoController);

module.exports = router;