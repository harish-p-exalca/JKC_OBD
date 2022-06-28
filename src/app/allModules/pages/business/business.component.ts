import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NotificationSnackBarComponent } from 'app/notifications/notification-snack-bar/notification-snack-bar.component';
import { SnackBarStatus } from 'app/notifications/snackbar-status-enum';
import { CommonService } from 'app/services/common.service';
import { DashboardService } from 'app/services/dashboard.service';
export interface Monthlysales {
  sale: string;


}
const ELEMENT_DATA: Monthlysales[] = [
  { sale: "WallmaxX" },
  { sale: "WhitemaxX" },
  { sale: "GypsomaxX" },
  { sale: "ShieldmaxX" },
  { sale: "SmoothMaxX" },
  { sale: "RepairmaxX" },
  { sale: "TilemaxX" },
  { sale: "Woodamore" },
];
@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  BIform !: FormGroup
  BrandForm!: FormGroup
  private listData: any;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  displayedColumns: string[] = ["sale"]
  displayColumns: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  //displayColumns:string[]=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  brandName: string[] = ['WallmaxX', 'WhitemaxX', 'GypsomaxX', 'ShieldmaxX', 'SmoothMaxX', 'RepairmaxX', 'TilemaxX', 'Woodamore'];
  columnsToDisplay: string[] = this.displayColumns.slice();
  dataSource = ELEMENT_DATA;
  constructor(private fb: FormBuilder, private _router: Router, private _dashboardService: DashboardService, public snackBar: MatSnackBar, private _commonService: CommonService) {
    this.listData = [];
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(

      this.snackBar

    );
  }

  ngOnInit() {
    this.BIform = this.fb.group({
      NoOfYears: ['', Validators.required],
      NoOfYears1: ['', Validators.required],
      capitalinvest: ['', Validators.required],
      storagecapacity: ['', Validators.required],
      retail: ['', Validators.pattern(/^[0-9]$/)],
      vehicle: ['', Validators.required],
      Wholesale: ['', Validators.pattern(/^[a-zA-Z0-9]+$/)],



    })
    this.BrandForm = this.fb.group({
      sales: ['', Validators.required],
      date1: [''],
      date2: [''],
    })
    this.BIform.get('Wholesale')
      .valueChanges
      .subscribe(value => {
        if (value != "") {
          this.BIform
            .get('retail')
            .setValue(isNaN(value) ? 0 : 100 - value)
        }
        else {
          this.BIform
            .get('retail')
            .setValue(isNaN(value) ? "" : "")
        }
      }
      );

  }
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  saveBusinessInfo(): void {
    if (this.BIform.valid) {
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
          this.notificationSnackBarComponent.openSnackBar('Saved successfully', SnackBarStatus.success);
          this._router.navigate(['pages/marketinformation']);
        },
        (err) => {
  
          console.error(err);
        },
      );
    }
    else{
      this._commonService.ShowValidationErrors(this.BIform);
    }

   
    // this._router.navigate(['pages/nextlogin']);
  }
  public count = -1;
  public a: string = "";
  public data = [];
  add(): void {
    var d = new Date();
    d.setDate(1); //REM: To prevent month skipping.
    this.data.push(this.displayColumns[d.getMonth()])
    for (var i = 0; i < 11; i++) {
      d.setMonth(d.getMonth() + 1);
      this.data.push(this.displayColumns[d.getMonth()])
      console.log(this.displayColumns[d.getMonth()], d.getFullYear())
    };

    if (this.count < 12) {
      this.count++;
    }
    this.a += " " + this.data[this.count]
    console.log(this.a)
    this.displayedColumns.push(this.data[this.count]);
    console.log(this.displayColumns)

  }
  onAdd(): void {
    this.listData.push(this.BrandForm.value);
    this.BrandForm.reset();

  }
  RegistrationClicked(): void {
    this._router.navigate(['pages/marketinformation'])
  }
  previousbtn(): void {
    this._router.navigate(['pages/dashboard']);
  }
  nextbtn(): void {
    this._router.navigate(['pages/bankinformation'])
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
  Wholesale!: number;
  Retailers!: string;


}

