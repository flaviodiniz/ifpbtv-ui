import { Component, OnInit } from '@angular/core';
import { TV } from 'app/models/model';
import { AuthService } from 'app/seguranca/auth.service';
import { ProgramacaoService } from 'app/services/programacao.service';
import { TvService } from 'app/services/tv.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  local;
  grade;
  tvs = [];
  tv = new TV;
  grades = [];
  programacoes = [];
  programacoesSelecionadas = [];
  displayAdd: boolean = false;

  constructor(
    private auth: AuthService,
    private programacaoService: ProgramacaoService, 
    private spinner: NgxSpinnerService, 
    private tvService : TvService,
  ) { }

  async ngOnInit() {
    this.spinner.show();
    await this.getTvs();
    await this.getProgramacoesDoUsuarioLogado(this.auth.jwtPayload.id);
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  getTvs() {
    if (this.local == null || this.local == '') {
      this.local = undefined;
    }
    
    this.tvService.getTvs(this.local).then(dados => {
      dados.forEach(element => {
        let tv = new TV;
        tv = element;
        tv.label = element.local;
        tv.value = element.gradeProgramacao;
        this.tvs.push(tv);
      });
    });
  }

  getGradeTv(id: any){
    this.tvService.getGradeTv(id).then(dados => {
      this.grade = dados;
      console.log(this.grade);
      this.grades.push(this.grade);
    });
  }

  async buscar(){
    console.log(this.tv);
    await this.getGradeTv(this.tv);
    await this.getProgramacoesDaGradeDaTVSelecionada(this.tv);
  }

  getProgramacoesDaGradeDaTVSelecionada(idTV: any){
    this.programacaoService.getProgramacoesDaGradeDaTVSelecionada(this.tv).then(dados => {
    //  console.log(dados);
      this.grade.programacoes = dados;
    });
  }

  getProgramacoesDoUsuarioLogado(idUsuario: any){
    this.programacaoService.getProgramacoesDoUsuarioLogado(idUsuario).then(dados => {
      console.log(dados);
      this.programacoes = dados;
    });
  }

  adicionarProgramacao(programacao: any){
    this.programacoesSelecionadas.push(programacao);
  }

  showDialogAdd(){
    this.displayAdd = true;
    this.getProgramacoesDoUsuarioLogado(this.auth.jwtPayload.id);
  }

}
