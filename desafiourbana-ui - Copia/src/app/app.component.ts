import { Component } from '@angular/core';
import { tokenKey } from '@angular/core/src/view';
import { Router } from '@angular/router';
import { ToastyConfig } from 'ng2-toasty';
import { AuthService } from './seguranca/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private toastyConfig: ToastyConfig,
    private router: Router,
    private authService: AuthService) {
    this.toastyConfig.theme = 'bootstrap';
    
  }

  exibindoMenu() {
    const url = this.router.url;
    if(url.includes('/redefinir-senha') || url.includes('/confirmacao') || url.includes('/questionario/satisfacao') || url.includes('/questionario/perfilhamento') || url.includes('/manipulacao')){
      return false;
    }
    return url !== '/login' && url !== '/pagina-nao-encontrada';
  }

}
