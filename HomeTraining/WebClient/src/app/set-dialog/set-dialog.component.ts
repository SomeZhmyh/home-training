import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExercisesModel } from '../_models/exercisesModel';
import { UserExercisesModel } from '../_models/userExerciseModel';
import { UserExerciseService } from '../_services/user-exercise.service';

@Component({
  selector: 'app-set-dialog',
  templateUrl: './set-dialog.component.html',
  styleUrls: ['./set-dialog.component.css']
})
export class SetDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _userExerciseService: UserExerciseService) {
  }
  currentDate: Date;
  currentExercise: ExercisesModel;
  sets: UserExercisesModel[] = [];

  weight: number;
  count: number;
  minutesElapsed: number;
  ngOnInit(): void {
    this.currentDate = this.data.date;
    this.currentExercise = this.data.exercise;
    this.refresh();
  }
  refresh() {
    this._userExerciseService.getSet(this.currentExercise.id, this.currentDate).subscribe(x => {
      this.sets = x;
}
    );
  }

  addSet() {
    let set: UserExercisesModel = {
        id: 0,
        userId: 0,
        exerciseId: this.currentExercise.id,
        date: this.currentDate,
        weight: this.weight,
        count: this.count,
        minutesElapsed: this.minutesElapsed
    }
    this._userExerciseService.addSet(set).subscribe(() => this.refresh());
  }

}
