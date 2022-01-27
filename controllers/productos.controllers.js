const { ProductosApi } = require('../models/index');

const productos = new ProductosApi();

const listarProductosController = (req, res) => {
  const { precio, busqueda } = req.query;
  let respuestaProductos =productos.listarTodos();
  if (Object.keys(req.query).length) {
    if (precio) {
      if (isNaN(+precio)) {
        return res.status(400).send('precioMaximo must be a valid number');
      }
      respuestaProductos = respuestaProductos.filter(producto => producto.precio <= +precio);
    }
    if (busqueda) {
      respuestaProductos = respuestaProductos
        .filter(producto => 
          producto.nombre.toLowerCase().startsWith(busqueda.toLowerCase())
        )
    }
  }
  return res.json(respuestaProductos);
};

const listarProductosPorIdController = (req, res) => {
  const { idProducto } = req.params;
  const producto = productos.listarPorId(idProducto);
  if (producto.error) return res.status(404).send(producto.error);
  return res.json(producto);
};

const guardarProductoController = (req, res) => {
  const nuevoProducto = productos.guardar(req.body);
  console.log(productos)
  if (nuevoProducto.error) return res.status(400).send(nuevoProducto.error);
  return res.json(nuevoProducto);
};

const actualizarProductoController = (req, res) => {
  const { params: { idProducto } } = req;
  const productoActualizado = productos.actualizar(req.body, idProducto);
  if (productoActualizado.error) return res.status(404).send(productoActualizado.error);
  return res.json(productoActualizado);
};

const eliminarProductoController = (req, res) => {
  const { idProducto } = req.params;
  const prodcutoEliminado = productos.eliminar(idProducto);
  if (prodcutoEliminado.error) return res.status(404).send(prodcutoEliminado.error);
  return res.json(prodcutoEliminado);
};

module.exports = {
  listarProductosController,
  listarProductosPorIdController,
  guardarProductoController,
  actualizarProductoController,
  eliminarProductoController,
};