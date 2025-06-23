import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
    ],
    imports: [CommonModule, FormsModule, RouterModule],
    exports: [],
})
export class AuthModule { }
