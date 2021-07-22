import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { TV } from '../models/model';

@Injectable()
export class TvService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  getMarcas(): Promise<any> {
    return this.http.get(`${this.baseUrl}/tvs/marcas`) 
      .toPromise()
      .then(response => { return response })
      .catch(erro => {
        return Promise.reject(`Erro ao listar marcas.`);
      });
  }

  SalvarTv(tv: TV): Promise<any>{
    tv.disponivel = 'Sim';
    tv.online = false;
    console.log(tv);
    return this.http.post(`${this.baseUrl}/tvs`, tv)
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(erro =>{
      console.log(erro);
      return erro;
    });
  }

  getTvs(local: any): Promise<any> {
    return this.http.get(`${this.baseUrl}/tvs/all/${local}`) 
      .toPromise()
      .then(response => { 
        console.log(response);
        return response 
      })
      .catch(erro => {
        return Promise.reject(`Erro ao listar tvs.`);
      });
  }

  buscarPorCodigo(codigo: number): Promise<TV> {
    return this.http.get(`${this.baseUrl}/tvs/${codigo}`)
      .toPromise()
      .then(response => {
        const tv = response as TV;
        return tv;
      });
  }

  atualizarTv(tv: any): Promise<any> {
    return this.http.put<any>(`${this.baseUrl}/tvs/${tv.id}`, tv)
      .toPromise()
      .then(response => {
        const tvEditado = response;
        return tvEditado;
      });
  }

  excluir(id: any){ 
    return this.http.delete<any>(`${this.baseUrl}/tvs/${id}`)
    .toPromise()
    .then(response => {
      return response;
    });
  }
  
}
