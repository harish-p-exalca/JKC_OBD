import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'app/services/dashboard.service';
export interface Monthlysales {
  sale: string;
  apr: string;
  may: string;
}
const ELEMENT_DATA: Monthlysales[] = [
  { sale: "WallmaxX", apr: "Enter", may: "Enter" },
  { sale: "WhitemaxX", apr: "Enter", may: "Enter" },
  { sale: "GypsomaxX", apr: "Enter", may: "Enter" },
  { sale: "ShieldmaxX", apr: "Enter", may: "Enter" },
  { sale: "SmoothMaxX", apr: "Enter", may: "Enter" },
  { sale: "RepairmaxX", apr: "Enter", may: "Enter" },
  { sale: "TilemaxX", apr: "Enter", may: "Enter" },
  { sale: "Woodamore", apr: "Enter", may: "Enter" },
];
@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  BIform !: FormGroup
  displayedColumns: string[] = ['sale', 'apr', 'may'];
  dataSource = ELEMENT_DATA;
  constructor(private fb: FormBuilder, private _router: Router, private _dashboardService: DashboardService) { }

  ngOnInit() {
    this.BIform = this.fb.group({
      NoOfYears: ['', Validators.required],
      NoOfYears1: ['', Validators.required],
      capitalinvest: ['', Validators.required],
      storagecapacity: ['', Validators.required],
      retail: [''],
      vehicle: ['', Validators.required],
      Wholesale: [''],
    
    })
  }
  saveBusinessInfo(): void {
    const personalinformation: BusinessInformation = new BusinessInformation();
    personalinformation.Turnover = this.BIform.get('NoOfYears').value;
    personalinformation.Retail = this.BIform.get('retail').value;
    personalinformation.WorkingCaptial = this.BIform.get('capitalinvest').value;
    personalinformation.Retailers = this.BIform.get('NoOfYears1').value;
    personalinformation.NoVechicle = this.BIform.get('vehicle').value;
    personalinformation.TotalStorage = this.BIform.get('storagecapacity').value;
    personalinformation.Wholesale = this.BIform.get('Wholesale').value;
    
    
    this._dashboardService.AddBusinessInfo(personalinformation).subscribe(
        (data) => {
            console.log(data);
        },
        (err) => {

            console.error(err);
        },
    );
    this._router.navigate(['pages/nextlogin']);
  }
  RegistrationClicked(): void {
    this._router.navigate(['pages/marketinformation'])
  }
  previousbtn(): void {
    this._router.navigate(['pages/personalinformation']);
  }
  nextbtn():void{
    this._router.navigate(['pages/marketinformation'])
  }
  ClearAll(): void {
    this.BIform.reset();
  }
}
export class BusinessInformation {
  ID !: string;
  Turnover !: string;
  WorkingCaptial!: string;
  Retail!: number;
  NoVechicle!: number;
  TotalStorage!: string;
  Wholesale!:number;
  Retailers!: number;
  
 
}

