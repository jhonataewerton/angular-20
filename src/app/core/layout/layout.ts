import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { ɵEmptyOutletComponent, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [Header],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
