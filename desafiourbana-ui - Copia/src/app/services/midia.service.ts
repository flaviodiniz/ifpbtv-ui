
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';
import { Midia } from '../models/model';

@Injectable()
export class MidiaService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(
    private http: AuthHttp,
    private http2: Http
  ) { }

  getTiposMidia(): Promise<any> {
    return this.http.get(`${this.baseUrl}/midias/getTiposMidia`) 
      .toPromise()
      .then(response => { return response.json(); })
      .catch(erro => {
        return Promise.reject(`Erro ao listar tipos de mídia.`);
      });
  }

  getDisponibilidadeMidia(): Promise<any> {
    return this.http.get(`${this.baseUrl}/midias/getDisponibilidadeMidia`) 
      .toPromise()
      .then(response => { return response.json(); })
      .catch(erro => {
        return Promise.reject(`Erro ao listar disponibilidades da mídia.`);
      });
  }

  getChaves(): Promise<any> {
    return this.http.get(`${this.baseUrl}/midias/getChaves`) 
      .toPromise()
      .then(response => { 
        console.log(response.json())
        return response.json(); 
      })
      .catch(erro => {
        return Promise.reject(`Erro ao listar Chaves da mídia.`);
      });
  }

  SalvarMidia(midia: Midia): Promise<any>{
    console.log(midia)
    return this.http.post(`${this.baseUrl}/midias`, midia)
    .toPromise()
    .then(response => {
      return response.json();
    })
    .catch(erro =>{
      console.log(erro.json());
      return erro;
    });
  }

  SalvarUpload(midia: any, form: FormData, token: any): Promise<any>{
    const headers = new Headers();
    headers.append('Authorization', 'Bearer '+ token);
    // headers.append('Content-Type','application/json');
    // headers.append('Content-Type','multipart/form-data');
    // headers.append('enctype','multipart/form-data');
    const option:RequestOptionsArgs = { headers : headers };
    return this.http2.post(`${this.baseUrl}/upload/${midia}`, form, option)
    .toPromise()
    .then(response => {
      return response.json();
    })
    .catch(erro =>{
      console.log(erro.json());
      return erro;
    });
  }

  getMidias(titulo: any, chave: any, tipo: any): Promise<any> {
    console.log(titulo, chave, tipo)
    return this.http.get(`${this.baseUrl}/midias/${titulo}/${chave}/${tipo}`) 
      .toPromise()
      .then(response => { 
      //  console.log(response.json());
        return response.json();
      })
      .catch(erro => {
        return Promise.reject(`Erro ao listar mídias.`);
      });
  }

  atualizarMidia(midia: any): Promise<any> {
    return this.http.put(`${this.baseUrl}/midias/${midia.id}`, midia)
      .toPromise()
      .then(response => {
        const usuarioEditado = response.json();;
        return usuarioEditado;
      });
  }

  excluir(id: any){ 
    return this.http.delete(`${this.baseUrl}/midias/${id}`)
    .toPromise()
    .then(response => {
      return response.json();
    });
  }

  buscarPorCodigo(codigo: number): Promise<any> {
    return this.http.get(`${this.baseUrl}/midias/${codigo}`)
      .toPromise()
      .then(response => {
        const midia = response.json();;
        return midia;
      });
  }
}
