
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'Skinet';



  //injektiranje na httpClient
  //moze do nego da pristapuvame so this keyword
  constructor() {}

  ngOnInit(): void {
     
  }

}
