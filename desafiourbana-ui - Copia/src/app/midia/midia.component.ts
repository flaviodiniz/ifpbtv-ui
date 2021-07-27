import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
//import { AlertService } from 'ngx-alerts';
import { Chave, Disponibilidade, Midia, TipoMidia, Usuario } from '../models/model';
import { MidiaService } from '../services/midia.service';


@Component({
  selector: 'app-midia',
  templateUrl: './midia.component.html',
  styleUrls: ['./midia.component.css']
})
export class MidiaComponent implements OnInit {
  
  tiposMidias = [];
  chaves = [];
  disponibilidade = [];
  chavesSelecionadas: Chave[];
  midia = new Midia();

  chave = Chave;
  tipoMidia = TipoMidia;
  dpnibilidade = Disponibilidade;

  constructor (
    private route: ActivatedRoute, 
    private toasty: ToastyService,
    private midiaService: MidiaService,
    private router: Router 
  ) { }

  async ngOnInit(): Promise<void> {
    this.chave = null;
    this.tipoMidia = null;
    this.dpnibilidade = null;
    await this.listarTipos();
    await this.listarDisponibilidade();
    await this.listarChaves();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.buscarMidia(id);
    }
  }

  buscarMidia(id: number) {
    this.midiaService.buscarPorCodigo(id)
    .then(midia => {
      this.midia = midia;
    })
    .catch(erro =>{
    //  console.log(erro);
    });
  }
  
  listarTipos(){
    this.midiaService.getTiposMidia().then(dados => {
      dados.forEach(element => {
        let tmid = new TipoMidia;
        tmid.label = element;
        tmid.value = element;
        this.tiposMidias.push(tmid);
      });
    });
  }

  listarDisponibilidade(){
    this.midiaService.getDisponibilidadeMidia().then(dados => {
      dados.forEach(element => {
      let disp = new Disponibilidade;
      disp.label = element;
      disp.value = element;
      this.disponibilidade.push(disp);
    });     
    });
  }

  listarChaves(){
    this.midiaService.getChaves().then(dados => {
      console.log(dados);
    //  this.chaves = dados;
      dados.forEach(element => {
        let cha = new Chave;
        cha.id = element;
        cha.chave = element;
        this.chaves.push(cha);
      });
    });
  }

  get editandoMidia() {
    return Boolean(this.midia.id)
  }

  salvar(form: Form) {
    if (this.editandoMidia) {
      this.atualizarMidia(form);
    } else {
      this.cadastrarMidia(form);
    }
  }

  async cadastrarMidia(form: Form) {
    let usuario = new Usuario();
    usuario.id = 1;//deixar por enquanto que não tem usuario do login
    this.midia.usuario = usuario;
    this.midia.chaves = this.chavesSelecionadas;
    // this.midia.chaves.forEach(element => {
    //   console.log(element);
    // });
    console.log(this.midia)
    await this.midiaService.SalvarMidia(this.midia)
      .then(midiaCadastrado => {
        if (midiaCadastrado.status == 400) {
          this.toasty.error(midiaCadastrado.error.mensagem);
        } else {
          this.toasty.success('Mídia salva com sucesso!');
          this.router.navigate(['midias']);
        }
      });
  }

  atualizarMidia(form: Form) {
    this.midiaService.atualizarMidia(this.midia)
      .then(midia => {
        this.midia = midia;
        this.midia = new Midia();
        this.toasty.success('Usuário editado com sucesso!');
        this.router.navigate(['midias']);          
      })
      .catch(erro =>{
        console.log(erro);
      });
  }

}
