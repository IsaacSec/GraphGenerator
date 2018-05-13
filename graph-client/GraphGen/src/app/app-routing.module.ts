import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { GraphHistoryComponent } from './graph-history/graph-history.component';
import { GraphPanelComponent } from './graph-panel/graph-panel.component';

const routes:Routes = [
  { path: 'login', component:LoginComponent },
  { path: '', redirectTo:'/login', pathMatch:'full' },
  { path: 'history', component:GraphHistoryComponent },
  { path: 'graphEdit', component:GraphPanelComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
