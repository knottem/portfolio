import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {ScrollInViewDirective} from '../shared/scroll-in-view.directive';

@Component({
  selector: 'app-contact',
  imports: [
    TranslatePipe,
    ScrollInViewDirective
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
