import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CollagePage} from './pages/collage-page/collage-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CollagePage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
}
