import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Http, RequestOptions } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';

import { ToastyModule } from 'ng2-toasty';
import { JwtHelper, AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login/login.component';

import { AuthGuard } from './seguranca/auth.guard';
import { AuthService } from './seguranca/auth.service';
import { LogoutService } from './seguranca/logout.service';
import { UrbanaHttp } from './seguranca/urbana-http';

import { PaginaNaoTrocadaComponent } from './pagina-ne/pagina-nao-trocada/pagina-nao-trocada.component';
import { NaoAutorizadoComponent } from './pagina-ne/nao-autorizado/nao-autorizado.component';
import { ErroHandlerService } from './core/erro-handler.service';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListagemMidiaComponent } from './listagem-midia/listagem-midia.component';
import { ListagemTvComponent } from './listagem-tv/listagem-tv.component';
import { ListagemUsuarioComponent } from './listagem-usuario/listagem-usuario.component';
import { MenuComponent } from './menu/menu.component';
import { MidiaComponent } from './midia/midia.component';
import { TvComponent } from './tv/tv.component';
import { UsuarioService } from './services/usuario.service';
import { TvService } from './services/tv.service';
import { MidiaService } from './services/midia.service';

export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      { 'Content-Type': 'application/json' }
    ]
  });

  return new UrbanaHttp(auth, config, http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    MessageComponent,
    LoginComponent,
    ListagemMidiaComponent,
    ListagemTvComponent,
    ListagemUsuarioComponent,
    PaginaNaoTrocadaComponent,
    MenuComponent,
    MidiaComponent,
    NaoAutorizadoComponent,
    TvComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    DropdownModule,
    AppRoutingModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule
  ],
  providers: [ConfirmationService, 
    ErroHandlerService, AuthService, JwtHelper, AuthGuard, LogoutService,
    MidiaService, TvService, UsuarioService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [AuthService, Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
