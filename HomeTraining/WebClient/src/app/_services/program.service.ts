import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExercisesModel } from '../_models/exercisesModel';
import { ProgramsModel } from '../_models/programModel';
import { CookieService } from './cookie.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getPrograms(): Observable<any> {
    return this.http.get<ProgramsModel[]>(`https://localhost:7186/get-program-by-userId/${this.cookieService.getUserId()}`);
  }
  getProgramExercises(id: number): Observable<any> {
    return this.http.get<ExercisesModel[]>('https://localhost:7186/get-program-exercises/'+id);
  }

  addProgram(model: ProgramsModel): Observable<any> {
    model.userId = this.cookieService.getUserId();
    return this.http.post('https://localhost:7186/add-program', model)
  }

  addProgramExercise(programId: number, exerciseId: number): Observable<any> {
    return this.http.post(`https://localhost:7186/add-program-exercise/${programId}/${exerciseId}`, null)
  }
}
