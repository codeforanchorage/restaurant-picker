import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chosen',
  templateUrl: './chosen.component.html',
  styleUrls: ['./chosen.component.css']
})
export class ChosenComponent implements OnInit {
  @Input('option') option;

  constructor() { }

  ngOnInit() {
  }

}
