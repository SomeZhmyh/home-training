import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { SetDialogComponent } from '../set-dialog/set-dialog.component';
import { ExercisesModel } from '../_models/exercisesModel';
import { ProgramsModel } from '../_models/programModel';
import { UserExercisesModel } from '../_models/userExerciseModel';
import { ExerciseService } from '../_services/exercise.service';
import { ProgramService } from '../_services/program.service';
import { UserExerciseService } from '../_services/user-exercise.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  constructor(private _programService: ProgramService, public dialog: MatDialog, private _userExerciseService: UserExerciseService) { }

  selectedProgram: ProgramsModel;
  programName: string = '';
  date = new FormControl(new Date());
  userExecises: ExercisesModel[] = [];
  programs: ProgramsModel[] = [];
  sets: UserExercisesModel[][] = [[]];
  selectProgram(event: MatSelectChange): void {
    this.selectedProgram = <ProgramsModel>event.value;
    this.programName = this.selectedProgram.name;
    this._programService.getProgramExercises(this.selectedProgram.id).subscribe(x => {
      this.userExecises = x;


      this.sets.length = 0;
      this.userExecises.forEach(exercise => {
        this._userExerciseService.getSet(exercise.id, < Date > this.date.value).subscribe(sets => this.sets.push(sets));

      })
    });

  }

  ngOnInit(): void {
    this._programService.getPrograms().subscribe(x => {
      this.programs = x
    });
  }
  configureExercise(index: number): void {
    let dialogRef = this.dialog.open(SetDialogComponent, {
      height: '400px',
      width: '600px',
      data: { exercise: this.userExecises[index], date: (<Date>this.date.value)}
    });
  }
}
