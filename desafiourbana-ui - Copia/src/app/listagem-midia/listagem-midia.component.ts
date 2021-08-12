import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions} from '@angular/http';
import { Router } from '@angular/router';
import { TipoMidia } from 'app/models/model';
import { AuthService } from 'app/seguranca/auth.service';
import { environment } from 'environments/environment';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MidiaService } from '../services/midia.service';

import { NgxSpinnerService } from "ngx-spinner";

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

  display: boolean = false;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  constructor(
    private confirmation: ConfirmationService,
    private midiaService: MidiaService,
    private router: Router,
    private toasty: ToastyService,
    private http: Http,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.listarTipos();
    this.getMidias();
    const token = localStorage.getItem('token');
    // console.log(token)

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.spinner.hide();
    }, 2000);
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
    this.midiaService.getMidias(this.titulo, this.chave, this.tipo, this.auth.jwtPayload.id)
    .then(dados => {
      console.log(dados)
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

  showDialog(midia: any) {
    this.midia = midia.id;
    this.display = true;
  }

   //Retorno pra chamada quando o usuário seleciona um arquivo
  public onFileChanged(event) {
    console.log(event)
    //Select File
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.toasty.success('Arquivo selecionado!'); 
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    //const uploadImageData = new FormData();
    let headers = new Headers();
    const token = localStorage.getItem('token');
       
    //headers.append('Authorization', 'Bearer '+ token);
    //let options = new RequestOptions({ headers: headers });
    //uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    let url = `http://localhost:8080/upload/${this.midia}`;

    let formData:FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    //let headers2 = new Headers();
    headers.append('Content-Type', 'multipart/form-data')
    // headers.append('Accept', 'application/json');
    //headers.append('Authorization', 'Bearer '+ token);
    let options2 = new RequestOptions({ headers: headers });
    // this.http.post(url, formData, options2) 
    // .subscribe((response) => {
    //   if (response.status === 200) {
    //     this.message = 'Image uploaded successfully';
    //   } else {
    //     this.message = 'Image not uploaded successfully';
    //   }
    // }
    // );

    // this.http.post(url, uploadImageData, options)
    //   .subscribe((response) => {
    //     if (response.status === 200) {
    //       this.message = 'Image uploaded successfully';
    //     } else {
    //       this.message = 'Image not uploaded successfully';
    //     }
    //   }
    //   );
    console.log(this.selectedFile.type)

    if(this.selectedFile.type === 'application/pdf'){
      this.toasty.error('Não é possível selecionar arquivos PDF!'); 
    }else if(this.selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
      this.toasty.error('Não é possível selecionar arquivos docx!');
    }else if(this.selectedFile.type === 'text/plain'){
      this.toasty.error('Não é possível selecionar arquivos txt!');
    }
    else{

    this.file = this.selectedFile;
    this.midiaService.SalvarUpload(this.midia, formData, token)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.message = 'Image uploaded successfully';
      } else {
        this.message = 'Image not uploaded successfully';
      }
    });
    //this.display = false;
    //this.selectedFile = null;
    location.reload();
    }  
    //this.toasty.success('Arquivo salvo com sucesso!'); 
  }

}