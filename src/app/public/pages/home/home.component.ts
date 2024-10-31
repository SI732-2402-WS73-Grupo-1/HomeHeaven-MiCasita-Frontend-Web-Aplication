import { Component } from '@angular/core';
import { EstatesListComponent} from "../../../register/components/estates-list/estates-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EstatesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
