import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';

@Injectable()
export class GradeService {

  private baseUrl = `${environment.apiUrl}/grade-programacao`;
  
  constructor(
    private http: AuthHttp,
  ) { }

  atualizarGrade(grade: any): Promise<any> {
    return this.http.put(`${this.baseUrl}/${grade.id}`, grade)
      .toPromise()
      .then(response => {
        const gradeEditado = response.json();;
        return gradeEditado;
      });
  }

}
