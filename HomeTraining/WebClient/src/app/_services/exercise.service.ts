import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExercisesModel } from '../_models/exercisesModel';
import { StorageService } from './storage.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getExercises(): Observable<any> {
    let userId = this.storageService.getUser()['id'];
    if (userId == undefined)
      userId = 0;
    return this.http.get<ExercisesModel[]>('https://localhost:7186/exercise/'+userId);
  }
  addExercises(model: ExercisesModel): Observable<any> {
    return this.http.post<boolean>('https://localhost:7186/exercise/' + this.storageService.getUserId(), model);
  }
}
