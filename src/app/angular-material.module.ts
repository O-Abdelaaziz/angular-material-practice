import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {CdkDrag, CdkDragPlaceholder, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';

export const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatSidenavContainer,
  MatListModule,
  MatMenuModule,
  MatButtonToggleModule,
  CdkDropListGroup,
  CdkDropList,
  CdkDrag,
  CdkDragPlaceholder,
  MatCardModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatSelectModule
]

@NgModule({
  declarations: [],
  imports: [
    ...materialModules,
  ],
  exports: [
    ...materialModules,
  ]
})
export class AngularMaterialModule {
}
