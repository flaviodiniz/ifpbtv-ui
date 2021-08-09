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
  tvs = [];

  constructor(
    private tvService : TvService,
  ) { }

  ngOnInit() {
    this.getTvs();
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
        tv.value = element.local;
        this.tvs.push(tv);
      });
    });
  }

}
