import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExercisesModel } from '../_models/exercisesModel';
import { ExerciseService } from '../_services/exercise.service';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent implements OnInit {

  exercise: ExercisesModel;
  constructor(public dialogRef: MatDialogRef<ExerciseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExercisesModel) { }


  ngOnInit(): void {
    this.exercise = this.data;
  }


}
