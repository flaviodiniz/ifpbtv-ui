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
import { ListagemProgramacaoComponent } from './listagem-programacao/listagem-programacao.component';
import { ProgramacaoComponent } from './programacao/programacao.component';
import { GradeComponent } from './grade/grade.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'programacao', children:[
    { path: '', component: ListagemProgramacaoComponent},
    { path: ':id', component: ProgramacaoComponent},
    { path: 'novo', component: ProgramacaoComponent}
  ]},
  { path: 'midias' , children: [
    { path: '' , component: ListagemMidiaComponent},
    { path: ':id', component: MidiaComponent }, 
    { path: 'nova', component: MidiaComponent }
  ]},
  { path: 'tvs' , children: [
    { path: '' , component: ListagemTvComponent },
    { path: ':id' , component: TvComponent},
    { path: 'nova' , component: TvComponent},
  ]},
  
  { path: 'usuarios' , children: [
    { path: '' , component: ListagemUsuarioComponent },
    { path: 'novo', component: CadastroComponent },
    { path: ':id' , component: CadastroComponent},
  ]},
  { path: 'grade', component: GradeComponent },
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
