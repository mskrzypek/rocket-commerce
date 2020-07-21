import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private renderer: Renderer2) {
    // dirty hack removing Nebular Theme class from body which class is
    // being added globally, because of NbThemeModule needd to imported
    // in app.module as singleton (forRoot)
    this.renderer.removeAttribute(document.body, 'class');
  }

  ngOnInit(): void {

  }

}
