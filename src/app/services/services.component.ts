import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Options } from 'ng5-slider';
import {Bus} from '/home/pavan/Desktop/Pavan/apstrtcAngular/src/app/Bus';
import { Observable } from 'rxjs';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Item } from '../Item';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],

  // Add this:
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class ServicesComponent implements OnInit {
  buses$: Object;

  BusTypes = [];
 

 
  BoardingPoints = [];
  DroppingPoints = [];
  selectedItems = [];
  dropdownSettings = {};
  minValue: number = 100;
  maxValue: number = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000,
    step: 1
  }
  
  constructor(private data: DataService) { }
  
  ngOnInit() {
    this.data.getBuses().subscribe(
    (data =>this.buses$ =data)
    )
    this.BusTypes = [
      { item_id: 1, item_text: 'NON A/C CLASS' },
      { item_id: 2, item_text: 'A/C CLASS' }
     
    ];
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      
      itemsShowLimit: 1,
      allowSearchFilter: false
    };
    this.BoardingPoints = [
      { item_id: 1, item_text: 'AMEERPET' },
      { item_id: 2, item_text: 'ABIDS' },
      { item_id: 3, item_text: 'ANANDBAGH' },
      { item_id: 4, item_text: 'LB NAGAR' }
    ];
    this.DroppingPoints = [
      { item_id: 1, item_text: 'VIJAYAWADA' },
      { item_id: 2, item_text: 'BENZ CIRCLE' },
      { item_id: 3, item_text: 'AUTO NAGAR' },
      { item_id: 4, item_text: 'PORANKI' }
    ];
    
        
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}




