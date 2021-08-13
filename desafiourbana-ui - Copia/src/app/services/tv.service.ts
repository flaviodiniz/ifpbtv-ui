
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { TV } from '../models/model';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class TvService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(
    private http: AuthHttp
  ) { }

  getMarcas(): Promise<any> {
    return this.http.get(`${this.baseUrl}/tvs/marcas`) 
      .toPromise()
      .then(response => { return response.json(); })
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
      return response.json();
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
      //  console.log(response.json());
        return response.json(); 
      })
      .catch(erro => {
        return Promise.reject(`Erro ao listar tvs.`);
      });
  }

  buscarPorCodigo(codigo: number): Promise<TV> {
    return this.http.get(`${this.baseUrl}/tvs/${codigo}`)
      .toPromise()
      .then(response => {
        const tv = response.json() as TV;
        return tv;
      });
  }

  atualizarTv(tv: any): Promise<any> {
    return this.http.put(`${this.baseUrl}/tvs/${tv.id}`, tv)
      .toPromise()
      .then(response => {
        const tvEditado = response.json();;
        return tvEditado;
      });
  }

  excluir(id: any){ 
    return this.http.delete(`${this.baseUrl}/tvs/${id}`)
    .toPromise()
    .then(response => {
      return response.json();;
    });
  }

  getGradeTv(id: any){
    return this.http.get(`${this.baseUrl}/tvs/grade/${id}`)
      .toPromise()
      .then(response => {
        const tv = response.json();
        return tv;
      });
  }
  
}
