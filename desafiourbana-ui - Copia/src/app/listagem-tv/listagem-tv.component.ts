import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { AlertService } from 'ngx-alerts';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { TV } from '../models/model';
import { TvService } from '../services/tv.service';

@Component({
  selector: 'app-listagem-tv',
  templateUrl: './listagem-tv.component.html',
  styleUrls: ['./listagem-tv.component.css']
})
export class ListagemTvComponent implements OnInit {

  tv = new TV();
  tvs: any;
  local: any; 

  constructor(
    //private alertService: AlertService,
    private confirmation: ConfirmationService,
    private router: Router,
    private tvService : TvService,
  ) { }

  ngOnInit(): void {
    this.getTvs();
  }

  getTvs() {
    if (this.local == null || this.local == '') {
      this.local = undefined;
    }
    
    this.tvService.getTvs(this.local).then(dados => {
      this.tvs = dados;
    });
  }

  limpar() {
    this.local = ''; 
  }

  goToTvNovo() {
    this.router.navigate(['tv/nova']);   
  }

  confirmarExclusao(tv: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(tv);
      }
    });
  }

  excluir(tv: any) {
    this.tvService.excluir(tv.id)
      .then(() => {
        //this.alertService.success('Tv excluida com sucesso!'); 
        window.location.reload();
      })
      .catch((erro: any) => console.log(erro));
  }

}
