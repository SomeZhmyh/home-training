import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExercisesModel } from '../_models/exercisesModel';
import { ProgramService } from '../_services/program.service';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css']
})
export class ProgramDetailsComponent implements OnInit {
  exercises: ExercisesModel[] = [];
  constructor(public dialogRef: MatDialogRef<ProgramDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _programService: ProgramService) { }


    ngOnInit(): void {
      this._programService.getProgramExercises(this.data.id).subscribe(
        data => this.exercises = data
      );
    }

}
