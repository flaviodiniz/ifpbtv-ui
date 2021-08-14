
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';
import { Programacao } from '../models/model';

@Injectable()
export class ProgramacaoService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(
    private http: AuthHttp
  ) { }

  salvarProgramacao(programacao: Programacao): Promise<any>{
    return this.http.post(`${this.baseUrl}/programacao`, programacao)
    .toPromise()
    .then(response => {
      return response.json();
    })
    .catch(erro =>{
      console.log(erro.json());
      return erro;
    });
  }

  getProgramacoes(titulo: any, tipoProgramacao: any): Promise<any> {
    return this.http.get(`${this.baseUrl}/programacao/listar/${titulo}/${tipoProgramacao}`) 
      .toPromise()
      .then(response => { 
        return response.json();
      })
      .catch(erro => {
        return Promise.reject(`Erro ao listar programacao.`);
      });
  }

  getProgramacoesGrade(idGrade: any): Promise<any> {
    return this.http.get(`${this.baseUrl}/programacao/listarProgramacoesGrade/${idGrade}`) 
      .toPromise()
      .then(response => { 
        return response.json();
      })
      .catch(erro => {
        return Promise.reject(`Erro ao listar programacao.`);
      });
  }

  getProgramacoesSemFiltro(): Promise<any> {
    return this.http.get(`${this.baseUrl}/programacao/all`) 
      .toPromise()
      .then(response => { 
        return response.json();
      })
      .catch(erro => {
        return Promise.reject(`Erro ao listar programacao.`);
      });
  }

  atualizarProgramacao(programacao: any): Promise<any> {
    return this.http.put(`${this.baseUrl}/programacao/${programacao.id}`, programacao)
      .toPromise()
      .then(response => {
        const programacaoEditada = response.json();;
        return programacaoEditada;
      });
  }

  excluir(id: any){ 
    return this.http.delete(`${this.baseUrl}/programacao/${id}`)
    .toPromise()
    .then(response => {
      return response.json();;
    });
  }

  buscarPorId(id: number): Promise<any> {
    return this.http.get(`${this.baseUrl}/programacao/${id}`)
      .toPromise()
      .then(response => {
        const programacao = response.json();;
        return programacao;
      });
  }

  getTiposProgramacao(): Promise<any> {
    return this.http.get(`${this.baseUrl}/programacao/getTiposProgramacao`) 
      .toPromise()
      .then(response => { return response.json(); })
      .catch(erro => {
        return Promise.reject(`Erro ao listar tipos de programação.`);
      });
  }

  getImagensDaProgramacao(id: any): Promise<any> {
    console.log(id)
    return this.http.get(`${this.baseUrl}/programacao/listar/all/${id}`) 
      .toPromise()
      .then(response => { 
        return response.json();
      })
      .catch(erro => {
        return Promise.reject(`Erro ao listar programacao.`);
      });
  }
}
