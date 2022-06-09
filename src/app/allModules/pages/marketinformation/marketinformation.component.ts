import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'app/services/dashboard.service';
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
  constructor(private fb: FormBuilder, private _router: Router,
    private _dashboardService: DashboardService) { }

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
      Pan: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}/)]],
      Gst: ['',[Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$]/)]],
      PartyBackground: ['', Validators.required],

    })
  }
  previousbtn(): void {
    this._router.navigate(['pages/businessinformation']);
  }
  saveInfo(): void {
    const personalinformation: MarketInformation = new MarketInformation();
        personalinformation.MarketName = this.MIform.get('market').value;
        personalinformation.Population = this.MIform.get('Population').value;
        personalinformation.MarketPotential = this.MIform.get('Potential').value;
        personalinformation.StockList = this.MIform.get('Stockist').value;
        personalinformation.Distance = this.MIform.get('Distance').value;
        personalinformation.StockListName = this.MIform.get('NameOfNearest').value;
        personalinformation.Year = this.MIform.get('YearOfEstablished').value;
        personalinformation.Area = this.MIform.get('AreasStockist').value;
        personalinformation.Total = this.MIform.get('TotalPotential').value;
        personalinformation.MonthlySale = this.MIform.get('JKAvg').value;
        personalinformation.PanNo = this.MIform.get('Pan').value;
        personalinformation.GstNo = this.MIform.get('Gst').value;
        personalinformation.Background = this.MIform.get('PartyBackground').value;
        
        this._dashboardService.AddMArketInfo(personalinformation).subscribe(
            (data) => {
                console.log(data);
            },
            (err) => {

                console.error(err);
            },
        );
        this._router.navigate(['pages/nextlogin']);
}
  
  // nextbtn():void{
  //   this._router.navigate(['pages/marketinformation'])
  // }
  ClearAll(): void {
    this.MIform.reset();
  }
}
export class MarketInformation {
  ID !: string;
  MarketName !: string;
  Population!: number;
  MarketPotential!: string;
  StockList!: string;
  Distance!: number;
  StockListName!:string
  // NameOfNearest!: string;
  Year!: number;
  Area!: string;
  Total!: number;
  MonthlySale!: number;
  PanNo!: string;
  GstNo!: string;
  Background!: string;
 
}
