import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateToJSONString } from '../_helpers/dateFunctions';
import { UserExercisesModel } from '../_models/userExerciseModel';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class UserExerciseService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  addSet(model: UserExercisesModel): Observable<any> {
    model.userId = this.cookieService.getUserId();
    return this.http.post('https://localhost:7186/add-set', model);
  }

  getSet(exerciseId: number, date: Date): Observable<any> {
    const formattedDate = DateToJSONString(date);
    return this.http.get<UserExercisesModel>(`https://localhost:7186/get-set/${exerciseId}/${formattedDate}`)
  }

  updateSet(model: UserExercisesModel): Observable<any> {
    return this.http.put(`https://localhost:7186/${model.id}`, model)
  }

  deleteSet(model: UserExercisesModel): Observable<any> {
    return this.http.delete(`https://localhost:7186/${model.id}`)
  }

}
