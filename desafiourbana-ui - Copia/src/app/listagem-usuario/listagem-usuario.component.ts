import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { AlertService } from 'ngx-alerts';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Usuario } from '../models/model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-listagem-usuario',
  templateUrl: './listagem-usuario.component.html',
  styleUrls: ['./listagem-usuario.component.css']
})
export class ListagemUsuarioComponent implements OnInit {
  perfis = [];
  ativoSelecionado = '';
  usuario = new Usuario();
  usuarios: any;
  nome: any; 
  matricula: any; 
  perfil: any;

  constructor(
    //private alertService: AlertService,
    private confirmation: ConfirmationService,
    private router: Router,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.getPerfis();
    this.getUsuarios();
  }

  getPerfis() {
    this.usuarioService.getPerfis().then(dados => {
      console.log(dados);
      this.perfis = dados;
    });
  }

  getUsuarios() {
    if (this.nome == null || this.nome == '') {
      this.nome = undefined;
    }
    if (this.matricula == null || this.matricula == '') {
      this.matricula = undefined;
    }
    if (this.perfil == null || this.perfil == '') {
      this.perfil = undefined;
    }
    this.usuarioService.getUsuarios(this.nome, this.matricula, this.perfil).then(dados => {
      console.log(dados);
      this.usuarios = dados;
    });
  }

  limpar() {
    this.nome = ''; 
    this.matricula = ''; 
    this.perfil = '';
  }

  goToUsuarioNovo() {
    this.router.navigate(['usuario/novo']);
  }

  confirmarExclusao(usuario: any) {
    console.log(usuario);

    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(usuario);
      }
    });
  }

  excluir(usuario: any) {
    this.usuarioService.excluir(usuario.id)
      .then(() => {
        //this.alertService.success('Usuário excluido com sucesso!'); 
        window.location.reload();
      })
      .catch((erro: any) => console.log(erro));
  }


  
}
