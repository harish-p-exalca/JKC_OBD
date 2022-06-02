import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
export interface Monthlysales{
  cement:string;
  wp:string;
  wc:string;
  }
  const ELEMENT_DATA: Monthlysales[] = [
    { cement : "Birla",wp:"Enter",wc:"Enter"},
    { cement : "JK Cement",wp:"Enter",wc:"Enter"},
    { cement : "JK Laxmi",wp:"Enter",wc:"Enter"},
    { cement : "Asian Paints",wp:"Enter",wc:"Enter"},
    { cement : "Berger",wp:"Enter",wc:"Enter"},
    { cement : "Nerolac",wp:"Enter",wc:"Enter"},
    { cement : "Other Paint Cos",wp:"Enter",wc:"Enter"},
    { cement : "Other Local Brands",wp:"Enter",wc:"Enter"},
  ];
@Component({
  selector: 'app-marketinformation',
  templateUrl: './marketinformation.component.html',
  styleUrls: ['./marketinformation.component.scss']
})
export class MarketinformationComponent implements OnInit {
  partylist: string[] = ['Paint', 'Grey cement', 'Hardware','Wall putty','White cement','Sanitary','Water Proofing Chemicals','others'];
  MIform!: FormGroup
  displayedColumns: string[] = ['cement', 'wp', 'wc'];
  dataSource = ELEMENT_DATA;
  constructor(private fb: FormBuilder, private _router: Router) { }

  ngOnInit() {
    this.MIform = this.fb.group({
      market: [''],
      Population: [''],
      Potential: ['', Validators.required],
      Stockist: [''],
      Distance: [''],
      NameOfNearest: [''],
      YearOfEstablished: ['', Validators.required],
      AreasStockist: [''],
      TotalPotential: ['', Validators.required],
      JKAvg: ['', Validators.required],
      Pan: ['', Validators.required],
      Gst: ['', Validators.required],
      PartyBackground: ['', Validators.required],

    })
  }
  previousbtn(): void {
    this._router.navigate(['pages/businessinformation']);
  }
  // nextbtn():void{
  //   this._router.navigate(['pages/marketinformation'])
  // }
  ClearAll(): void {
    this.MIform.reset();
  }
}
