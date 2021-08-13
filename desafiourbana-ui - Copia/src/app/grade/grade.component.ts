import { Component, OnInit } from '@angular/core';
import { TV } from 'app/models/model';
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

  constructor(
    private tvService : TvService,
  ) { }

  ngOnInit() {
    this.getTvs();
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
      console.log(dados);
    });
  }

  buscar(){
    console.log(this.tv);
    this.getGradeTv(this.tv);
  }

}
