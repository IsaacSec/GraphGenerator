import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './/app-routing.module';
import { GraphHistoryComponent } from './graph-history/graph-history.component';

import { LoginService } from './services/login.service';
import { GoHistoryService } from './services/go-history.service';
import { GraphPanelComponent } from './graph-panel/graph-panel.component';
import { GraphEditorComponent } from './graph-editor/graph-editor.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GraphHistoryComponent,
    GraphPanelComponent,
    GraphEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    GoHistoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
