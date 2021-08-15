import { Component, OnInit } from '@angular/core';
import { TV } from 'app/models/model';
import { AuthService } from 'app/seguranca/auth.service';
import { ProgramacaoService } from 'app/services/programacao.service';
import { TvService } from 'app/services/tv.service';

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

  constructor(
    private auth: AuthService,
    private programacaoService: ProgramacaoService,  
    private tvService : TvService,
  ) { }

  ngOnInit() {
    this.getTvs();
    this.getProgramacoesParaGrade(this.auth.jwtPayload.id);
    console.log(this.tvs);
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
    await this.getProgramacoesGrade(this.tv);
  }

  getProgramacoesGrade(id: any){
    this.programacaoService.getProgramacoesGrade(id).then(dados => {
      console.log(dados);
      this.grade.programacoes = dados;
    });
  }

  getProgramacoesParaGrade(id: any){
    this.programacaoService.getProgramacoesParaGrade(id).then(dados => {
      console.log(dados);
      this.programacoes = dados;
    });
  }

}
