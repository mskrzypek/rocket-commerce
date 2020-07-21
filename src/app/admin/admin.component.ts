import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  items: NbMenuItem[] = [
    {
      title: 'Produkty',
      icon: 'layers-outline',
      link: 'products'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
