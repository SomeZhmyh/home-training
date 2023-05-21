import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
  imports: [MatButtonModule, MatFormFieldModule, MatSelectModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule, MatTableModule,
    MatListModule, MatSortModule, MatPaginatorModule,
    MatSidenavModule, MatAutocompleteModule, MatIconModule, MatDialogModule
],
  exports: [MatButtonModule, MatFormFieldModule, MatSelectModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule, MatTableModule,
    MatListModule, MatSortModule, MatPaginatorModule,
    MatSidenavModule, MatAutocompleteModule, MatIconModule, MatDialogModule
]
})
export class MaterialAppModule { }
