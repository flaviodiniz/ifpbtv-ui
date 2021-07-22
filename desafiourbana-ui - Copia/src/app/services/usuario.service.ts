import { Injectable } from '@angular/core';
import { Usuario } from '../models/model';
import { environment } from 'environments/environment';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UsuarioService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(
    private http: AuthHttp
  ) { }

  getPerfis(): Promise<any> {
    return this.http.get(`${this.baseUrl}/usuarios/perfis`) //{ headers, search: params }
      .toPromise()
      .then(response => { return response.json() })
      .catch(erro => {
        return Promise.reject(`Erro ao listar perfis.`);
      });
  }

  getUsuarios(nome: any, matricula: any, perfil: any): Promise<any> {
    return this.http.get(`${this.baseUrl}/usuarios/${nome}/${matricula}/${perfil}`) 
      .toPromise()
      .then(response => { 
        return response.json();
      })
      .catch(erro => {
        return Promise.reject(`Erro ao listar usuários.`);
      });
  }

  SalvarUsuario(usuario: Usuario): Promise<any>{
    usuario.status = 'Ativo';
    return this.http.post(`${this.baseUrl}/usuarios`, usuario)
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(erro =>{
      console.log(erro.json());
      return erro.json();
    });
  }

  buscarPorCodigo(codigo: number): Promise<any> {
    return this.http.get(`${this.baseUrl}/usuarios/${codigo}`)
      .toPromise()
      .then(response => {
        const usuario = response.json();
        return usuario;
      });
  }

  atualizarUsuario(usuario: any): Promise<any> {
    return this.http.put(`${this.baseUrl}/usuarios/${usuario.id}`, usuario)
      .toPromise()
      .then(response => {
        const usuarioEditado = response;
        return usuarioEditado;
      });
  }

  excluir(id: any){ 
    return this.http.delete(`${this.baseUrl}/usuarios/${id}`)
    .toPromise()
    .then(response => {
      return response;
    });
  }
  

}
