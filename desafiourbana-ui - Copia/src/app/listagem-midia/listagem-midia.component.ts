import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions} from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { TipoMidia } from 'app/models/model';
import { AuthService } from 'app/seguranca/auth.service';
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
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.listarTipos();
    this.getMidias();
    const token = localStorage.getItem('token');
    console.log(token)
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
    console.log(midia)
    this.midia = midia.id;
    this.display = true;
  }

   //Gets called when the user selects an image
  public onFileChanged(event) {
    console.log(event)
    //Select File
    this.selectedFile = event.target.files[0];
    this.toasty.success('Arquivo selecionado!'); 
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    let headers = new Headers();
    const token = localStorage.getItem('token');
       
    headers.append('Authorization', 'Bearer '+ token);
    let options = new RequestOptions({ headers: headers });
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    let url = `http://localhost:8080/upload/${this.midia}`;

    let formData:FormData = new FormData();
    formData.append('imageFile', this.selectedFile, this.selectedFile.name);
    let headers2 = new Headers();
    // headers.append('Content-Type', 'multipart/form-data')
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer '+ token);
    let options2 = new RequestOptions({ headers: headers });
    this.http.post(url, formData, options2) 
    .subscribe((response) => {
      if (response.status === 200) {
        this.message = 'Image uploaded successfully';
      } else {
        this.message = 'Image not uploaded successfully';
      }
    }
    );

    // this.http.post(url, uploadImageData, options)
    //   .subscribe((response) => {
    //     if (response.status === 200) {
    //       this.message = 'Image uploaded successfully';
    //     } else {
    //       this.message = 'Image not uploaded successfully';
    //     }
    //   }
    //   );
    this.display = false;
    this.selectedFile = null;
    location.reload();
    this.toasty.success('Arquivo salvo com sucesso!'); 
  }

    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.http.get(`http://localhost:8080/upload/${this.midia}` + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

}