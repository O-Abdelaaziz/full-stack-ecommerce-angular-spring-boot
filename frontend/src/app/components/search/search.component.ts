import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  onSearchProducts(value: string) {
    if (value) {
      this._router.navigate(['/search/', value]);
    } else {
      this._router.navigateByUrl('/products');
    }
  }
}
