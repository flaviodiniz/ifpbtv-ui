import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErroHandlerService } from 'app/core/erro-handler.service';
import { AuthService } from 'app/seguranca/auth.service';
import { LogoutService } from 'app/seguranca/logout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuarioComum = false;

  constructor(
    private auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErroHandlerService,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.auth);
    if ((this.auth.hasOwnProperty("jwtPayload")) && (!!this.auth.jwtPayload)){
      if(this.auth.jwtPayload.authorities != undefined){
        this.usuarioComum = true;
      }
    }
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}
