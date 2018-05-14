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
import { EditorService } from './services/editor.service';


import { GraphPanelComponent } from './graph-panel/graph-panel.component';
import { GraphEditorComponent } from './graph-editor/graph-editor.component';

<<<<<<< HEAD

import { MdlModule } from '@angular-mdl/core';


=======
import { MdlModule } from '@angular-mdl/core';
>>>>>>> f0aa65aa186bdfc13a9cc3f3242450c03b59d65e

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
    HttpClientModule,
    MdlModule
  ],
  providers: [
    LoginService,
    GoHistoryService,
    EditorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
