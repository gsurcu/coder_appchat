const { productos } = require("../../data/data");

class ProductosApi {
  constructor() {
    this.productos = [];
    this.load()
  }
  static idCount = 0;

  load() {
    try {
      const load = async () => {
        this.productos = await productos;
      };
      load();
    } catch (error) {
      console.log(error.message);
      this.productos = [];
    }
  }

  listarTodos() {
    return [...this.productos];
  };

  listarPorId(id) {
    const producto = this.productos.find(prod => prod.id === +id);
    return producto || { error: `Producto con id ${id} no encontrado!` };
  };

  guardar(prod) {
    const { nombre, descripcion, precio, imagen } = prod;
    console.log(prod)
    if (!nombre || !imagen || !precio ) return { error: 'nombre, url y precio son campos obligatorios' };
    const nuevoProducto = { ...prod, id: ++ProductosApi.idCount };
    this.productos.push(nuevoProducto);
    return nuevoProducto;
  };

  actualizar(prod, id) {
    const indice = this.productos.findIndex(prod => prod.id === +id);
    if (indice < 0) return { error: `Producto con id ${id} no encontrado!` };
    this.productos[indice] = { id: +id, ...prod };
    return this.productos[indice];
  };

  eliminar(id) {
    const indice = this.productos.findIndex(prod => prod.id === +id);
    if (indice < 0) return { error: `Producto con id ${id} no encontrado!` };
    return this.productos.splice(indice, 1);
  }
}

module.exports = ProductosApi;