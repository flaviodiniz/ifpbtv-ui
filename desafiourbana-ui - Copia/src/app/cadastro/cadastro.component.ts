
import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form } from '@angular/forms';
import { Perfil, Usuario } from '../models/model';
import { ToastyService } from 'ng2-toasty';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private route: ActivatedRoute, 
    private router: Router,  
    private spinner: NgxSpinnerService,
    private toasty: ToastyService,
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
      dados.forEach(element => {
        let per = new Perfil;
        per.label = element;
        per.value = element;
        this.perfis.push(per);
      });
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
    this.spinner.show();
    console.log(this.usuario)
    if(this.checarEmail(this.usuario.email)){
      if (this.editandoUsuario) {
        this.atualizarUsuario(form);
      } else {
        this.cadastrarUsuario(form);
      }
    }else{
      this.toasty.error("Formato de email inválido!");
    }
  }

  async cadastrarUsuario(form: Form) {
    await this.usuarioService.SalvarUsuario(this.usuario)
      .then(usuarioCadastrado => {
        if (usuarioCadastrado.status == 400) {
          this.toasty.error(usuarioCadastrado.error.mensagem);
        } else {
          this.toasty.success('Usuário salvo com sucesso!');
          this.router.navigate(['usuarios']);
          this.spinner.hide();
        }
      });
  }

  atualizarUsuario(form: Form) {
    this.usuarioService.atualizarUsuario(this.usuario)
      .then(usuario => {
        this.usuario = usuario;
        this.usuario = new Usuario();
        this.toasty.success('Usuário editado com sucesso!');
        this.router.navigate(['/usuarios']);          
      })
      .catch(erro =>{
        console.log(erro);
      });
  }

  checarEmail(email: string): boolean{
    let regex_validation = /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
    return regex_validation.test(email);
  }
  
}
