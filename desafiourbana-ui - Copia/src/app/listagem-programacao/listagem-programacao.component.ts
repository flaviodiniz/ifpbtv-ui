import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoProgramacao } from 'app/models/model';
import { ProgramacaoService } from 'app/services/programacao.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-listagem-programacao',
  templateUrl: './listagem-programacao.component.html',
  styleUrls: ['./listagem-programacao.component.css']
})
export class ListagemProgramacaoComponent implements OnInit {

  titulo: any;
  programacao: any;
  tiposProgramacao = [];
  programacoes: any;

  constructor(
    private router: Router,
    private toasty: ToastyService,
    private programacaoService: ProgramacaoService,    
    private confirmation: ConfirmationService
  ) { }

  ngOnInit() {
    this.getProgramacoes();
    this.listarTipos();
  }

  getProgramacoes() {
    if (this.titulo == null || this.titulo == '') {
      this.titulo = undefined;
    }
    if (this.programacao == null || this.programacao == '') {
      this.programacao = undefined;
    }
    this.programacaoService.getProgramacoes(this.titulo, this.programacao).then(dados => {
      console.log(dados)
      this.programacoes = dados;
    });
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

  goToTvNovo(){
    this.router.navigate(['/programacao/novo']);
  }

  confirmarExclusao(programacao: any){
    console.log(programacao)
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(programacao);
      }
    });
  }

  excluir(programacao: any) {
    this.programacaoService.excluir(programacao.id)
      .then(() => {
        this.toasty.success('Programação excluida com sucesso!'); 
        window.location.reload();
      })
      .catch((erro: any) => console.log(erro));
  }
}
