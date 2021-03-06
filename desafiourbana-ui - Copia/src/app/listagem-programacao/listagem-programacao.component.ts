import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoProgramacao } from 'app/models/model';
import { MidiaService } from 'app/services/midia.service';
import { ProgramacaoService } from 'app/services/programacao.service';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/primeng';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from 'app/seguranca/auth.service';

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
  programacoes3 = []; 
  display: boolean = false;
  midias = [];

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toasty: ToastyService,
    private programacaoService: ProgramacaoService,    
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService
  ) { }

  async ngOnInit() {
    this.spinner.show();
    await this.listarTipos();
    await this.getProgramacoes();
    
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  getProgramacoes() {
    if (this.titulo == null || this.titulo == '') {
      this.titulo = undefined;
    }
    if (this.programacao == null || this.programacao == '') {
      this.programacao = undefined;
    }
    this.programacaoService.getProgramacoes(this.titulo, this.programacao, this.auth.jwtPayload.id).then(dados => {
      // console.log(dados)
      this.programacoes = dados;
    });
  }

  getProgramacoes2() {
    this.programacaoService.getProgramacoesSemFiltro().then(dados => {
      // console.log(dados)
      this.programacoes = dados;
    });
  }

  getProgramacoes3(id: any) {
    this.programacaoService.getImagensDaProgramacao(id).then(dados => {
      console.log("Programa????o fetch m??dias e uploads")
      this.programacoes3 = dados;
     console.log(this.programacoes3);
    });
    this.display = true;
  }

  recuperarImagem(imagem: any): any {    
    var retrievedImage = null;       
    this.retrieveResonse = imagem;
    this.base64Data = this.retrieveResonse;
    retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;       
    return retrievedImage;
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
    this.spinner.show();
    this.programacaoService.excluir(programacao.id)
      .then(() => {
        this.toasty.success('Programa????o exclu??da com sucesso!'); 
        window.location.reload();
      })
      .catch((erro: any) => console.log(erro));
  }

  limpar(){
    this.programacao = null;
    this.titulo = '';
  }
}
