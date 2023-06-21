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
    if (this.ImageBaseData == undefined || this.ImageBaseData == null) {
      alert('Добавьте картинку');
      return;
    }
    let model: ExercisesModel = {
      id: 0,
      name: this.name,
      description: this.description,
      image: this.ImageBaseData!.toString(),
      categoryIds: ids,
      categoryNames: []
    };
    this._exercisesService.addExercises(model).subscribe();
  }

  ImageBaseData: string | ArrayBuffer | null;

  handleFileInput(files: any) {
    let me = this;
    let file: File = files.target.files[0];
    if (file.size > 50000) {
      this.ImageBaseData = null;
      alert('Вiн занадто великий, братику');
      return;
    }
    //if (file.type)
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      me.ImageBaseData = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}



