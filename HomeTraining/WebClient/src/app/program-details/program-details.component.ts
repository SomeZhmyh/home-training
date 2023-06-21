import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExercisesModel } from '../_models/exercisesModel';
import { ExerciseService } from '../_services/exercise.service';
import { ProgramService } from '../_services/program.service';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css']
})
export class ProgramDetailsComponent implements OnInit {
  exercises: ExercisesModel[] = [];
  allExercises: ExercisesModel[] = [];
  exercisesFormControl = new FormControl();
  name: string;
    programsFormControl: any;

  constructor(public dialogRef: MatDialogRef<ProgramDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _programService: ProgramService, private _exercisesService: ExerciseService) { }


    ngOnInit(): void {
      this._programService.getProgramExercises(this.data.id).subscribe(
        data => this.exercises = data
      );
      this._exercisesService.getExercises().subscribe(data => this.allExercises = data);
    }

  addExerciseToProgram(): void {
    let program = this.data;
    let exercises = this.exercisesFormControl.getRawValue();
    for (let j = 0; j < exercises.length; j++) {
      this._programService.addProgramExercise(program.id, (<ExercisesModel><unknown>exercises.at(j)).id).subscribe()
    }
  }

}
