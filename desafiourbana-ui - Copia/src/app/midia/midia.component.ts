import { Component, OnInit } from '@angular/core';
import { Headers, RequestOptions} from '@angular/http';
import { Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/seguranca/auth.service';
import { ToastyService } from 'ng2-toasty';
import { Chave, Disponibilidade, Midia, TipoMidia, Usuario } from '../models/model';
import { MidiaService } from '../services/midia.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-midia',
  templateUrl: './midia.component.html',
  styleUrls: ['./midia.component.css']
})
export class MidiaComponent implements OnInit {
  
  tiposMidias = [];
  chaves = [];
  disponibilidade = [];
  display: boolean = false;
  midiaId;
  selectedFile;
  file: any;
  chavesSelecionadas: Chave[];
  midia = new Midia();

  chave = Chave;
  tipoMidia = TipoMidia;
  dpnibilidade = Disponibilidade;

  constructor (
    private auth: AuthService,
    private route: ActivatedRoute, 
    private toasty: ToastyService,
    private midiaService: MidiaService,
    private spinner: NgxSpinnerService,
    private router: Router 
  ) { }

  async ngOnInit(): Promise<void> {
    this.spinner.show();
    this.chave = null;
    this.tipoMidia = null;
    this.dpnibilidade = null;
    await this.listarTipos();
    await this.listarDisponibilidade();
    await this.listarChaves();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.buscarMidia(id);
    }

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  buscarMidia(id: number) {
    this.midiaService.buscarPorCodigo(id)
    .then(midia => {
      this.midia = midia;
    })
    .catch(erro =>{
    //  console.log(erro);
    });
  }
  
  listarTipos(){
    this.midiaService.getTiposMidia().then(dados => {
      dados.forEach(element => {
        let tmid = new TipoMidia;
        tmid.label = element;
        tmid.value = element;
        this.tiposMidias.push(tmid);
      });
    });
  }

  listarDisponibilidade(){
    this.midiaService.getDisponibilidadeMidia().then(dados => {
      dados.forEach(element => {
      let disp = new Disponibilidade;
      disp.label = element;
      disp.value = element;
      this.disponibilidade.push(disp);
    });     
    });
  }

  listarChaves(){
    this.midiaService.getChaves().then(dados => {
      console.log(dados);
    //  this.chaves = dados;
      dados.forEach(element => {
        let cha = new Chave;
        cha.id = element;
        cha.chave = element;
        this.chaves.push(cha);
      });
    });
  }

  get editandoMidia() {
    return Boolean(this.midia.id)
  }

  salvar(form: Form) {
    this.spinner.show();
    if (this.editandoMidia) {
      this.atualizarMidia(form);
    } else {
      if(this.midia.tipoMidia == 'Streaming'){
        this.cadastrarMidia(form);
      } else {
        if(this.selectedFile == null){
          this.toasty.error("É necessario adicionar o arquivo!")
        } else {
          this.cadastrarMidia(form);
        }
      }
    }
  }

  async cadastrarMidia(form: Form) {
    let usuario = new Usuario();
    usuario.id = this.auth.jwtPayload.id;
    this.midia.usuario = usuario;
    this.midia.chaves = this.chavesSelecionadas;
    console.log(this.midia)
    await this.midiaService.SalvarMidia(this.midia)
      .then(midiaCadastrado => {
        if (midiaCadastrado.status == 400) {
          this.toasty.error(midiaCadastrado.error.mensagem);
        } else {
          console.log(midiaCadastrado);
          this.midiaId = midiaCadastrado.midia.id;
          this.onUpload();
          this.toasty.success('Mídia salva com sucesso!');
        }
      });
  }

  atualizarMidia(form: Form) {
    this.midiaService.atualizarMidia(this.midia)
      .then(midia => {
        this.midia = midia;
        this.midia = new Midia();
        this.toasty.success('Usuário editado com sucesso!');
        this.router.navigate(['midias']);          
      })
      .catch(erro =>{
        console.log(erro);
      });
  }

  showDialog(midia: any) {
    this.midiaId = midia.id;
    this.display = true;
  }

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.toasty.success('Arquivo selecionado!'); 
    this.display = false;
  }

  onUpload() {
    const token = localStorage.getItem('token');
    let formData:FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.midiaService.SalvarUpload(this.midiaId, formData, token)
    .then((response) => {
      this.toasty.success('Arquivo salvo com sucesso!'); 
      this.router.navigate(['midias']);
    });
  }

}
