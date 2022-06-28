import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  MatIconRegistry,
  MatSnackBar,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatTabChangeEvent,
  MatAccordion
} from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationSnackBarComponent } from 'app/notifications/notification-snack-bar/notification-snack-bar.component';
import { SnackBarStatus } from 'app/notifications/notification-snack-bar/notification-snackbar-status-enum';
import { AuthenticationDetails, PersonalInfo } from 'app/models/master';
import { fuseAnimations } from '@fuse/animations';
import { DashboardService } from 'app/services/dashboard.service';
import { ShareParameterService } from 'app/services/share-parameters.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Guid } from 'guid-typescript';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { BankdialogComponent } from '../bankdialog/bankdialog.component';
import { CommonService } from 'app/services/common.service';


@Component({
  selector: 'app-bankinformation',
  templateUrl: './bankinformation.component.html',
  styleUrls: ['./bankinformation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class BankinformationComponent implements OnInit {
  links = ['Bank Details 1', 'Bank Details 2'];
  activeLink = this.links[0];
  leaflist: string[] = ['DD', 'RTGS UTR', 'NEFT', 'IMPS', 'Cheque']
  selectedlist: string[] = ['Yes', 'No']
  selected = '';
  isd2rs: boolean = false;
  FileName:any;
  FileName1:any;
  FileName2:any;
  FileName3:any;
  FileName4:any;
  FileName5:any;
  FileName6:any;
  FileName7:any;
  name: any = [];
  public listData: any;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private fb: FormBuilder,private _commonService: CommonService, private _router: Router, private _dashboardService: DashboardService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar), this.listData = [];
  }
  BIform!: FormGroup;
  selectedPersonalInfo: PersonalInfo = null;
  ngOnInit(): void {
    const retrievedvalue = localStorage.getItem('retail_D2RS');
    console.log(retrievedvalue);
    this.BIform = this.fb.group({
      leaf: ['', Validators.required],
      Leafno: ['', Validators.required],
      Date: ['', Validators.required],
      Amount: ['', Validators.required],
      nameofbank: ['', Validators.required],
      bankno: [''],
      bankname: ['', Validators.required],
      bankaddress: ['', Validators.required],
      ifsccode: ['', Validators.required],
      bankacno: ['', Validators.required],
      jkc1: ['', Validators.required],
      politicalParty: ['', Validators.required],
      police: ['', Validators.required],
      admin: ['', Validators.required],
      sales: ['', Validators.required],
      asmname: ['', Validators.required],
      headname: ['', Validators.required],
      jkc1Name: ['',],
      jkcMobile: [''],
      jkcPerson: [''],
      politicalname: [''],
      politicalMobile: [''],
      politicalPerson: [''],
      policeName: [''],
      policeMobile: [''],
      policePerson: [''],
      adminName: [''],
      adminMobile: [''],
      adminperson: [''],
      salesName: [''],
      salesMobile: [''],
      salesPerson: [''],
      asmname1: [''],
      asmnMobile: [''],
      asmnperson: [''],
      headname1: [''],
      headMobile: [''],
      headPerson: [''],
      declare: [''],
      billing: []
    });
    if (retrievedvalue == 'ok') {
      this.isd2rs = true;
      this.BIform.get('leaf').disable();
      this.BIform.get('Leafno').disable();
      this.BIform.get('Date').disable();
      this.BIform.get('Amount').disable();
      this.BIform.get('nameofbank').disable();
    }
    else {
      this.BIform.get('leaf').enable();
      this.BIform.get('Leafno').enable();
      this.BIform.get('Date').enable();
      this.BIform.get('Amount').enable();
      this.BIform.get('nameofbank').enable();
      this.isd2rs = false;
    }
    this.selectedPersonalInfo = this._dashboardService.GetPersonalInfo();
    console.log(this.selectedPersonalInfo.Name);
    this.name = this.selectedPersonalInfo.Name;
    this._dashboardService.SetPersonalInfo(null);
  }
  ClearAll(): void {
    this.BIform.reset();
  }
  previousbtn(): void {
    this._router.navigate(['pages/marketinformation']);
  }
  onAdd(): void {
    if(this.BIform.valid)
    {

   
    this.listData.push(this.BIform.value);
    // this.BIform.reset();
    this.listData[this.listData.length - 1].id = this.listData.length.toString();
    const personalinformation: BankDetailInformation = new BankDetailInformation();
    personalinformation.BankName = this.BIform.get('bankname').value;
    personalinformation.BankAddress = this.BIform.get('bankaddress').value;
    personalinformation.IFSC = this.BIform.get('ifsccode').value;
    personalinformation.AccountNum = this.BIform.get('bankacno').value;


    this._dashboardService.AddBankDetInfo(personalinformation).subscribe(
      (data) => {
        console.log(data);
        this.notificationSnackBarComponent.openSnackBar('Saved successfully', SnackBarStatus.success);
        // this._router.navigate(['pages/nextlogin']);
      },
      (err) => {

        console.error(err);
        this.notificationSnackBarComponent.openSnackBar('Something went wrong', SnackBarStatus.danger);
      },
    );
  }
  else{
    this._commonService.ShowValidationErrors(this.BIform);
  }



  }
  remove() {

  }
  additem(row: BankDetailInformation) {

  }
  saveInfo(): void {
    if(this.BIform.valid){

 
    //1st
    const dialogRef = this.dialog.open(BankdialogComponent, {
      width: "53%",


    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    const personalinformation: BankInformation = new BankInformation();
    personalinformation.Leaf = this.BIform.get('leaf').value;
    personalinformation.Bill = this.BIform.get('Leafno').value;
    personalinformation.Date = this.BIform.get('Date').value;
    personalinformation.Amount = this.BIform.get('Amount').value;
    personalinformation.BankName = this.BIform.get('nameofbank').value;

    this._dashboardService.AddBankInfo(personalinformation).subscribe(
      (data) => {
        console.log(data);
        // this.notificationSnackBarComponent.openSnackBar('Saved successfully', SnackBarStatus.success);
        this._router.navigate(['pages/businessinformation']);
      },
      (err) => {

        console.error(err);
        // this.notificationSnackBarComponent.openSnackBar('Something went wrong', SnackBarStatus.danger);
      },
    );

    //jkc connection
    const personalinformation1: JKCInformation = new JKCInformation();
    personalinformation1.JKDirectory = this.BIform.get('jkc1').value;
    personalinformation1.political = this.BIform.get('politicalParty').value;
    personalinformation1.police = this.BIform.get('police').value;
    personalinformation1.Authority = this.BIform.get('admin').value;

    this._dashboardService.AddconnectionInfo(personalinformation1).subscribe(
      (data) => {
        console.log(data);
        // this.notificationSnackBarComponent.openSnackBar('Saved successfully', SnackBarStatus.success);
        this._router.navigate(['pages/businessinformation']);
      },
      (err) => {

        console.error(err);
        // this.notificationSnackBarComponent.openSnackBar('Something went wrong', SnackBarStatus.danger);
      },
    );

  }
  else
  {
    this._commonService.ShowValidationErrors(this.BIform);
  }


  }
  csvInputChange(fileInputEvent: any) {
    this.FileName = fileInputEvent.target.files[0].name;
    console.log(fileInputEvent.target.files[0]);
  }
  csv1InputChange(fileInputEvent: any) {
    this.FileName1 = fileInputEvent.target.files[0].name;
    console.log(fileInputEvent.target.files[0]);
  }
  csv2InputChange(fileInputEvent: any) {
    this.FileName2 = fileInputEvent.target.files[0].name;
    console.log(fileInputEvent.target.files[0]);
  }
  csv3InputChange(fileInputEvent: any) {
    this.FileName3 = fileInputEvent.target.files[0].name;
    console.log(fileInputEvent.target.files[0]);
  }
  csv4InputChange(fileInputEvent: any) {
    this.FileName4 = fileInputEvent.target.files[0].name;
    console.log(fileInputEvent.target.files[0]);
  }
  csv5InputChange(fileInputEvent: any) {
    this.FileName5 = fileInputEvent.target.files[0].name;
    console.log(fileInputEvent.target.files[0]);
  }
  csv6InputChange(fileInputEvent: any) {
    this.FileName6 = fileInputEvent.target.files[0].name;
    console.log(fileInputEvent.target.files[0]);
  }
  csv7InputChange(fileInputEvent: any) {
    this.FileName7 = fileInputEvent.target.files[0].name;
    console.log(fileInputEvent.target.files[0]);
  }
  nextbtn(): void {
    this._router.navigate(['pages/nextlogin'])
  }
}
export class BankInformation {
  ID !: string;
  Leaf !: number;
  Bill!: string;
  Date!: Date;
  Amount!: number
  BankName!: string;

}
export class BankDetailInformation {
  ID !: string;
  BankName !: string;
  BankAddress!: string;
  IFSC!: string;
  AccountNum!: number

}
export class JKCInformation {
  JKDirectory!: boolean
  political!: boolean
  police!: boolean
  Authority!: boolean
  // sales!:boolean
  // asmname!:boolean
  // headname!:boolean
  // jkc1Name!:string
  // jkcMobile!:number
  // jkcPerson!:string
  // politicalname!:string
  // politicalMobile!:number
  // politicalPerson!:string
  // policeName!:string
  // policeMobile!:number
  // policePerson!:string
  // adminName!:string
  // adminMobile!:number
  // adminperson!:string
  // salesName!:string
  // salesMobile!:number
  // salesPerson!:string
  // asmname1!:string
  // asmnMobile!:number
  // asmnperson!:string
  // headname1!:string
  // headMobile!:number
  // headPerson!:string


}