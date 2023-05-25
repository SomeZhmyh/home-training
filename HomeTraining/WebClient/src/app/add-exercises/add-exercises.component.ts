import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CategoryModel } from '../_models/categoryModel';
import { ExercisesModel } from '../_models/exercisesModel';
import { CategoryService } from '../_services/category.service';
import { ExerciseService } from '../_services/exercise.service';

@Component({
  selector: 'app-add-exercises',
  templateUrl: './add-exercises.component.html',
  styleUrls: ['./add-exercises.component.css']
})
export class AddExercisesComponent implements OnInit {

  constructor(private _exercisesService: ExerciseService, private _categoryService: CategoryService) { }

  exercises: ExercisesModel[];
  categories: CategoryModel[];
  categoriesFormControl = new FormControl();
  name: string;
  description: string;


  ngOnInit(): void {
    this._exercisesService.getExercises().subscribe(
      data => {
        this.exercises = data;
        console.log(this.exercises);
      });
    this._categoryService.getCategories().subscribe(
      data => this.categories = data
    );
  }

  add(): void {
    let ids: number[] = [];
    (<CategoryModel[]>this.categoriesFormControl.value).forEach(x => ids.push(x.id));
    let model: ExercisesModel = {
        id: 0,
        name: this.name,
        description: this.description,
      image: '',
      categoryIds: ids,
        categoryNames: []
    };
    this._exercisesService.addExercises(model).subscribe();
  }

}
