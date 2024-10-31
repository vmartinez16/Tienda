import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit {
  nombreUsuario: string = '';
  nombreTienda: string = '';
  imagenUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Esta llamada no es necesaria aquí si usamos ionViewWillEnter
  }

  ionViewWillEnter() {
    this.cargarDatosUsuarioActivo(); // Cargar los datos cada vez que se entra al lobby
  }

  cargarDatosUsuarioActivo() {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo') || '{}');
    
    if (usuarioActivo) {
      this.nombreUsuario = usuarioActivo.nombre;
      this.nombreTienda = usuarioActivo.nombreTienda;
      this.imagenUrl = usuarioActivo.imagenUrl;
    }
  }

  irAClientes() {
    this.router.navigate(['/clientes']);
  }

  irAProductos() {
    this.router.navigate(['/home']);
  }

}
