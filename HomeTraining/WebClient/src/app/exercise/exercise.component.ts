import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddExercisesComponent } from '../add-exercises/add-exercises.component';
import { ExerciseDetailsComponent } from '../exercise-details/exercise-details.component';
import { CategoryModel } from '../_models/categoryModel';
import { ExercisesModel } from '../_models/exercisesModel';
import { CategoryService } from '../_services/category.service';
import { ExerciseService } from '../_services/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  constructor(private _exercisesService: ExerciseService, private _categoryService: CategoryService, public dialog: MatDialog) { }

  exercises: ExercisesModel[];
  shownExercises: ExercisesModel[];
  categories: CategoryModel[];
  categoriesFormControl = new FormControl();
  name: string;
  description: string;


  ngOnInit(): void {
    let defaultCategory: CategoryModel = {
        id: -1,
        name: 'none',
        description: '',
        image: ''
    };
    this._exercisesService.getExercises().subscribe(
      data => {
        this.exercises = data;
        this.shownExercises = data;
        console.log(this.exercises);
      });
    this._categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        this.categories.push(defaultCategory);
      }
    );
  }

  sort(): void {
    let categoryId = (<CategoryModel>this.categoriesFormControl.value).id;
    if (categoryId != -1)
      this.shownExercises = this.exercises.filter(x => x.categoryIds.includes(categoryId));
    else
      this.shownExercises = this.exercises;
  }

  addExercise() {

    let dialogRef = this.dialog.open(AddExercisesComponent, {
      height: '1000px',
      width: '600px',
    });
  }
  showDetails(model: ExercisesModel) {
    let dialogRef = this.dialog.open(ExerciseDetailsComponent, {
      height: '1000px',
      width: '800px',
      data: model
    });
  }
}

