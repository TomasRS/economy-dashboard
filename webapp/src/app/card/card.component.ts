import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title: string;
  @Input() buyValue: number;
  @Input() sellValue: number;
  @Input() imagePath: string;

  constructor() { }

  ngOnInit(): void {
  }

}
