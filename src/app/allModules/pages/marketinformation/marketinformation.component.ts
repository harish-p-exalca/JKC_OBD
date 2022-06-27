import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NotificationSnackBarComponent } from 'app/notifications/notification-snack-bar/notification-snack-bar.component';
import { SnackBarStatus } from 'app/notifications/snackbar-status-enum';
import { CommonService } from 'app/services/common.service';
import { DashboardService } from 'app/services/dashboard.service';
export interface Monthlysales{
  cement:string;
  wp:string;
  wc:string;
  }
  const ELEMENT_DATA: Monthlysales[] = [
    { cement : "Birla",wp:"Enter",wc:"Enter"},
    { cement : "JK Cement",wp:"Enter",wc:"Enter"},
    // { cement : "JK Laxmi",wp:"Enter",wc:"Enter"},
    // { cement : "Asian Paints",wp:"Enter",wc:"Enter"},
    // { cement : "Berger",wp:"Enter",wc:"Enter"},
    // { cement : "Nerolac",wp:"Enter",wc:"Enter"},
    // { cement : "Other Paint Cos",wp:"Enter",wc:"Enter"},
    // { cement : "Other Local Brands",wp:"Enter",wc:"Enter"},
  ];
@Component({
  selector: 'app-marketinformation',
  templateUrl: './marketinformation.component.html',
  styleUrls: ['./marketinformation.component.scss']
})
export class MarketinformationComponent implements OnInit {
  partylist: string[] = ['Paint', 'Grey Cement', 'Hardware','Wall Putty','White cement','Sanitary','Water Proofing Chemicals','others'];
  brandName: string[] = ['Birla', 'JK Cement', 'JK Laxmi','Asian Paints','Berger','Nerolac','Other Paint Cos','Other Local Brands'];
   selected='';
  MIform!: FormGroup
  BrandForm!:FormGroup
  public listData:any;
  isgst:boolean=false;
  ispan:boolean=false;
  // selected:boolean=true;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  displayedColumns: string[] = ['cement', 'wp', 'wc'];
  dataSource = ELEMENT_DATA;
  constructor(private fb: FormBuilder, private _router: Router, public snackBar: MatSnackBar,
    private _dashboardService: DashboardService,private _commonService: CommonService) {
      this.notificationSnackBarComponent = new NotificationSnackBarComponent(

        this.snackBar

    );
      this.listData=[];
     }

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
      Pan: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
      Gst: ['',[Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]],
      PartyBackground: ['', Validators.required],

    })
    this.BrandForm = this.fb.group({
      brand: ['',Validators.required],
      wpMonth: [''],
      wcMonth: [''],
    })
  }

  previousbtn(): void {
    this._router.navigate(['pages/businessinformation']);
  }
  nextbtn(): void {
    this._router.navigate(['pages/businessinformation']);
  }
  IsGstValid(){
  
    let GST=this.MIform.controls['Gst'].value;
    if (/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(GST)){
      console.log('true'); 
       this.isgst=true;
    }
    else{
      console.log('false'); 
      this.isgst= false;
    }
  }
  IsPanValid(){
  
    let Pan=this.MIform.controls['Pan'].value;
    if (/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(Pan)){
      console.log('true'); 
       this.ispan=true;
    }
    else{
      console.log('false'); 
      this.ispan= false;
    }
  }
  saveInfo(): void {
    if (this.MIform.valid) {
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
                this.notificationSnackBarComponent.openSnackBar('Saved successfully', SnackBarStatus.success);
                this._router.navigate(['pages/bankinformation']);
              },
            (err) => {

                console.error(err);
                this.notificationSnackBarComponent.openSnackBar('Something went wrong', SnackBarStatus.danger);
            },
        );

      
        
        }
        else{
          this._commonService.ShowValidationErrors(this.MIform);

        }
       
}
onAdd():void{
 this.listData.push(this.BrandForm.value);
 
 this.BrandForm.reset();

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
