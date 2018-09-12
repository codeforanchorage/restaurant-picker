import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PickerComponent } from './picker/picker.component';
import { StartComponent } from './start/start.component';

const appRoutes: Routes = [
    { path: '', component: StartComponent },
    { path: 'picker/:id', component: PickerComponent }
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}