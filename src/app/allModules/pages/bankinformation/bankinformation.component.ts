import { BankAccountResult, DocumentRequired, GSTOCRResult, ImageResult, PANOCRResult } from './../../../models/master';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  MatIconRegistry,
  MatSnackBar,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatTabChangeEvent,
  MatAccordion,
  MatCheckboxChange
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
import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { BankdialogComponent } from '../bankdialog/bankdialog.component';
import { CommonService } from 'app/services/common.service';
import { saveAs } from "file-saver";

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
  files: File[] = [];
  FileName: any;
  FileName1: any;
  FileName2: any;
  FileName3: any;
  FileName4: any;
  FileName5: any;
  FileName6: any;
  FileName7: any;
  Attach1: DocumentRequired;
  Attach2: DocumentRequired;
  Attach3: DocumentRequired;
  Attach4: DocumentRequired;
  Attach5: DocumentRequired;
  Attach6: DocumentRequired;
  Attach7: DocumentRequired;
  Attach8: DocumentRequired;
  FileError: boolean = true;
  name: any = [];
  public listData: BankDetails[] = [];
  isProgressBarVisibile: boolean;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  authenticationDetails: AuthenticationDetails;
  currentTransaction: number;
  SOption: States[] = [
  ];
  TransID: number;
  bankInfoView: BankDetailsView = new BankDetailsView();
  Tickmark: boolean;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  btn_name: string;
  uploadbtn: boolean;
  AttachmentData: any;
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private _commonService: CommonService, private _router: Router, private _dashboardService: DashboardService, public snackBar: MatSnackBar, public dialog: MatDialog) {
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
    identity.TransID = this.TransID;

    this._dashboardService.ValidateBankAccount(identity.AccountNum, identity.IFSC).subscribe(data => {
      let res = data as BankAccountResult;
      if (res) {
        if (res.valid) {
          this.listData.push(identity);
        } else {
          this.notificationSnackBarComponent.openSnackBar(`${res.message}`, SnackBarStatus.danger);
        }
      } else {
      }
    }, (err) => {
      console.error(err);
      this.notificationSnackBarComponent.openSnackBar(`Invalid Account Number or IFSC Code`, SnackBarStatus.danger);
    });

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
      this.currentTransaction = parseInt(this.authenticationDetails.Token);
    }
    if (localStorage.getItem('category') == "D2RS Retail Stockist") {
      this.Tickmark = true;
    }
    this.TransID = parseInt(localStorage.getItem("TransID"));
    // const retrievedvalue = localStorage.getItem('retail_D2RS');
    // // console.log(retrievedvalue);
    this.BIform = this.fb.group({
      leaf: ['', Validators.required],
      Type: ['', Validators.required],
      Date: ['', Validators.required],
      Amount: ['', Validators.required],
      nameofbank: ['', Validators.required],
    });
    this.BankForm = this.fb.group({
      bankno: ['', Validators.required],
      bankname: ['', Validators.required],
      bankaddress: ['', Validators.required],
      ifsccode: ['', [Validators.required, Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')]],
      bankacno: ['', Validators.required],

    })

    this._dashboardService
      .GetAttachment(this.TransID, "PanCard")
      .subscribe(
        (data) => {
          this.Attach1 = data as DocumentRequired;
        },
        (err) => {
          console.error(err);
        }
      );
    this._dashboardService
      .GetAttachment(this.TransID, "GSTCertificate")
      .subscribe(
        (data) => {
          this.Attach2 = data as DocumentRequired;
        },
        (err) => {
          console.error(err);
        }
      );
    this._dashboardService
      .GetAttachment(this.TransID, "AadharCard")
      .subscribe(
        (data) => {
          this.Attach3 = data as DocumentRequired;
        },
        (err) => {
          console.error(err);
        }
      );
    this._dashboardService
      .GetAttachment(this.TransID, "CancelledCheque")
      .subscribe(
        (data) => {
          this.Attach4 = data as DocumentRequired;
        },
        (err) => {
          console.error(err);
        }
      );
    this._dashboardService
      .GetAttachment(this.TransID, "PartnerPhoto")
      .subscribe(
        (data) => {
          this.Attach5 = data as DocumentRequired;
        },
        (err) => {
          console.error(err);
        }
      );
    this._dashboardService
      .GetAttachment(this.TransID, "TDSDeclaration")
      .subscribe(
        (data) => {
          this.Attach6 = data as DocumentRequired;
        },
        (err) => {
          console.error(err);
        }
      );
    this._dashboardService
      .GetAttachment(this.TransID, "AddressProof")
      .subscribe(
        (data) => {
          this.Attach7 = data as DocumentRequired;
        },
        (err) => {
          console.error(err);
        }
      );
    this._dashboardService
      .GetAttachment(this.TransID, "SignedDocument")
      .subscribe(
        (data) => {
          this.Attach8 = data as DocumentRequired;
        },
        (err) => {
          console.error(err);
        }
      );
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
    // // console.log(this.selectedPersonalInfo.Name);
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
      (err) => {
      // console.log(err)
      }
    );

  }
  ClearAll(): void {
    this.BIform.reset();
  }
  previousbtn(): void {
    this._router.navigate(['pages/businessinformation']);
  }
  GetAttachment(fileName: string, file?: File): void {
    // if (file && file.size) {
    //     const blob = new Blob([file], { type: file.type });
    //     this.OpenAttachmentDialog(fileName, blob);
    // } else {
    this.isProgressBarVisibile = true;
    this._dashboardService
      .DowloandAttachment(fileName, this.TransID)
      .subscribe(
        (data) => {
          if (data) {
            let fileType = "image/jpg";
            fileType = fileName.toLowerCase().includes(".jpg")
              ? "image/jpg"
              : fileName.toLowerCase().includes(".jpeg")
                ? "image/jpeg"
                : fileName.toLowerCase().includes(".png")
                  ? "image/png"
                  : fileName.toLowerCase().includes(".gif")
                    ? "image/gif"
                    : fileName.toLowerCase().includes(".pdf")
                      ? "application/pdf"
                      : "";
            const blob = new Blob([data], { type: fileType });
            const fileURL = URL.createObjectURL(blob);
            this.AttachmentData =
              this.sanitizer.bypassSecurityTrustResourceUrl(
                fileURL
              );
            saveAs(blob, fileName);
            // this.OpenAttachmentDialog(fileName, blob);
          }
          this.isProgressBarVisibile = false;
        },
        (error) => {
          console.error(error);
          this.isProgressBarVisibile = false;
        }
      );
    // }
  }
  GetBankDetails() {
    this.isProgressBarVisibile = true;
    this._dashboardService.GetSecurityDetails(this.TransID).subscribe(res => {
      // console.log("view", res);
      this.bankInfoView = res;
      this.SetSecurityDepositDetailInfoView(this.bankInfoView);
      this.isProgressBarVisibile = false;
    },
      err => {
        // console.log(err);
      });
  }
  CheckBox(event: MatCheckboxChange) {
    if (event.checked == true) {
      this.BIform.disable();
    }
    else {
      this.BIform.enable();
    }
    // console.log("CheckBox", event.checked);

  }
  SetSecurityDepositDetailInfoView(bankInfoView: BankDetailsView = new BankDetailsView()) {
    if (bankInfoView.SecurityDeposit.TransID != null) {
      // businessinformation = businessInfoView.Businessinfo;
      this.BIform.patchValue({
        leaf: bankInfoView.SecurityDeposit.Leaf,
        Type: bankInfoView.SecurityDeposit.Type,
        Date: bankInfoView.SecurityDeposit.Date,
        Amount: bankInfoView.SecurityDeposit.Amount,
        nameofbank: bankInfoView.SecurityDeposit.BankName
      });
      if (localStorage.getItem('ActionStatus') == "Pending") {
        this.BIform.disable();
        this.BankForm.disable();
        this.uploadbtn = true;
      }
      this.listData = bankInfoView.BankDetailInfo;
      // this.BrandForm.patchValue({
      //   sales: ['', Validators.required],
      //   date1: [''],
      //   date2: [''],
      // });
    }
  }
  SubmitButtonClick(isDraft: boolean = false) {
    if (!this.isd2rs) {
      var cobView = new BankDetailsView();
      cobView.SecurityDeposit = this.GetSecurityInfoFromForm();
      cobView.SecurityDeposit.Amount = 0;
      cobView.BankDetailInfo = this.listData;
      // console.log("cobView", cobView);
      if (this.listData.length == 0) {
        this.notificationSnackBarComponent.openSnackBar("Atleast one bank detail is required", SnackBarStatus.danger);
        return;
      }
      if (this.files.length < 8) {
        this.notificationSnackBarComponent.openSnackBar("Please attach required documents!", SnackBarStatus.danger);
        return;
      }

      this.isProgressBarVisibile = true;
      this._dashboardService.SaveBankInfoView(cobView).subscribe(
        (res) => {
          // console.log("From save api", res);
          this.isProgressBarVisibile = false;
          this._dashboardService.AddDocumentRequiredAttachment(this.TransID, this.files, this.Documentname).subscribe(
            (res) => {
              // console.log("Attachment added", res);
              this.isProgressBarVisibile = false;
              this.notificationSnackBarComponent.openSnackBar('Saved successfully', SnackBarStatus.success);
              this._router.navigate(["pages/nextlogin"]);
              this.ClearAll();
            }
          );

        },
        (err) => {
          this.notificationSnackBarComponent.openSnackBar(
            err instanceof Object ? "Something went wrong" : err,
            SnackBarStatus.danger
          );
        }
      );
    }
    else {
      if (this.BIform.valid) {
        var cobView = new BankDetailsView();
        cobView.SecurityDeposit = this.GetSecurityInfoFromForm();
        cobView.BankDetailInfo = this.listData;
        // console.log("cobView", cobView);
        this.isProgressBarVisibile = true;
        this._dashboardService.SaveBankInfoView(cobView).subscribe(
          (res) => {
            // console.log("From save api", res);
            this.isProgressBarVisibile = false;
            this._dashboardService.AddDocumentRequiredAttachment(this.TransID, this.files, this.Documentname).subscribe(
              (res) => {
                // console.log("Attachment added", res);
                this.isProgressBarVisibile = false;
                this.notificationSnackBarComponent.openSnackBar('Saved successfully', SnackBarStatus.success);
                this._router.navigate(["pages/nextlogin"]);
                this.ClearAll();
              }
            );

          },
          (err) => {
            this.notificationSnackBarComponent.openSnackBar(
              err instanceof Object ? "Something went wrong" : err,
              SnackBarStatus.danger
            );
          }
        );
      } else {
        this._commonService.ShowValidationErrors(this.BIform);
      }
    }

  }
  GetSecurityInfoFromForm(): SecurityDepositDetail {
    const personalinformation: SecurityDepositDetail = new SecurityDepositDetail();
    personalinformation.Leaf = this.BIform.get('leaf').value;
    personalinformation.Type = this.BIform.get('Type').value;
    personalinformation.Date = this.BIform.get('Date').value == "" ? new Date() : this.BIform.get('Date').value;
    personalinformation.Amount = this.BIform.get('Amount').value;
    personalinformation.BankName = this.BIform.get('nameofbank').value;
    personalinformation.TransID = this.TransID;
    return personalinformation;
  }
  // GetAttachment(File:any,Tilte):DocumentRequired{
  //   const Attachment: DocumentRequired = new DocumentRequired();
  //   Attachment.AttachmentFile = File;
  //   Attachment.AttachmentName = File.name;
  //   Attachment.ContentLength = File.ContentLength;
  //   Attachment.ID = this.currentTransaction;
  //   Attachment.DocumentTitle = Tilte;
  //   Attachment.ContentType = File.ContentType;
  //   this.files.push(Attachment);
  //   return Attachment;
  // }
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
    //     // console.log(data);
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
  //     // console.log(`Dialog result: ${result}`);
  //   });
  //   const personalinformation: BankInformation = new BankInformation();
  //   personalinformation.Leaf = this.BIform.get('leaf').value;
  //   personalinformation.Bill = this.BIform.get('Leafno').value;
  //   personalinformation.Date = this.BIform.get('Date').value;
  //   personalinformation.Amount = this.BIform.get('Amount').value;
  //   personalinformation.BankName = this.BIform.get('nameofbank').value;

  //   this._dashboardService.AddBankInfo(personalinformation).subscribe(
  //     (data) => {
  //       // console.log(data);
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
  //       // console.log(data);
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

    if (event.target && event.target.files && event.target.files.length) {
      // const reader = new FileReader();
      // reader.readAsDataURL(event.target.files[0]);
      // reader.onload = () => {
      //    // console.log(reader.result);

         this._dashboardService.UploadImage(event.target.files[0]).subscribe(
          data => {
            let res = data as ImageResult;
            if (res) {
              this._dashboardService.ExtractPANDetails(res._id).subscribe(
                data1 => {
                  let res1 = data1 as PANOCRResult;
                  if (res1.valid) {
                    this.handleFileInput(event, "PanCard");
                    this.FileName = event.target.files[0].name;
                    this.FileError = false;
                  } else {
                    this.notificationSnackBarComponent.openSnackBar(`${res1.message}`, SnackBarStatus.danger);
                  }
                },
                err1 => {
                  console.error(err1);
                }
              )
            }
          },
          err => {
            console.error(err);
          }
        )

      // };
      // this.handleFileInput(event, "PanCard");
      // this.FileName = event.target.files[0].name;
      // this.FileError = false;
    }
    // // console.log(fileInputEvent.target.files[0]);
    // this.GetAttachment(fileInputEvent.target.files[0],"PAN");
  }
  onSelect(event) {
    this.files[0] = event.addedFiles[0];
    // this.SelectedFileName=this.files[0].name;
    // this.File  Error=false;
  }
  csv1InputChange(event) {

    if (event.target && event.target.files && event.target.files.length) {
      this._dashboardService.UploadImage(event.target.files[0]).subscribe(
        data => {
          let res = data as ImageResult;
          if (res) {
            this._dashboardService.ExtractGSTDetails(res._id).subscribe(
              data1 => {
                let res1 = data1 as GSTOCRResult;
                if (res1.valid) {
                  this.FileName1 = event.target.files[0].name;
                  // // console.log(fileInputEvent.target.files[0]);
                  this.handleFileInput(event, "GSTCertificate");
                } else {
                  this.notificationSnackBarComponent.openSnackBar(`${res1.message}`, SnackBarStatus.danger);
                }
              },
              err1 => {
                console.error(err1);
              }
            )
          }
        },
        err => {
          console.error(err);
        }
      )
      // this.FileName1 = event.target.files[0].name;
      // // // console.log(fileInputEvent.target.files[0]);
      // this.handleFileInput(event, "GSTCertificate");
    }


    // this.GetAttachment(fileInputEvent.target.files[0],"GST");
  }
  csv2InputChange(event) {
    this.FileName2 = event.target.files[0].name;
    // // console.log(fileInputEvent.target.files[0]);
    // this.GetAttachment(fileInputEvent.target.files[0],"AADHAR CARD");
    this.handleFileInput(event, "AadharCard");
  }
  csv3InputChange(event) {
    this.FileName3 = event.target.files[0].name;
    // // console.log(fileInputEvent.target.files[0]);
    // this.GetAttachment(fileInputEvent.target.files[0],"Cancelled Cheque");
    this.handleFileInput(event, "CancelledCheque");
  }
  csv4InputChange(event) {
    this.handleFileInput(event, "PartnerPhoto");
    this.FileName4 = event.target.files[0].name;
    // // console.log(fileInputEvent.target.files[0]);
    // this.GetAttachment(fileInputEvent.target.files[0],"Photograph");
  }
  csv5InputChange(event) {
    this.handleFileInput(event, "TDSDeclaration");
    this.FileName5 = event.target.files[0].name;
    // // console.log(fileInputEvent.target.files[0]);
    // this.GetAttachment(fileInputEvent.target.files[0],"TDS");
  }
  csv6InputChange(event) {
    this.handleFileInput(event, "AddressProof");
    this.FileName6 = event.target.files[0].name;
    // // console.log(fileInputEvent.target.files[0]);
    // this.GetAttachment(fileInputEvent.target.files[0],"Address Proof");
  }
  csv7InputChange(event) {
    this.handleFileInput(event, "SignedDocument");
    this.FileName7 = event.target.files[0].name;
    // // console.log(fileInputEvent.target.files[0]);
    // this.GetAttachment(fileInputEvent.target.files[0],"Signed Digital Document");
  }
  nextbtn(): void {
    this._router.navigate(['pages/nextlogin'])
  }
  public Documentname = '';
  public PanCard;
  public GSTCertificate;
  public AadharCard;
  public CancelledCheque;
  public PartnerPhoto;
  public TDSDeclaration;
  public AddressProof;
  public SignedDocument;
  handleFileInput(event, Filename: string): DocumentRequired {
    const File = new DocumentRequired();
    File.AttachmentName = event.target.files[0].name;
    File.ContentType = event.target.files[0].type;
    File.ContentLength = event.target.files[0].size;
    const selectedFiles = event.target.files[0];
    File.AttachmentFile = selectedFiles;
    File.DocumentTitle = Filename;
    if (Filename == "PanCard") {
      this.PanCard = Filename;
      this.Documentname += [this.PanCard, ''].join(', ');
    }
    if (Filename == "GSTCertificate") {
      this.GSTCertificate = Filename;
      this.Documentname += [this.GSTCertificate, ''].join(', ');
    }
    if (Filename == "AadharCard") {
      this.AadharCard = Filename;
      this.Documentname += [this.AadharCard, ''].join(', ');
    }
    if (Filename == "CancelledCheque") {
      this.CancelledCheque = Filename;
      this.Documentname += [this.CancelledCheque, ''].join(', ');
    }
    if (Filename == "PartnerPhoto") {
      this.PartnerPhoto = Filename;
      this.Documentname += [this.PartnerPhoto, ''].join(', ');
    }
    if (Filename == "TDSDeclaration") {
      this.TDSDeclaration = Filename;
      this.Documentname += [this.TDSDeclaration, ''].join(', ');
    }
    if (Filename == "AddressProof") {
      this.AddressProof = Filename;
      this.Documentname += [this.AddressProof, ''].join(', ');
    }
    if (Filename == "SignedDocument") {
      this.SignedDocument = Filename;
      this.Documentname += [this.SignedDocument, ''].join(', ');
    }
    // this.Documentname += [this.PanCard,this.GSTCertificate,this.AadharCard,this.CancelledCheque,this.PartnerPhoto,this.TDSDeclaration,this.AddressProof,this.SignedDocument].join(', ');
    // this.Documentname = this.Documentname.concat(this.PanCard,this.GSTCertificate,this.AadharCard,this.CancelledCheque,this.PartnerPhoto,this.TDSDeclaration,this.AddressProof,this.SignedDocument);
    // console.log("Doc Name", this.Documentname);
    // console.log(File);
    this.files.push(selectedFiles);
    return File;
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
  AlphabetsonlyOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode === 8 || charCode === 9 || charCode === 13 || charCode === 46
      || charCode === 37 || charCode === 39 || charCode === 123 || charCode === 190 || charCode === 32) {
      return true;
    }
    else if (charCode < 65 || charCode > 122) {
      return false;
    }
    return true;
  }
}
