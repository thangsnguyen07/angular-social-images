import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  keywords: any = [];

  isFetch: boolean = false;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService
      .getKeywords()
      .pipe(first())
      .subscribe((result) => {
        result.forEach((item) => {
          this.keywords.push(item.payload.doc.data());
        });

        this.isFetch = true;
      });
  }
}
