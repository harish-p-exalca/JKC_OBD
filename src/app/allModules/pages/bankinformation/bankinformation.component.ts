import { DocumentRequired } from './../../../models/master';
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
import { AuthenticationDetails, BankDetails, BankDetailsView, PersonalInfo, SecurityDepositDetail, States } from 'app/models/master';
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
  SelectedFile
  files:any[] = [];
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
  isProgressBarVisibile:boolean;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  authenticationDetails: AuthenticationDetails;
  currentTransaction: number;
  SOption: States[] = [
  ];
  bankInfoView: BankDetailsView = new BankDetailsView();
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private fb: FormBuilder,private _commonService: CommonService, private _router: Router, private _dashboardService: DashboardService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.isProgressBarVisibile = false;
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar), this.listData = [];
  }
  IdentityData: BankDetails[] = [];
    IdentityAddClicked() {
        // if (this.BIform.valid) {
            var identity = new BankDetails();
            identity.AccountNum = this.BankForm.get("bankacno").value;
            identity.BankAddress = this.BankForm.get("bankaddress").value;
            identity.BankName = this.BankForm.get("bankname").value;
            identity.IFSC = this.BankForm.get("ifsccode").value;
            identity.TransID = this.currentTransaction;
            this.listData.push(identity);
            // this.listData[this.listData.length - 1].id = this.listData.length.toString();
            // this.BIform.reset();
        // } else {
        //     this._commonService.ShowValidationErrors(this.BIform);
        // }
    }
  BIform!: FormGroup;
  BankForm!: FormGroup;
  selectedPersonalInfo: PersonalInfo = null;
  ngOnInit(): void {
    const retrievedObject = localStorage.getItem('authorizationData');
    if (retrievedObject) {
      this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
      this.currentTransaction=parseInt(this.authenticationDetails.Token);
    }
    // const retrievedvalue = localStorage.getItem('retail_D2RS');
    // console.log(retrievedvalue);
    this.BIform = this.fb.group({
      leaf: ['', Validators.required],
      Type: ['', Validators.required],
      Date: ['', Validators.required],
      Amount: ['', Validators.required],
      nameofbank: ['', Validators.required],
    });
  this.BankForm = this.fb.group({
    bankno: ['',Validators.required],
    bankname: ['', Validators.required],
    bankaddress: ['', Validators.required],
    ifsccode: ['', Validators.required],
    bankacno: ['', Validators.required],
  })
    // if (retrievedvalue == 'ok') {
    //   this.isd2rs = true;
    //   this.BIform.get('leaf').disable();
    //   this.BIform.get('Leafno').disable();
    //   this.BIform.get('Date').disable();
    //   this.BIform.get('Amount').disable();
    //   this.BIform.get('nameofbank').disable();
    // }
    // else {
    //   this.BIform.get('leaf').enable();
    //   this.BIform.get('Leafno').enable();
    //   this.BIform.get('Date').enable();
    //   this.BIform.get('Amount').enable();
    //   this.BIform.get('nameofbank').enable();
    //   this.isd2rs = false;
    // }
    // this.selectedPersonalInfo = this._dashboardService.GetPersonalInfo();
    // console.log(this.selectedPersonalInfo.Name);
    // this.name = this.selectedPersonalInfo.Name;
    this.isProgressBarVisibile = true;
    this._dashboardService.SetPersonalInfo(null);
    this.isProgressBarVisibile = true;
    this._dashboardService.GetAllStates().subscribe(
      (data) => {
          this.SOption = data;
          this.GetBankDetails();
          this.isProgressBarVisibile = false;
      },
      (err) => console.log(err)
  );
  }
  ClearAll(): void {
    this.BIform.reset();
  }
  previousbtn(): void {
    this._router.navigate(['pages/marketinformation']);
  }

  GetBankDetails() {
    this.isProgressBarVisibile = true;
    this._dashboardService.GetSecurityDetails(this.currentTransaction).subscribe(res => {
      console.log("view", res);
      this.bankInfoView = res;
      this.SetSecurityDepositDetailInfoView(this.bankInfoView);
      this.isProgressBarVisibile = false;
  },
      err => {
          console.log(err);
      });
  }
  SetSecurityDepositDetailInfoView( bankInfoView: BankDetailsView = new BankDetailsView()) {
    if (bankInfoView.SecurityDeposit.TransID != null) {
      // businessinformation = businessInfoView.Businessinfo;
      this.BIform.patchValue({
        leaf: bankInfoView.SecurityDeposit.Leaf,
        Leafno: bankInfoView.SecurityDeposit.Type,
        Date: bankInfoView.SecurityDeposit.Date,
        Amount: bankInfoView.SecurityDeposit.Amount,
        nameofbank:bankInfoView.SecurityDeposit.BankName
      });
      // this.BrandForm.patchValue({
      //   sales: ['', Validators.required],
      //   date1: [''],
      //   date2: [''],
      // });
    }
  }
  SubmitButtonClick(isDraft: boolean = false) {
    // if (this.BIform.valid) {
        var cobView = new BankDetailsView();
        cobView.SecurityDeposit = this.GetSecurityInfoFromForm();
        cobView.BankDetailInfo = this.listData;
        // cobView.Documentsrequired = this.files;
        console.log("cobView", cobView);
        this.isProgressBarVisibile = true;
        this._dashboardService.SaveBankInfoView(cobView).subscribe(
            (res) => {
                console.log("From save api", res);
                this._router.navigate(["pages/bankinformation"]);
                this.isProgressBarVisibile = false;
                this.ClearAll();
            },
            (err) => {
                this.notificationSnackBarComponent.openSnackBar(
                    err instanceof Object ? "Something went wrong" : err,
                    SnackBarStatus.danger
                );
            }
        );
    // } else {
    //     this._commonService.ShowValidationErrors(this.BIform);
    // }
}
GetSecurityInfoFromForm(): SecurityDepositDetail {
  const personalinformation: SecurityDepositDetail = new SecurityDepositDetail();
    personalinformation.Leaf = this.BIform.get('leaf').value;
    personalinformation.Type = this.BIform.get('Type').value;
    personalinformation.Date = this.BIform.get('Date').value;
    personalinformation.Amount = this.BIform.get('Amount').value;
    personalinformation.BankName = this.BIform.get('nameofbank').value;
    personalinformation.TransID = this.currentTransaction;
  return personalinformation;
}
GetAttachment(File:any,Tilte):DocumentRequired{
  const Attachment: DocumentRequired = new DocumentRequired();
  Attachment.AttachmentFile = File;
  Attachment.AttachmentName = File.name;
  Attachment.ContentLength = File.ContentLength;
  Attachment.ID = this.currentTransaction;
  Attachment.DocumentTitle = Tilte;
  Attachment.ContentType = File.ContentType;
  this.files.push(Attachment);
  return Attachment;
}
  onAdd(): void {
    // if(this.BIform.valid)
    // {

    //this.listData.push(this.BIform.value);
    this.IdentityAddClicked();
    // this.BIform.reset();
     //this.listData[this.listData.length - 1].id = this.listData.length.toString();
    // const personalinformation: BankDetails = new BankDetails();
    // personalinformation.BankName = this.BIform.get('bankname').value;
    // personalinformation.BankAddress = this.BIform.get('bankaddress').value;
    // personalinformation.IFSC = this.BIform.get('ifsccode').value;
    // personalinformation.AccountNum = this.BIform.get('bankacno').value;
    // this._dashboardService.AddBankDetInfo(personalinformation).subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.notificationSnackBarComponent.openSnackBar('Saved successfully', SnackBarStatus.success);
    //     // this._router.navigate(['pages/nextlogin']);
    //   },
    //   (err) => {

    //     console.error(err);
    //     this.notificationSnackBarComponent.openSnackBar('Something went wrong', SnackBarStatus.danger);
    //   },
    // );
  //}
  // else{
  //   this._commonService.ShowValidationErrors(this.BIform);
  // }



  }
  remove() {

  }
  // additem(row: BankDetailInformation) {

  // }
  // saveInfo(): void {
  //   if(this.BIform.valid){

 
  //   //1st
  //   const dialogRef = this.dialog.open(BankdialogComponent, {
  //     width: "53%",


  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  //   const personalinformation: BankInformation = new BankInformation();
  //   personalinformation.Leaf = this.BIform.get('leaf').value;
  //   personalinformation.Bill = this.BIform.get('Leafno').value;
  //   personalinformation.Date = this.BIform.get('Date').value;
  //   personalinformation.Amount = this.BIform.get('Amount').value;
  //   personalinformation.BankName = this.BIform.get('nameofbank').value;

  //   this._dashboardService.AddBankInfo(personalinformation).subscribe(
  //     (data) => {
  //       console.log(data);
  //       // this.notificationSnackBarComponent.openSnackBar('Saved successfully', SnackBarStatus.success);
  //       this._router.navigate(['pages/businessinformation']);
  //     },
  //     (err) => {

  //       console.error(err);
  //       // this.notificationSnackBarComponent.openSnackBar('Something went wrong', SnackBarStatus.danger);
  //     },
  //   );

  //   //jkc connection
  //   const personalinformation1: JKCInformation = new JKCInformation();
  //   personalinformation1.JKDirectory = this.BIform.get('jkc1').value;
  //   personalinformation1.political = this.BIform.get('politicalParty').value;
  //   personalinformation1.police = this.BIform.get('police').value;
  //   personalinformation1.Authority = this.BIform.get('admin').value;

  //   this._dashboardService.AddconnectionInfo(personalinformation1).subscribe(
  //     (data) => {
  //       console.log(data);
  //       // this.notificationSnackBarComponent.openSnackBar('Saved successfully', SnackBarStatus.success);
  //       this._router.navigate(['pages/businessinformation']);
  //     },
  //     (err) => {

  //       console.error(err);
  //       // this.notificationSnackBarComponent.openSnackBar('Something went wrong', SnackBarStatus.danger);
  //     },
  //   );

  // }
  // else
  // {
  //   this._commonService.ShowValidationErrors(this.BIform);
  // }


  // }
  
  csvInputChange(event) {
    this.files[0]=event.addedFiles[0];
    console.log(this.files[0]);
    
    // this.FileName = fileInputEvent.target.files[0].name;
    // console.log(fileInputEvent.target.files[0]);
    // this.GetAttachment(fileInputEvent.target.files[0],"PAN");
  }
  onSelect(event) {
    this.files[0]=event.addedFiles[0];
    // this.SelectedFileName=this.files[0].name;
    // this.File  Error=false;
  }
  csv1InputChange(fileInputEvent: any) {
  
    this.FileName1 = fileInputEvent.target.files[0].name;
    console.log(fileInputEvent.target.files[0]);
    this.GetAttachment(fileInputEvent.target.files[0],"GST");
  }
  csv2InputChange(fileInputEvent: any) {
    this.FileName2 = fileInputEvent.target.files[0].name;
    console.log(fileInputEvent.target.files[0]);
    this.GetAttachment(fileInputEvent.target.files[0],"AADHAR CARD");
  }
  csv3InputChange(fileInputEvent: any) {
    this.FileName3 = fileInputEvent.target.files[0].name;
    console.log(fileInputEvent.target.files[0]);
    this.GetAttachment(fileInputEvent.target.files[0],"Cancelled Cheque");
  }
  csv4InputChange(fileInputEvent: any) {
    this.FileName4 = fileInputEvent.target.files[0].name;
    console.log(fileInputEvent.target.files[0]);
    this.GetAttachment(fileInputEvent.target.files[0],"Photograph");
  }
  csv5InputChange(fileInputEvent: any) {
    this.FileName5 = fileInputEvent.target.files[0].name;
    console.log(fileInputEvent.target.files[0]);
    this.GetAttachment(fileInputEvent.target.files[0],"TDS");
  }
  csv6InputChange(fileInputEvent: any) {
    this.FileName6 = fileInputEvent.target.files[0].name;
    console.log(fileInputEvent.target.files[0]);
    this.GetAttachment(fileInputEvent.target.files[0],"Address Proof");
  }
  csv7InputChange(fileInputEvent: any) {
    this.FileName7 = fileInputEvent.target.files[0].name;
    console.log(fileInputEvent.target.files[0]);
    this.GetAttachment(fileInputEvent.target.files[0],"Signed Digital Document");
  }
  nextbtn(): void {
    this._router.navigate(['pages/nextlogin'])
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
}
