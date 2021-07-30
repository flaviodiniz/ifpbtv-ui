import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramacaoService } from 'app/services/programacao.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-listagem-programacao',
  templateUrl: './listagem-programacao.component.html',
  styleUrls: ['./listagem-programacao.component.css']
})
export class ListagemProgramacaoComponent implements OnInit {

  titulo: any;
  tiposMidias = [];
  programacoes: any;

  constructor(
    private router: Router,
    private toasty: ToastyService,
    private programacaoService: ProgramacaoService
  ) { }

  ngOnInit() {
    this.getProgramacoes();
  }

  getProgramacoes() {
    this.programacaoService.getProgramacoes().then(dados => {
      console.log(dados)
      this.programacoes = dados;
    });
  }

}
