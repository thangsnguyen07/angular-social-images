import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.scss'],
})
export class KeywordsComponent implements OnInit {
  @Input() title!: string;
  @Input() keywords: any = [];
  constructor() {}

  ngOnInit(): void {
    this.shuffleArray(this.keywords);
    this.keywords = this.keywords.slice(0, 8);
  }

  shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
