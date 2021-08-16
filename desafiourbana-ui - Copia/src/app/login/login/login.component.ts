import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErroHandlerService } from 'app/core/erro-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService,
    private errorHandler: ErroHandlerService,
    private router: Router,
    private spinner: NgxSpinnerService,
    ) { }

  login(usuario: string, senha: string) {
    this.spinner.show();
    this.auth.login(usuario, senha)
      .then(() => {
        console.log('LOGIN REALIZADO COM SUCESSO')
        this.router.navigate(['/grade']);
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    }

}
