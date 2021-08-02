import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Programacao } from 'app/models/model';
import { AuthService } from 'app/seguranca/auth.service';
import { ProgramacaoService } from 'app/services/programacao.service';
import { ToastyService } from 'ng2-toasty';
import { TipoProgramacao } from 'app/models/model';
import { Form } from '@angular/forms';
import { MidiaService } from 'app/services/midia.service';
import { ThrowStmt } from '@angular/compiler';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-programacao',
  templateUrl: './programacao.component.html',
  styleUrls: ['./programacao.component.css']
})

export class ProgramacaoComponent implements OnInit {

  programacao = new Programacao();
  tiposProgramacao = [];
  midias = [];
  midiasSelecionadas = [];
  display: Boolean = false;
  titulo: any;
  chave: any; 
  tipo: any;
  
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute, 
    private toasty: ToastyService,
    private programacaoService: ProgramacaoService,
    private router: Router,
    private midiaService: MidiaService, 
    private confirmation: ConfirmationService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if(id){
      this.buscarPorId(id);
    }
    this.listarTipos();
    this.getMidias()
  }

  get editandoProgramacao() {
    return Boolean(this.programacao.id);
  }

  buscarPorId(id: number) {
    this.programacaoService.buscarPorId(id)
    .then(prog => {
      this.programacao = prog;
    })
    .catch(erro =>{
    //  console.log(erro);
    });
  }
  
  showDialog() {
    this.display = true;
  }

  listarTipos() {
    this.programacaoService.getTiposProgramacao().then(dados => {
      dados.forEach(element => {
        let per = new TipoProgramacao;
        per.label = element;
        per.value = element;
        this.tiposProgramacao.push(per);
      });
    });
  }

  salvar(form: Form) {
    if (this.editandoProgramacao) {
      this.atualizarProgramacao(form);
    } else {
      console.log(this.programacao)
      this.cadastrarProgramacao(form);
    }
  }

  async cadastrarProgramacao(form: Form) {  
    this.programacao.playlist = this.midiasSelecionadas;  
    await this.programacaoService.salvarProgramacao(this.programacao)
      .then(programacaoCadastrada => {
        if (programacaoCadastrada.status == 400) {
          this.toasty.error(programacaoCadastrada.error.mensagem);
        } else {
          this.toasty.success('Programação salva com sucesso!');
          this.router.navigate(['programacao']);
        }
      });
  }

  atualizarProgramacao(form: Form) {
    this.programacao.playlist = this.midiasSelecionadas; 
    this.programacaoService.atualizarProgramacao(this.programacao)
      .then(programacao => {
        this.programacao = programacao;
        this.programacao = new Programacao();
        this.toasty.success('Programação editada com sucesso!');
        this.router.navigate(['programacao']);          
      })
      .catch(erro =>{
        console.log(erro);
      });
  }

  getMidias() {
    if (this.titulo == null || this.titulo == '') {
      this.titulo = undefined;
    }
    if (this.chave == null || this.chave == '') {
      this.chave = undefined;
    }
    if (this.tipo == null || this.tipo == '') {
      this.tipo = undefined;
    }
    this.midiaService.getMidias(this.titulo, this.chave, this.tipo)
    .then(dados => {
      this.midias = dados;
    });
  }

  goToMidiaNova(){
    this.router.navigate(['midias/nova']);
  }

  adicionarMidia(midia: any){
    this.midiasSelecionadas.push(midia);
    this.toasty.success("Mídia selecionada");
  }

}
