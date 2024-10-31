// login.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { RegistroPage } from '../registro/registro.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario = '';
  contrasena = '';
  recordar = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.cargarCredenciales();
  }

  cargarCredenciales() {
    const credenciales = localStorage.getItem('credenciales');
    if (credenciales) {
      const { usuario, contrasena } = JSON.parse(credenciales);
      this.usuario = usuario;
      this.contrasena = contrasena;
      this.recordar = true;
    }
  }

  async iniciarSesion() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioValido = usuarios.find(
      (user: any) => user.usuario === this.usuario && user.contrasena === this.contrasena
    );
  
    if (usuarioValido) {
      if (this.recordar) {
        localStorage.setItem('credenciales', JSON.stringify({ usuario: this.usuario, contrasena: this.contrasena }));
      } else {
        localStorage.removeItem('credenciales');
      }
  
      // Almacenar el objeto completo de usuario como usuarioActivo
      localStorage.setItem('usuarioActivo', JSON.stringify(usuarioValido)); 
  
      this.router.navigate(['/lobby']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async abrirRegistro() {
    const modal = await this.modalController.create({
      component: RegistroPage,
    });
    return await modal.present();
  }
}
