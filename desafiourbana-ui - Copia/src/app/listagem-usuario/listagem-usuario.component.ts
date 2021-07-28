import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/seguranca/auth.service';
import { ToastyService } from 'ng2-toasty';
//import { AlertService } from 'ngx-alerts';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Perfil, Usuario } from '../models/model';
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
  perfil: Perfil;

  constructor(
    private auth: AuthService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private router: Router,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.perfil = null;
    this.getPerfis();
    this.getUsuarios();
  }

  getPerfis() {
    this.usuarioService.getPerfis().then(dados => {
      dados.forEach(element => {
        let per = new Perfil;
        per.label = element;
        per.value = element;
        this.perfis.push(per);
      });
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
      this.usuarios = dados;
    });
  }

  limpar() {
    this.nome = ''; 
    this.matricula = ''; 
    this.perfil = null;
  }

  goToUsuarioNovo() {
    this.router.navigate(['usuarios/novo']);
  }

  confirmarExclusao(usuario: any) {
    console.log(usuario, this.auth.jwtPayload);
    if(usuario.id == this.auth.jwtPayload.id){
      this.toasty.error("Você não pode se alto excluir! Solicite a outro usuário administrador.")
    } else {
      this.confirmation.confirm({
        message: 'Tem certeza que deseja excluir?',
        accept: () => {
          this.excluir(usuario);
        }
      });
    }
  }

  excluir(usuario: any) {
    this.usuarioService.excluir(usuario.id)
      .then(() => {
        this.toasty.success('Usuário excluido com sucesso!'); 
        window.location.reload();
      })
      .catch((erro: any) => console.log(erro));
  }
  
}
