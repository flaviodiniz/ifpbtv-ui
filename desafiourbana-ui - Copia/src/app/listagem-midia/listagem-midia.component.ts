import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoMidia } from 'app/models/model';
import { environment } from 'environments/environment';
import { ToastyService } from 'ng2-toasty';
//import { AlertService } from 'ngx-alerts';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MidiaService } from '../services/midia.service';

@Component({
  selector: 'app-listagem-midia',
  templateUrl: './listagem-midia.component.html',
  styleUrls: ['./listagem-midia.component.css']
})
export class ListagemMidiaComponent implements OnInit {

  midias = [];
  tiposMidias = [];
  openModal: boolean = false;
  titulo: any;
  chave: any; 
  tipo: any;
  midia: any;
  file: any;
  urlUpload = `${environment.apiUrl}/upload`; 

  constructor(
    private confirmation: ConfirmationService,
    private midiaService: MidiaService,
    private router: Router,
    private toasty: ToastyService
  ) { }

  ngOnInit(): void {
    this.listarTipos();
    this.getMidias();
  }

  listarTipos() {
    this.midiaService.getTiposMidia().then(dados => {
      dados.forEach(element => {
        let per = new TipoMidia;
        per.label = element;
        per.value = element;
        this.tiposMidias.push(per);
      });
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

  limpar() {
    this.titulo = ''; 
    this.tipo = ''; 
    this.chave = '';
  }

  confirmarExclusao(midia: any){
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(midia);
      }
    });
  }

  excluir(midia: any) {
    this.midiaService.excluir(midia.id)
      .then(() => {
        this.toasty.success('Mídia excluida com sucesso!'); 
        window.location.reload();
      })
      .catch((erro: any) => console.log(erro));
  }

  abrirModal(midia:any){
    this.midia = midia.id;
    this.openModal = true;
  }

  fecharModal(){
    this.openModal = false;
  }

  get urlAnexo(): string {
    return (
      this.urlUpload + `/` +
      this.midia
    );
  }

  onUpload(event: any) {
    for (let filee of event.files) {
      this.file = filee;
      console.log(this.file);
      location.reload();
    }
this.toasty.success('Arquivo salvo com sucesso!');
  }
}
