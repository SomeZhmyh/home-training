import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExercisesModel } from '../_models/exercisesModel';
import { ProgramsModel } from '../_models/programModel';
import { StorageService } from './storage.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getPrograms(): Observable<any> {
    return this.http.get<ProgramsModel[]>(`https://localhost:7186/get-program-by-userId/${this.storageService.getUserId()}`);
  }
  getProgramExercises(id: number): Observable<any> {
    return this.http.get<ExercisesModel[]>('https://localhost:7186/get-program-exercises/'+id);
  }

  addProgram(model: ProgramsModel): Observable<any> {
    model.userId = this.storageService.getUserId();
    return this.http.post('https://localhost:7186/add-program', model)
  }

  addProgramExercise(programId: number, exerciseId: number): Observable<any> {
    return this.http.post(`https://localhost:7186/add-program-exercise/${programId}/${exerciseId}`, null)
  }
}
