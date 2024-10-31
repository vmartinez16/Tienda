import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    cantidad: null,
    precioCosto: null,
    precioVenta: null,
    imagenUrl: ''
  };

  productos: any[] = [];
  isEditing = false;
  editingIndex: number | null = null;

  constructor() {
    this.cargarProductos();
  }

  cargarProductos() {
    const productosLocal = localStorage.getItem('productos');
    if (productosLocal) {
      this.productos = JSON.parse(productosLocal);
    }
  }

  generarIdUnico() {
    return this.productos.length > 0
      ? Math.max(...this.productos.map(p => p.id)) + 1
      : 1;
  }

  eliminarProducto(i: number) {
    this.productos.splice(i, 1);
    localStorage.setItem('productos', JSON.stringify(this.productos));
    this.limpiarFormulario();
  }

  editarProducto() {
    if (this.editingIndex !== null) {
      this.productos[this.editingIndex] = { ...this.producto };
      localStorage.setItem('productos', JSON.stringify(this.productos));
      this.isEditing = false;
      this.editingIndex = null;
      this.limpiarFormulario();
    }
  }

  seleccionarProducto(index: number) {
    const productoSeleccionado = this.productos[index];
    this.producto = { ...productoSeleccionado };
    this.isEditing = true;
    this.editingIndex = index;
  }

  agregarProducto() {
    if (this.isEditing) {
      this.editarProducto();
    } else {
      if (this.producto.nombre && this.producto.descripcion && this.producto.cantidad && this.producto.precioCosto && this.producto.precioVenta && this.producto.imagenUrl) {
        this.producto.id = this.generarIdUnico();
        this.productos.push({ ...this.producto });
        localStorage.setItem('productos', JSON.stringify(this.productos));
        //this.limpiarFormulario();
      }
    }
  }

  limpiarFormulario() {
    this.producto = {
      id: 0,
      nombre: '',
      descripcion: '',
      cantidad: null,
      precioCosto: null,
      precioVenta: null,
      imagenUrl: ''
    };
    this.isEditing = false;
    this.editingIndex = null;
  }
}
