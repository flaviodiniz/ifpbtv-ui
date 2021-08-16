import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { TV } from '../models/model';
import { TvService } from '../services/tv.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-listagem-tv',
  templateUrl: './listagem-tv.component.html',
  styleUrls: ['./listagem-tv.component.css']
})
export class ListagemTvComponent implements OnInit {

  tv = new TV();
  tvs = [];
  local: any; 

  constructor(
    private confirmation: ConfirmationService,
    private router: Router,
    private tvService : TvService,
    private toasty: ToastyService,
    private spinner: NgxSpinnerService
  ) { }

  async ngOnInit(): Promise<void> {
    this.spinner.show();
    await this.getTvs();
   
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
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
   this.router.navigate(['tvs/nova']);   
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
    this.spinner.show();
    this.tvService.excluir(tv.id)
      .then(() => {
        this.toasty.success('Tv excluída com sucesso!'); 
        window.location.reload();
      })
      .catch((erro: any) => console.log(erro));
  }

}
