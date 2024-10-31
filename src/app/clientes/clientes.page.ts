import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage  {
  cliente = {
    id: 0,
    nombre: '',
    direccion: '',
    telefono: null,
    correo: null,
    imagenUrl: ''
  };
  clientes: any[] = [];
  isEditing = false;
  editingIndex: number | null = null;

  constructor() {
    this.cargarClientes();
  }
  cargarClientes() {
    const clientesLocal = localStorage.getItem('clientes');
    if (clientesLocal) {
      this.clientes = JSON.parse(clientesLocal);
    }
  }

  generarIdUnico() {
    return this.clientes.length > 0
      ? Math.max(...this.clientes.map(p => p.id)) + 1
      : 1;
  }

  eliminarCliente(i:number) {
    this.clientes.splice(i, 1);
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
    // Limpiar el formulario
    this.limpiarFormulario()
  }
  editarCliente(){
    if (this.editingIndex !== null) {
      // Editar el cliente en el índice seleccionado
      this.clientes[this.editingIndex] = { ...this.cliente };
      this.isEditing = false;
      this.editingIndex = null;
      this.limpiarFormulario();
    }
  }
  seleccionarCliente(index: number) {
    // Llenar los inputs con los datos del producto seleccionado
    const clienteSeleccionado = this.clientes[index];
    this.cliente = { ...clienteSeleccionado };
    this.isEditing = true;
    this.editingIndex = index;
  }

  agregarCliente() {
    if (this.isEditing) {
      this.editarCliente();
    } else {
    if (this.cliente.nombre && this.cliente.direccion && this.cliente.telefono && this.cliente.correo && this.cliente.imagenUrl) {
      this.cliente.id = this.generarIdUnico();
      this.clientes.push({ ...this.cliente });
      let clientesLocal = localStorage.getItem('clientes');
      if (clientesLocal) {
        let clientes = JSON.parse(clientesLocal);
        clientes.push({ ...this.cliente });
        localStorage.setItem('clientes', JSON.stringify(clientes));
      } else {
        localStorage.setItem('clientes', JSON.stringify(this.clientes));
      
    }
    // Limpiar el formulario
    this.limpiarFormulario();
  }
  }
}
limpiarFormulario() {
  this.cliente = {
    id: 0,
    nombre: '',
    direccion: '',
    telefono: null,
    correo: null,
    imagenUrl: ''
  };
  this.isEditing = false;
  this.editingIndex = null;
}
}


