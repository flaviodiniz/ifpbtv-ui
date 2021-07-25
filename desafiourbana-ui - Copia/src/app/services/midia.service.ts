
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { Midia } from '../models/model';

@Injectable()
export class MidiaService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(
    private http: Http
  ) { }

  getTiposMidia(): Promise<any> {
    return this.http.get(`${this.baseUrl}/midias/getTiposMidia`) 
      .toPromise()
      .then(response => { return response })
      .catch(erro => {
        return Promise.reject(`Erro ao listar tipos de mídia.`);
      });
  }

  getDisponibilidadeMidia(): Promise<any> {
    return this.http.get(`${this.baseUrl}/midias/getDisponibilidadeMidia`) 
      .toPromise()
      .then(response => { return response })
      .catch(erro => {
        return Promise.reject(`Erro ao listar disponibilidades da mídia.`);
      });
  }

  getChaves(): Promise<any> {
    return this.http.get(`${this.baseUrl}/midias/getChaves`) 
      .toPromise()
      .then(response => { return response })
      .catch(erro => {
        return Promise.reject(`Erro ao listar Chaves da mídia.`);
      });
  }

  SalvarMidia(midia: Midia): Promise<any>{
    return this.http.post(`${this.baseUrl}/midias`, midia)
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(erro =>{
      console.log(erro);
      return erro;
    });
  }

  getMidias(titulo: any, chave: any, tipo: any): Promise<any> {
    return this.http.get(`${this.baseUrl}/midias/${titulo}/${chave}/${tipo}`) 
      .toPromise()
      .then(response => { 
        console.log(response);
        return response 
      })
      .catch(erro => {
        return Promise.reject(`Erro ao listar mídias.`);
      });
  }

  atualizarMidia(midia: any): Promise<any> {
    return this.http.put(`${this.baseUrl}/midias/${midia.id}`, midia)
      .toPromise()
      .then(response => {
        const usuarioEditado = response;
        return usuarioEditado;
      });
  }

  excluir(id: any){ 
    return this.http.delete(`${this.baseUrl}/midias/${id}`)
    .toPromise()
    .then(response => {
      return response;
    });
  }

  buscarPorCodigo(codigo: number): Promise<any> {
    return this.http.get(`${this.baseUrl}/midias/${codigo}`)
      .toPromise()
      .then(response => {
        const midia = response;
        return midia;
      });
  }
}
