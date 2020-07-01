import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title: string;
  @Input() buyValue: string;
  @Input() sellValue: string;
  @Input() imagePath: string;
  @Input() updatedOn: string;

  constructor() { }

  ngOnInit(): void {
  }

}
