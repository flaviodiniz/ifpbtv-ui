import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErroHandlerService } from 'app/core/erro-handler.service';
import { LogoutService } from 'app/seguranca/logout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private logoutService: LogoutService,
    private errorHandler: ErroHandlerService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}
