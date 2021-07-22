import { PaginaNaoTrocadaComponent } from './pagina-ne/pagina-nao-trocada/pagina-nao-trocada.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login/login.component';
import { NaoAutorizadoComponent } from './pagina-ne/nao-autorizado/nao-autorizado.component';
import { MidiaComponent } from './midia/midia.component';
import { ListagemMidiaComponent } from './listagem-midia/listagem-midia.component';
import { TvComponent } from './tv/tv.component';
import { ListagemTvComponent } from './listagem-tv/listagem-tv.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListagemUsuarioComponent } from './listagem-usuario/listagem-usuario.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'midia/nova' , component: MidiaComponent},
  { path: 'midia/:id' , component: MidiaComponent},
  { path: 'midias' , component: ListagemMidiaComponent},
  { path: 'tv/nova' , component: TvComponent},
  { path: 'tv/:id' , component: TvComponent},
  { path: 'tvs' , component: ListagemTvComponent},
  { path: 'usuario/novo', component: CadastroComponent },
  { path: 'usuario/:id' , component: CadastroComponent},
  { path: 'usuarios' , component: ListagemUsuarioComponent},

  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoTrocadaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
