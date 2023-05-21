import { formatDate } from '@angular/common';

export interface UserExercisesModel {
  id: number,
  userId: number,
  exerciseId: number,
  date: Date,
  weight: number,
  count: number,
  minutesElapsed: number
}
