
import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormControl } from '@angular/forms';
import { Usuario } from '../models/model';
import { ToastyService } from 'ng2-toasty';
//import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  perfis = [];
  ativoSelecionado = '';
  usuario = new Usuario();

  constructor(
    //private alertService: AlertService,
    private route: ActivatedRoute, 
    private router: Router,  
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.getPerfis();
    const idUsuario = this.route.snapshot.params['id'];

    if (idUsuario) {
      this.buscarUsuario(idUsuario);
    }
  }

  getPerfis() {
    this.usuarioService.getPerfis().then(dados => {
      console.log(dados);
      this.perfis = dados;
    });
  }

  buscarUsuario(codigo: number) {
    this.usuarioService.buscarPorCodigo(codigo)
    .then(usuario => {
      console.log(usuario);
      this.usuario = usuario;
    })
    .catch(erro =>{
      console.log(erro);
    });
  }

  get editandoUsuario() {
    return Boolean(this.usuario.id)
  }

  salvar(form: Form) {
      if (this.editandoUsuario) {
        this.atualizarUsuario(form);
      } else {
        this.cadastrarUsuario(form);
      }
  }

  async cadastrarUsuario(form: Form) {
    await this.usuarioService.SalvarUsuario(this.usuario)
      .then(usuarioCadastrado => {
        if (usuarioCadastrado.status == 400) {
          //this.alertService.danger(usuarioCadastrado.error.mensagem);
        } else {
          //this.alertService.success('Usuário salvo com sucesso!');
          this.router.navigate(['usuarios']);
        }
      });
  }

  atualizarUsuario(form: Form) {
    this.usuarioService.atualizarUsuario(this.usuario)
      .then(usuario => {
        this.usuario = usuario;
        this.usuario = new Usuario();
        //this.alertService.success('Usuário editado com sucesso!');
        this.router.navigate(['tvs']);          
      })
      .catch(erro =>{
        console.log(erro);
      });
  }
}
