import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExercisesModel } from '../_models/exercisesModel';
import { ProgramsModel } from '../_models/programModel';
import { ExerciseService } from '../_services/exercise.service';
import { ProgramService } from '../_services/program.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgramDetailsComponent } from '../program-details/program-details.component';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  exercises: ExercisesModel[];
  programs: ProgramsModel[];
  exercisesFormControl = new FormControl();
  programsFormControl = new FormControl();
  name: string;

  constructor(private _exercisesService: ExerciseService, private _programService: ProgramService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this._exercisesService.getExercises().subscribe(
      data => {
        this.exercises = data;
        console.log(this.exercises);
      });
    this._programService.getPrograms().subscribe(
      data => this.programs = data
    );
  }

  addProgram(): void {
    let model: ProgramsModel = {
      id: 0,
      userId: 0,
      name: this.name
    };
    this._programService.addProgram(model).subscribe();
  }

  addExerciseToProgram(): void {
    let program = this.programsFormControl.getRawValue();
    let exercises = this.exercisesFormControl.getRawValue();
    for (let j = 0; j < exercises.length; j++) {
      this._programService.addProgramExercise(program.id, (<ExercisesModel><unknown>exercises.at(j)).id).subscribe()
    }
  }

  showDetails(index: number) {

    let dialogRef = this.dialog.open(ProgramDetailsComponent, {
      height: '400px',
      width: '600px',
      data: { id: this.programs[index].id }
    });


  }
}
