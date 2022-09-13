import {
    BankDetailsView,
    CustomerOnboarding,
    AverageSale,
    BankDetails,
    DocumentRequired,
    AttachmentDetails,
    PersonalInformation,
    PersonalInformationView,
    MarketInformation,
    BusinessInformation,
    SecurityDepositDetail,
    BankAccountResult,
} from "./../../../models/master";

import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { CustomerOnboardingView1 } from "./../../../models/master";
// import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
    AuthenticationDetails,
    BusinessInformationView,
    Cities,
    CustomerOnboardingView,
    MarketInformationView,
    PersonIdentity,
    States,
} from "app/models/master";
import { DashboardService } from "app/services/dashboard.service";
import { Monthlysales } from "../business/business.component";
import { NotificationSnackBarComponent } from "app/notifications/notification-snack-bar/notification-snack-bar.component";
import {
    MatDialog,
    MatDialogConfig,
    MatSnackBar,
    MatTableDataSource,
} from "@angular/material";
import { SnackBarStatus } from "app/notifications/snackbar-status-enum";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { saveAs } from "file-saver";
import { of } from "rxjs";
import { id } from "@swimlane/ngx-charts/release/utils";
import { CommonService } from "app/services/common.service";
import { runInThisContext } from "vm";

export interface Element {
    Role: string;
    Name: string;
    MobileNo: string;
    Emailid: string;
}
export interface BElement {
    BankDetailNo: string;
    BankName: string;
    BankAddress: string;
    IFSCCode: string;
    BankAcNumber: string;
}
export interface AverageSource {
    White_Cement_Wall_Putty: string;
    WP_Avg_Month_Sales: string;
    WC_Avg_Month_sales: string;
}
export interface SaleSource {
    Sale: string;
    Jan: string;
    Feb: string;
    Mar: string;
    Apr: string;
    May: string;
    Jun: string;
    Jul: string;
    Aug: string;
    Sep: string;
    Oct: string;
    Nov: string;
    Dec: string;
}
const datas: Element[] = [
    {
        Role: "1",
        Name: "prasath",
        MobileNo: "9486740455",
        Emailid: "prasath@exalca.com",
    },
];
const bdatas: BElement[] = [
    {
        BankDetailNo: "1",
        BankName: "SBI",
        BankAddress: "R.K.V, Layout",
        IFSCCode: "SBIN0005943",
        BankAcNumber: "1230456987456321",
    },
];
const avgdatasource: AverageSource[] = [
    {
        White_Cement_Wall_Putty: "prasath",
        WP_Avg_Month_Sales: "prasath",
        WC_Avg_Month_sales: "prasath",
    },
];

const sales: SaleSource[] = [
    {
        Sale: "WallmaxX",
        Jan: "jan",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
    },
    {
        Sale: "Woodamore",
        Jan: "jan",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
    },
    {
        Sale: "ShieldmaxX",
        Jan: "jan",
        Feb: "",
        Mar: "",
        Apr: "",
        May: "",
        Jun: "",
        Jul: "",
        Aug: "",
        Sep: "",
        Oct: "",
        Nov: "",
        Dec: "",
    },
];
@Component({
    selector: "app-reportsview",
    templateUrl: "./reportsview.component.html",
    styleUrls: ["./reportsview.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ReportsviewComponent implements OnInit {
    bank: any;
    selectedrowdata: any[] = [];
    bankaddbtn: boolean = false;
    SelectedDeselectRow: number;
    btnStyle = 'default-btn';
    personalbtn: boolean = true;
    marketbtn: boolean = false;
    bankbtn: boolean = false;
    businessbtn: boolean = false;
    PIform: FormGroup;
    MIform!: FormGroup;
    BrandForm!: FormGroup;
    BIform!: FormGroup;
    BrandForm1!: FormGroup;
    BIform1!: FormGroup;
    firmForm!: FormGroup;
    ContactForm!: FormGroup;
    contactDetailsColumns: string[] = ["Role", "Name", "MobileNo", "Emailid"];
    contactdataSource: MatTableDataSource<PersonIdentity>;
    //contactdataSource = MatTableDataSource<any>;
    Contactdetails: any[] = [];
    bankdetails: any[] = [];
    bankdetailsdataSource: MatTableDataSource<BankDetails>;
    bankDetailsColumns: string[] = [
        "BankDetailNo",
        "BankName",
        "BankAddress",
        "IFSCCode",
        "BankAcNumber",
    ];
    averageSalesColumns: string[] = [
        "White_Cement_Wall_Putty",
        "WP_Avg_Month_Sales",
        "WC_Avg_Month_sales",
    ];
    averageSalesDetails: any[] = [];

    averageSalesDataSource: MatTableDataSource<AverageSale>;
    saleColumns: string[] = [
        "Sale",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    brandName: string[] = [
        "Birla",
        "JK Cement",
        "JK Laxmi",
        "Asian Paints",
        "Berger",
        "Nerolac",
        "Other Paint Cos",
        "Other Local Brands",
    ];
    saleDataSource = sales;
    authenticationDetails: AuthenticationDetails;
    currentTransaction: number;
    SOption: States[] = [];
    City: Cities[] = [];
    selected = "";
    IdentityData: PersonIdentity[] = [];
    CustomerObdView: CustomerOnboardingView = new CustomerOnboardingView();
    transID: any;
    bankInfoView: BankDetailsView = new BankDetailsView();
    MarketInfoView: MarketInformationView = new MarketInformationView();
    businessInfoView: BusinessInformationView = new BusinessInformationView();
    notificationSnackBarComponent: NotificationSnackBarComponent;
    Role: any;
    ApprovalButton: boolean = false;
    isProgressBarVisibile: boolean;
    DepositForm!: FormGroup;
    BankForm!: FormGroup;
    Attach1: DocumentRequired;
    Attach2: DocumentRequired;
    Attach3: DocumentRequired;
    Attach4: DocumentRequired;
    Attach5: DocumentRequired;
    Attach6: DocumentRequired;
    Attach7: DocumentRequired;
    Attach8: DocumentRequired;
    leaflist: string[] = ["DD", "RTGS UTR", "NEFT", "IMPS", "Cheque"];
    AttachmentFiles: File[] = [];
    isd2rs: boolean = false;
    fileUrl;
    AttachmentData: any;
    Noview: boolean = false;
    // bankedit: boolean = false;
    public listData: any;
    public BankData: BankDetails[] = [];
    bankupate: any;
    public AttachmentView: boolean = false;
    constructor(
        private fb: FormBuilder,
        private sanitizer: DomSanitizer,
        private dialog: MatDialog,
        private _dashboardService: DashboardService,
        public snackBar: MatSnackBar,
        private _router: Router,
        private _commonService: CommonService
    ) {
        this.notificationSnackBarComponent = new NotificationSnackBarComponent(
            this.snackBar
        );
        //this.listData = [];
    }

    ngOnInit() {
        const retrievedObject = localStorage.getItem("authorizationData");
        if (retrievedObject) {
            this.authenticationDetails = JSON.parse(
                retrievedObject
            ) as AuthenticationDetails;
            this.currentTransaction = parseInt(
                this.authenticationDetails.Token
            );
            this.Role = this.authenticationDetails.UserRole;
        }
        this.InitializeFormGroup();
        this.transID = localStorage.getItem("TransID");
        // if (
        //     localStorage.getItem("ActionStatus") == "Approved" ||
        //     localStorage.getItem("ActionStatus") == "Rejected"
        // ) {
        //     this.ApprovalButton = true;
        // }
        if (this.transID != null) {
            this.isProgressBarVisibile = true;
            this._dashboardService
                .GetCustomerOnboardingView(this.transID)
                .subscribe(
                    (res) => {
                        // console.log("view", res);
                        this.CustomerObdView = res;
                        this.SetPersonalInfoValues();
                        this.isProgressBarVisibile = false;
                    },
                    (err) => {
                        // console.log(err);
                    }
                );
            this._dashboardService
                .GetMarketInformationView(this.transID)
                .subscribe(
                    (res) => {
                        // console.log("view", res);
                        this.MarketInfoView = res;
                        this.SetMarketInfoDetails(this.MarketInfoView);
                        this.isProgressBarVisibile = false;
                    },
                    (err) => {
                        // console.log(err);
                    }
                );
            this._dashboardService
                .GetBusinessInformationView(this.transID)
                .subscribe(
                    (res) => {
                        // console.log("view", res);
                        this.businessInfoView = res;
                        this.SetBusinessInfoDetails(this.businessInfoView);
                        this.isProgressBarVisibile = false;
                    },
                    (err) => {
                        // console.log(err);
                    }
                );
            this._dashboardService.GetSecurityDetails(this.transID).subscribe(
                (res) => {
                    // console.log("view", res);
                    this.bankInfoView = res;
                    this.SetSecurityDepositDetailInfoView(this.bankInfoView);
                    this.isProgressBarVisibile = false;
                },
                (err) => {
                    // console.log(err);
                }
            );

            this._dashboardService
                .GetAttachment(this.transID, "PanCard")
                .subscribe(
                    (data) => {
                        this.Attach1 = data as DocumentRequired;
                    },
                    (err) => {
                        console.error(err);
                    }
                );
        }
        this._dashboardService
            .GetAttachment(this.transID, "GSTCertificate")
            .subscribe(
                (data) => {
                    this.Attach2 = data as DocumentRequired;
                },
                (err) => {
                    console.error(err);
                }
            );
        this._dashboardService
            .GetAttachment(this.transID, "AadharCard")
            .subscribe(
                (data) => {
                    this.Attach3 = data as DocumentRequired;
                },
                (err) => {
                    console.error(err);
                }
            );
        this._dashboardService
            .GetAttachment(this.transID, "CancelledCheque")
            .subscribe(
                (data) => {
                    this.Attach4 = data as DocumentRequired;
                },
                (err) => {
                    console.error(err);
                }
            );
        this._dashboardService
            .GetAttachment(this.transID, "PartnerPhoto")
            .subscribe(
                (data) => {
                    this.Attach5 = data as DocumentRequired;
                },
                (err) => {
                    console.error(err);
                }
            );
        this._dashboardService
            .GetAttachment(this.transID, "TDSDeclaration")
            .subscribe(
                (data) => {
                    this.Attach6 = data as DocumentRequired;
                },
                (err) => {
                    console.error(err);
                }
            );
        this._dashboardService
            .GetAttachment(this.transID, "AddressProof")
            .subscribe(
                (data) => {
                    this.Attach7 = data as DocumentRequired;
                },
                (err) => {
                    console.error(err);
                }
            );
        this._dashboardService
            .GetAttachment(this.transID, "SignedDocument")
            .subscribe(
                (data) => {
                    this.Attach8 = data as DocumentRequired;
                },
                (err) => {
                    console.error(err);
                }
            );

        this.firmForm = this.fb.group({

            Status: [""],
            Name1: ["", Validators.required],
            Mobile1: [
                "",
                [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)],
            ],
            email1: [
                "",
                [
                    Validators.required,
                    Validators.pattern(
                        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                    ),
                ],
            ],

        });
        this.MIform = this.fb.group({
            market: [""],
            Population: [""],
            Potential: ["", Validators.required],
            Stockist: [""],
            Distance: [""],
            NameOfNearest: [""],
            YearOfEstablished: ["", Validators.required],
            AreasStockist: [""],
            TotalPotential: ["", Validators.required],
            JKAvg: ["", Validators.required],
            Pan: [
                "",
                [
                    Validators.required,
                    Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
                ],
            ],
            Gst: [
                "",
                [
                    Validators.required,
                    Validators.pattern(
                        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
                    ),
                ],
            ],
            PartyBackground: ["", Validators.required],
        });
        if (this.Role == "ASM" || this.Role == "Stockist") {
            this.AttachmentView = true;
        }
        this.BrandForm = this.fb.group({
            brand: ["", Validators.required],
            wpMonth: [""],
            wcMonth: [""],
        });
        this.BIform = this.fb.group({
            NoOfYears: ["", Validators.required],
            NoOfYears1: ["", Validators.required],
            NoOfYears2: ["", Validators.required],
            capitalinvest: ["", Validators.required],
            storagecapacity: ["", Validators.required],
            retail: ["", Validators.required],
            vehicle: ["", Validators.required],
            Wholesale: ["", Validators.required],
        });
        this.BrandForm1 = this.fb.group({
            sales: ["", Validators.required],
            date1: [""],
            date2: [""],
        });
        this.BIform1 = this.fb.group({
            leaf: ["", Validators.required],
            Leafno: ["", Validators.required],
            Date: ["", Validators.required],
            Amount: ["", Validators.required],
            nameofbank: ["", Validators.required],
            bankno: [""],
            bankname: ["", Validators.required],
            bankaddress: ["", Validators.required],
            ifsccode: ["", Validators.required],
            bankacno: ["", Validators.required],
            jkc1: ["", Validators.required],
            politicalParty: ["", Validators.required],
            police: ["", Validators.required],
            admin: ["", Validators.required],
            sales: ["", Validators.required],
            asmname: ["", Validators.required],
            headname: ["", Validators.required],
            jkc1Name: [""],
            jkcMobile: [""],
            jkcPerson: [""],
            politicalname: [""],
            politicalMobile: [""],
            politicalPerson: [""],
            policeName: [""],
            policeMobile: [""],
            policePerson: [""],
            adminName: [""],
            adminMobile: [""],
            adminperson: [""],
            salesName: [""],
            salesMobile: [""],
            salesPerson: [""],
            asmname1: [""],
            asmnMobile: [""],
            asmnperson: [""],
            headname1: [""],
            headMobile: [""],
            headPerson: [""],
            declare: [""],
            billing: [],
        });
        this.DepositForm = this.fb.group({
            leaf: ["", Validators.required],
            Type: ["", Validators.required],
            Date: ["", Validators.required],
            Amount: ["", Validators.required],
            nameofbank: ["", Validators.required],
        });
        this.BankForm = this.fb.group({
            // bankno: ["", Validators.required],
            bankname: ["", Validators.required],
            bankaddress: ["", Validators.required],
            ifsccode: [
                "",
                [
                    Validators.required,
                    Validators.pattern("^[A-Z]{4}0[A-Z0-9]{6}$"),
                ],
            ],
            bankacno: ["", Validators.required],
        });
    }
    btnclicked(value) {
        this.personalbtn = false;
        this.marketbtn = false;
        this.bankbtn = false;
        this.businessbtn = false;
        switch (value) {

            case 1: {
                this.personalbtn = !this.personalbtn;
                break;
            }
            case 2: {

                this.marketbtn = !this.marketbtn;
                break;
            }
            case 3: {

                this.bankbtn = !this.bankbtn;
                break;
            }
            case 4: {
                this.businessbtn = !this.businessbtn;
                break;
            }

        }
    }
    scroll(el: HTMLElement) {
        el.scrollIntoView();
    }
    InitializeFormGroup() {
        this.PIform = this.fb.group({
            category: ["", Validators.required],
            product: ["", Validators.required],
            Name: ["", Validators.required],
            Address: ["", Validators.required],
            latitude: [""],
            longitude: [""],
            District: ["", Validators.required],
            City: ["", Validators.required],
            Taluka: ["", Validators.required],
            Tehsil: ["", Validators.required],
            State: ["", Validators.required],
            Pincode: [
                "",
                [
                    Validators.required,
                    Validators.pattern(/^(\d{6}|\d{7}|\d{8}|\d{9}|\d{10})$/),
                ],
            ],
            AccountGroup: ["", Validators.required],
            DistributionChannel: ["", Validators.required],
            Division: ["", Validators.required],
            SalesOrg: ["", Validators.required],
            Region: ["", Validators.required],
            Status: ["", Validators.required],
        });
        this.ContactForm = this.fb.group({
            Firm: [""],
            DOB: [""],
            mobilenumber1: [""],
            mobilenumber2: [""],
            mail2: [""],
            mail1: [""],
            name: [""]
        })
        // this.firmForm = this.fb.group({

        //     Status: [""],
        //     Name1: ["", Validators.required],
        //     Mobile1: [
        //         "",
        //         [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)],
        //     ],
        //     email1: [
        //         "",
        //         [
        //             Validators.required,
        //             Validators.pattern(
        //                 /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        //             ),
        //         ],
        //     ],

        // });
    }
    rowSelected(item, index) {
        this.SelectedDeselectRow = index;
        this.selectedrowdata.push(item);
        this.BankForm.get('bankacno').patchValue(item.AccountNum)
        this.BankForm.get('bankaddress').patchValue(item.BankAddress)
        this.BankForm.get('bankname').patchValue(item.BankName)
        this.BankForm.get('ifsccode').patchValue(item.IFSC)


        // this.BankData = this.BankData.filter(
        //     (item,index) => index === this.BankData.indexOf(item)
        // );
        // console.log(this.BankData);
        // this.BankForm.reset();

    }
    bankAddClicked() {
        // console.log("this )
        if (this.BankForm.valid) {
            console.log("Inside");
            if (this.BankData.every(x => x.AccountNum != this.BankForm.get('bankacno').value) && this.selectedrowdata[0]) {
                var identity = new BankDetails();
                identity.AccountNum = this.BankForm.get("bankacno").value;
                identity.BankAddress = this.BankForm.get("bankaddress").value;
                identity.BankName = this.BankForm.get("bankname").value;
                identity.IFSC = this.BankForm.get("ifsccode").value;
                identity.TransID = this.transID;
                this._dashboardService.ValidateBankAccount(identity.AccountNum, identity.IFSC).subscribe(data => {
                   
                    let res = data as BankAccountResult;
                    if (res) {
                        this.BankForm.reset();
                        if (res.valid) {
                            this.listData.push(identity);
                        } else {
                            this.notificationSnackBarComponent.openSnackBar(`${res.message}`, SnackBarStatus.danger);

                        }
                    } else {
                    }
                }, (err) => {
                    console.error(err);
                    this.BankForm.reset();
                    this.notificationSnackBarComponent.openSnackBar(`Invalid Account Number or IFSC Code`, SnackBarStatus.danger);
                });
                // let uniquedata = this.BankData.filter(function(word)
                // {
                //  return !this.selectedrowdata.includes(word);
                // });
                // console.log("uniquedata : ",uniquedata);
                // console.log("Selectedrowdatta : ", this.selectedrowdata);
                // this.BankData.push(identity);
                this.BankForm.reset();
            }
            // else if(this.selectedrowdata[1] && this.selectedrowdata!=null)  {
            //     console.log("Duplicate");
            //     this.notificationSnackBarComponent.openSnackBar(
            //         "Updated Successfully",
            //         SnackBarStatus.success
            //     );
            // }


            // else{
            //     this.notificationSnackBarComponent.openSnackBar(
            //         "Account number already exist",
            //         SnackBarStatus.danger
            //     );
            // }


        }
        else {
            console.log("Duplicate");
            this.notificationSnackBarComponent.openSnackBar(
                "Invalid values",
                SnackBarStatus.danger
            );
        }

        if (this.selectedrowdata[0] && this.selectedrowdata != null) {
            var identity = new BankDetails();
            identity.AccountNum = this.BankForm.get("bankacno").value;
            identity.BankAddress = this.BankForm.get("bankaddress").value;
            identity.BankName = this.BankForm.get("bankname").value;
            identity.IFSC = this.BankForm.get("ifsccode").value;
            // this._dashboardService.ValidateBankAccount().subscribe(data => {
            //     let res = data as BankAccountResult;
            //     if (res) {
            //       if (res.valid) {
            //         this.listData.push(identity);
            //       } else {
            //         this.notificationSnackBarComponent.openSnackBar(`${res.message}`, SnackBarStatus.danger);
            //       }
            //     } else {
            //     }
            //   }, (err) => {
            //     console.error(err);
            //     this.notificationSnackBarComponent.openSnackBar(`Invalid Account Number or IFSC Code`, SnackBarStatus.danger);
            //   });

            // if (this.BankData.length != null) {
            // let uniquedata = [];
            // for(let i = 0 ; i < this.BankData.length ; i++){
            //     if(uniquedata.indexOf(this.BankData[i]) === -1){
            //         uniquedata.push(this.BankData[i]);
            //         // this.BankData.push();
            //     }
            // }
            // console.log("uniquedata : ",uniquedata);

            // this.BankData = this.BankData.filter(function(val){
            //     return this.selectedrowdata.indexOf(val) == -1;
            // }); 

            // this.BankData = this.BankData.filter(val => ! this.selectedrowdata.includes(val));
            // console.log("Bankdata : ",this.BankData);



            this.notificationSnackBarComponent.openSnackBar(
                "Updated Successfully",
                SnackBarStatus.success
            );
            // this.BankData.push(identity);
            this.BankData.push(identity);
            console.log("Identity", identity);

            this.selectedrowdata = null;
            console.log("Selectedrowdatta : ", this.selectedrowdata);
            this.BankForm.reset();
            // }
        }
        if (this.SelectedDeselectRow > -1) {
            this.bankdetails.splice(this.SelectedDeselectRow, 1);
            this.SelectedDeselectRow = -1
            this.BankForm.reset();
        }

        //    console.log("patchvalue: ",this.BankForm.get("bankacno").value);
        //    console.log("patchvalue: ",this.BankForm.get("bankaddress").value);
        //    console.log("patchvalue: ",this.BankForm.get("bankname").value);
        //    console.log("patchvalue: ",this.BankForm.get("ifsccode").value);


        //else {
        //     this._commonService.ShowValidationErrors(this.BIform);
        // }
    }
    // ClearAll(): void {
    //     this.BankForm.reset();
    // }

    GetBankDetails() {
        this.isProgressBarVisibile = true;
        this._dashboardService
            .GetSecurityDetails(this.currentTransaction)
            .subscribe(
                (res) => {
                    // console.log("view", res);
                    this.bankInfoView = res;
                    this.SetSecurityDepositDetailInfoView(this.bankInfoView);
                    this.isProgressBarVisibile = false;
                },
                (err) => {
                    // console.log(err);
                }
            );
    }
    SetSecurityDepositDetailInfoView(
        bankInfoView: BankDetailsView = new BankDetailsView()
    ) {
        if (this.Role == "ASM" || this.Role == "Stockist") {
            if (bankInfoView.SecurityDeposit.TransID != null) {
                // businessinformation = businessInfoView.Businessinfo;
                this.DepositForm.patchValue({
                    leaf: bankInfoView.SecurityDeposit.Leaf,
                    Type: bankInfoView.SecurityDeposit.Type,
                    Date: bankInfoView.SecurityDeposit.Date,
                    Amount: bankInfoView.SecurityDeposit.Amount,
                    nameofbank: bankInfoView.SecurityDeposit.BankName,
                });
            }
            this.bankdetails = bankInfoView.BankDetailInfo;
            this.bankdetailsdataSource = new MatTableDataSource(this.bankdetails);
            this.BankData = bankInfoView.BankDetailInfo;
            // this.bankedit = true;
        }
        if (this.Role == "SH" || this.Role == "ZH" || this.Role == "DH" || this.Role == "Accounts") {
            if (bankInfoView.SecurityDeposit.TransID != null) {
                // businessinformation = businessInfoView.Businessinfo;
                this.DepositForm.patchValue({
                    leaf: bankInfoView.SecurityDeposit.Leaf,
                    Type: bankInfoView.SecurityDeposit.Type,
                    Date: bankInfoView.SecurityDeposit.Date,
                    Amount: bankInfoView.SecurityDeposit.Amount,
                    nameofbank: bankInfoView.SecurityDeposit.BankName,
                });
             
            }
            this.bankdetails = bankInfoView.BankDetailInfo;
            this.bankdetailsdataSource = new MatTableDataSource(this.bankdetails);
            this.BankData = bankInfoView.BankDetailInfo;
            this.DepositForm.disable();
            this.BankForm.disable();
            // this.bankedit = false;
        }
        if (this.Role == "RAC") {
            if (bankInfoView.SecurityDeposit.TransID != null) {
                // businessinformation = businessInfoView.Businessinfo;
                this.DepositForm.patchValue({
                    leaf: bankInfoView.SecurityDeposit.Leaf,
                    Type: bankInfoView.SecurityDeposit.Type,
                    Date: bankInfoView.SecurityDeposit.Date,
                    Amount: bankInfoView.SecurityDeposit.Amount,
                    nameofbank: bankInfoView.SecurityDeposit.BankName,
                });
            }
            this.bankdetails = bankInfoView.BankDetailInfo;
            this.bankdetailsdataSource = new MatTableDataSource(this.bankdetails);
            this.BankData = bankInfoView.BankDetailInfo;
            this.DepositForm.disable();
            
        }


    }

    GetTransactionDetails() {
        this.isProgressBarVisibile = true;
        this._dashboardService
            .GetCustomerOnboardingView(this.currentTransaction)
            .subscribe(
                (res) => {
                    // console.log("view", res);
                    this.CustomerObdView = res;
                    this.SetPersonalInfoValues();
                    this.isProgressBarVisibile = false;
                },
                (err) => {
                    // console.log(err);
                }
            );
    }
    GetPersonalInfoFromForm(): PersonalInformation {
        var pi = new PersonalInformation();
        pi.category = this.PIform.get('category').value;
        pi.Name = this.PIform.get('Name').value;
        pi.Address = this.PIform.get('Address').value;
        pi.District = this.PIform.get('District').value;
        var products = "";
        var productList = this.PIform.get('product').value;
        if (productList && productList != null && productList.length) {
            productList.forEach((reason, i) => {
                if (i < productList.length - 1) {
                    products += reason + ",";
                }
                else {
                    products += reason;
                }
            });
        }
        else {
            products = null;
        }
        pi.product = products;
        pi.City = this.PIform.get('City').value;
        pi.Taluk = this.PIform.get('Taluka').value;
        pi.Tehsil = this.PIform.get('Tehsil').value;
        pi.State = this.PIform.get('State').value;
        pi.Pincode = this.PIform.get('Pincode').value;
        pi.Status = this.PIform.get('Status').value;
        pi.Latitude = this.PIform.get('latitude').value;
        pi.Logitude = this.PIform.get('longitude').value;
        if (this.transID != null) {
            pi.TransID = Number(localStorage.getItem('TransID'));
        }
        return pi;
    }
    GetMarketInfoFromForm(): MarketInformation {
        const marketInformation: MarketInformation = new MarketInformation();
        marketInformation.MarketName = this.MIform.get("market").value;
        marketInformation.Population = this.MIform.get("Population").value;
        marketInformation.MarketPotential = this.MIform.get("Potential").value;
        marketInformation.StockList = this.MIform.get("Stockist").value;
        marketInformation.Distance = this.MIform.get("Distance").value;
        marketInformation.StockListName =
            this.MIform.get("NameOfNearest").value;
        marketInformation.Year = this.MIform.get("YearOfEstablished").value;
        marketInformation.Area = this.MIform.get("AreasStockist").value;
        marketInformation.Total = this.MIform.get("TotalPotential").value;
        marketInformation.MonthlySale = this.MIform.get("JKAvg").value;
        marketInformation.PanNo = this.MIform.get("Pan").value;
        marketInformation.GstNo = this.MIform.get("Gst").value;
        marketInformation.Background = this.MIform.get("PartyBackground").value;
        marketInformation.TransID = this.transID;
        return marketInformation;
    }
    GetBusinessInfoFromForm(): BusinessInformation {
        const businessformvalues: BusinessInformation =
            new BusinessInformation();
        businessformvalues.Turnover1 = this.BIform.get("NoOfYears").value;
        businessformvalues.Turnover2 = this.BIform.get("NoOfYears1").value;
        businessformvalues.Turnover3 = this.BIform.get("NoOfYears2").value;
        businessformvalues.Retail = parseInt(this.BIform.get("retail").value);
        businessformvalues.WorkingCaptial =
            this.BIform.get("capitalinvest").value;
        businessformvalues.NoVechicle = parseInt(
            this.BIform.get("vehicle").value
        );
        businessformvalues.TotalStorage =
            this.BIform.get("storagecapacity").value;
        businessformvalues.Wholesale = parseInt(
            this.BIform.get("Wholesale").value
        );
        businessformvalues.TransID = this.transID;
        return businessformvalues;
    }
    GetSecurityInfoFromForm(): SecurityDepositDetail {
        const personalinformation: SecurityDepositDetail = new SecurityDepositDetail();
        personalinformation.Leaf = this.DepositForm.get('leaf').value;
        personalinformation.Type = this.DepositForm.get('Type').value;
        personalinformation.Date = this.DepositForm.get('Date').value.toString();
        personalinformation.Amount = this.DepositForm.get('Amount').value;
        personalinformation.BankName = this.DepositForm.get('nameofbank').value;
        personalinformation.TransID = this.transID;
        // personalinformation.bankno = this.BankForm.get('bankno').value;
        // personalinformation.bankname = this.BankForm.get('bankname').value;
        // personalinformation.bankaddress = this.BankForm.get('bankaddress').value;
        // personalinformation.ifsccode = this.BankForm.get('ifsccode').value;
        // personalinformation.bankacno = this.BankForm.get('bankacno').value

        return personalinformation;
    }
    SetPersonalInfoValues() {

        if (this.Role == "ASM") {
            var products = null;
            if (
                this.CustomerObdView.PersonalInfo.PersonalInformation.product !=
                null
            ) {
                products =
                    this.CustomerObdView.PersonalInfo.PersonalInformation.product.split(
                        ","
                    );
            }
            var state = new States();
            state.StateName =
                this.CustomerObdView.PersonalInfo.PersonalInformation.State;
            this.SOption.push(state);
            var city = new Cities();
            city.City = this.CustomerObdView.PersonalInfo.PersonalInformation.City;
            this.City.push(city);
            this.PIform.patchValue({
                category:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.category,
                product: products,
                Address:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.Address,
                Name: this.CustomerObdView.PersonalInfo.PersonalInformation.Name,
                latitude:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.Latitude,
                longitude:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.Logitude,
                District:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.District,
                City: this.CustomerObdView.PersonalInfo.PersonalInformation.City,
                Taluka: this.CustomerObdView.PersonalInfo.PersonalInformation.Taluk,
                Tehsil: this.CustomerObdView.PersonalInfo.PersonalInformation
                    .Tehsil,
                State: this.CustomerObdView.PersonalInfo.PersonalInformation.State,
                Pincode:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.Pincode,
                Status: this.CustomerObdView.PersonalInfo.PersonalInformation
                    .Status,
            });
            if (this.CustomerObdView.organisationInput) {
                this.PIform.patchValue({
                    AccountGroup: this.CustomerObdView.organisationInput.AccountGroup,
                    DistributionChannel: this.CustomerObdView.organisationInput.DistributionChannel,
                    Division: this.CustomerObdView.organisationInput.Division,
                    SalesOrg: this.CustomerObdView.organisationInput.SalesOrg,
                    Region: this.CustomerObdView.organisationInput.Region
                });
            }
            this.selected =
                this.CustomerObdView.PersonalInfo.PersonalInformation.Status;
            this.Contactdetails = this.CustomerObdView.PersonalInfo.Identities;
            this.contactdataSource = new MatTableDataSource(this.Contactdetails);
            this.IdentityData = this.CustomerObdView.PersonalInfo.Identities;
        }


        if (this.Role == "SH" || this.Role == "ZH" || this.Role == "DH" || this.Role == "Accounts" || this.Role == "RAC") {
            var products = null;
            if (
                this.CustomerObdView.PersonalInfo.PersonalInformation.product !=
                null
            ) {
                products =
                    this.CustomerObdView.PersonalInfo.PersonalInformation.product.split(
                        ","
                    );
            }
            var state = new States();
            state.StateName =
                this.CustomerObdView.PersonalInfo.PersonalInformation.State;
            this.SOption.push(state);
            var city = new Cities();
            city.City = this.CustomerObdView.PersonalInfo.PersonalInformation.City;
            this.City.push(city);
            this.PIform.patchValue({
                category:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.category,
                product: products,
                Address:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.Address,
                Name: this.CustomerObdView.PersonalInfo.PersonalInformation.Name,
                latitude:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.Latitude,
                longitude:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.Logitude,
                District:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.District,
                City: this.CustomerObdView.PersonalInfo.PersonalInformation.City,
                Taluka: this.CustomerObdView.PersonalInfo.PersonalInformation.Taluk,
                Tehsil: this.CustomerObdView.PersonalInfo.PersonalInformation
                    .Tehsil,
                State: this.CustomerObdView.PersonalInfo.PersonalInformation.State,
                Pincode:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.Pincode,
                Status: this.CustomerObdView.PersonalInfo.PersonalInformation
                    .Status,
            });
            if (this.CustomerObdView.organisationInput) {
                this.PIform.patchValue({
                    AccountGroup: this.CustomerObdView.organisationInput.AccountGroup,
                    DistributionChannel: this.CustomerObdView.organisationInput.DistributionChannel,
                    Division: this.CustomerObdView.organisationInput.Division,
                    SalesOrg: this.CustomerObdView.organisationInput.SalesOrg,
                    Region: this.CustomerObdView.organisationInput.Region
                });
            }
            this.selected =
                this.CustomerObdView.PersonalInfo.PersonalInformation.Status;
            this.Contactdetails = this.CustomerObdView.PersonalInfo.Identities;
            this.contactdataSource = new MatTableDataSource(this.Contactdetails);
            this.IdentityData = this.CustomerObdView.PersonalInfo.Identities;
            this.PIform.disable();
            this.firmForm.disable();
        }
        if (this.Role == "Stockist") {
            var products = null;
            if (
                this.CustomerObdView.PersonalInfo.PersonalInformation.product !=
                null
            ) {
                products =
                    this.CustomerObdView.PersonalInfo.PersonalInformation.product.split(
                        ","
                    );
            }
            var state = new States();
            state.StateName =
                this.CustomerObdView.PersonalInfo.PersonalInformation.State;
            this.SOption.push(state);
            var city = new Cities();
            city.City = this.CustomerObdView.PersonalInfo.PersonalInformation.City;
            this.City.push(city);
            this.PIform.patchValue({
                category:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.category,
                product: products,
                Address:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.Address,
                Name: this.CustomerObdView.PersonalInfo.PersonalInformation.Name,
                latitude:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.Latitude,
                longitude:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.Logitude,
                District:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.District,
                City: this.CustomerObdView.PersonalInfo.PersonalInformation.City,
                Taluka: this.CustomerObdView.PersonalInfo.PersonalInformation.Taluk,
                Tehsil: this.CustomerObdView.PersonalInfo.PersonalInformation
                    .Tehsil,
                State: this.CustomerObdView.PersonalInfo.PersonalInformation.State,
                Pincode:
                    this.CustomerObdView.PersonalInfo.PersonalInformation.Pincode,
                Status: this.CustomerObdView.PersonalInfo.PersonalInformation
                    .Status,
            });
            if (this.CustomerObdView.organisationInput) {
                this.PIform.patchValue({
                    AccountGroup: this.CustomerObdView.organisationInput.AccountGroup,
                    DistributionChannel: this.CustomerObdView.organisationInput.DistributionChannel,
                    Division: this.CustomerObdView.organisationInput.Division,
                    SalesOrg: this.CustomerObdView.organisationInput.SalesOrg,
                    Region: this.CustomerObdView.organisationInput.Region
                });
            }
            this.selected =
                this.CustomerObdView.PersonalInfo.PersonalInformation.Status;
            this.Contactdetails = this.CustomerObdView.PersonalInfo.Identities;
            this.IdentityData = this.CustomerObdView.PersonalInfo.Identities;
            this.contactdataSource = new MatTableDataSource(this.Contactdetails);
            // this.PIform.enable();
            this.PIform.get('category').disable();
            this.PIform.get('product').disable();
            this.PIform.get('Address').disable();
            this.PIform.get('Name').disable();
            // this.PIform.get('latitude').disable();
            // this.PIform.get('longitude').disable();
            this.PIform.get('District').disable();
            this.PIform.get('City').disable();
            this.PIform.get('Taluka').disable();
            this.PIform.get('Tehsil').disable();
            this.PIform.get('State').disable();
            this.PIform.get('Pincode').disable();

        }
    }
    AvgData: AverageSale[] = [];
    AvgAddClicked() {
        if (this.BrandForm.valid) {
            var identity = new AverageSale();
            identity.AvgSale = this.BrandForm.get("wpMonth").value;
            identity.Brand = this.BrandForm.get("brand").value;
            identity.TransID = this.currentTransaction;
            this.AvgData.push(identity);
            this.BrandForm.reset();
        } else {
            this._commonService.ShowValidationErrors(this.BrandForm);
        }
    }

    onAdd(): void {
        this.AvgAddClicked();
    }

    FirmStatusChange() {
        this.IdentityData = [];
    }
    SetMarketInfoDetails(
        MarketInfoView: MarketInformationView = new MarketInformationView()
    ) {
        if (this.Role == "ASM") {
            if (MarketInfoView.MarketInformation.TransID != null) {
                this.MIform.patchValue({
                    market: MarketInfoView.MarketInformation.MarketName,
                    Population: MarketInfoView.MarketInformation.Population,
                    Potential: MarketInfoView.MarketInformation.MarketPotential,
                    Stockist: MarketInfoView.MarketInformation.StockList,
                    Distance: MarketInfoView.MarketInformation.Distance,
                    NameOfNearest: MarketInfoView.MarketInformation.StockListName,
                    YearOfEstablished: MarketInfoView.MarketInformation.Year,
                    AreasStockist: MarketInfoView.MarketInformation.Area,
                    TotalPotential: MarketInfoView.MarketInformation.Total,
                    JKAvg: MarketInfoView.MarketInformation.MonthlySale,
                    Pan: MarketInfoView.MarketInformation.PanNo,
                    Gst: MarketInfoView.MarketInformation.GstNo,
                    PartyBackground: MarketInfoView.MarketInformation.Background,
                });
                this.averageSalesDetails = MarketInfoView.AverageSale;

                this.averageSalesDataSource = new MatTableDataSource(
                    this.averageSalesDetails
                );
                this.AvgData = MarketInfoView.AverageSale;
            }
        }
        if (this.Role == "SH") {
            if (MarketInfoView.MarketInformation.TransID != null) {
                // businessinformation = businessInfoView.Businessinfo;
                this.MIform.patchValue({
                    market: MarketInfoView.MarketInformation.MarketName,
                    Population: MarketInfoView.MarketInformation.Population,
                    Potential: MarketInfoView.MarketInformation.MarketPotential,
                    Stockist: MarketInfoView.MarketInformation.StockList,
                    Distance: MarketInfoView.MarketInformation.Distance,
                    NameOfNearest: MarketInfoView.MarketInformation.StockListName,
                    YearOfEstablished: MarketInfoView.MarketInformation.Year,
                    AreasStockist: MarketInfoView.MarketInformation.Area,
                    TotalPotential: MarketInfoView.MarketInformation.Total,
                    JKAvg: MarketInfoView.MarketInformation.MonthlySale,
                    Pan: MarketInfoView.MarketInformation.PanNo,
                    Gst: MarketInfoView.MarketInformation.GstNo,
                    PartyBackground: MarketInfoView.MarketInformation.Background,
                });
                this.AvgData = MarketInfoView.AverageSale;
                this.averageSalesDetails = MarketInfoView.AverageSale;
                this.averageSalesDataSource = new MatTableDataSource(
                    this.averageSalesDetails

                );
                this.MIform.get('YearOfEstablished').disable();
                this.MIform.get('TotalPotential').disable();
                this.MIform.get('JKAvg').disable();
                this.MIform.get('Pan').disable();
                this.MIform.get('Gst').disable();
                this.MIform.get('PartyBackground').disable();
            }
        }

        if (this.Role == "ZH" || this.Role == "DH" || this.Role == "Accounts") {
            if (MarketInfoView.MarketInformation.TransID != null) {
                this.MIform.patchValue({
                    market: MarketInfoView.MarketInformation.MarketName,
                    Population: MarketInfoView.MarketInformation.Population,
                    Potential: MarketInfoView.MarketInformation.MarketPotential,
                    Stockist: MarketInfoView.MarketInformation.StockList,
                    Distance: MarketInfoView.MarketInformation.Distance,
                    NameOfNearest: MarketInfoView.MarketInformation.StockListName,
                    YearOfEstablished: MarketInfoView.MarketInformation.Year,
                    AreasStockist: MarketInfoView.MarketInformation.Area,
                    TotalPotential: MarketInfoView.MarketInformation.Total,
                    JKAvg: MarketInfoView.MarketInformation.MonthlySale,
                    Pan: MarketInfoView.MarketInformation.PanNo,
                    Gst: MarketInfoView.MarketInformation.GstNo,
                    PartyBackground: MarketInfoView.MarketInformation.Background,
                });
                this.AvgData = MarketInfoView.AverageSale;
                this.averageSalesDetails = MarketInfoView.AverageSale;
                this.averageSalesDataSource = new MatTableDataSource(
                    this.averageSalesDetails
                );
                this.MIform.disable();
            }
        }
        if (this.Role == "RAC") {
            if (MarketInfoView.MarketInformation.TransID != null) {
                this.MIform.patchValue({
                    market: MarketInfoView.MarketInformation.MarketName,
                    Population: MarketInfoView.MarketInformation.Population,
                    Potential: MarketInfoView.MarketInformation.MarketPotential,
                    Stockist: MarketInfoView.MarketInformation.StockList,
                    Distance: MarketInfoView.MarketInformation.Distance,
                    NameOfNearest: MarketInfoView.MarketInformation.StockListName,
                    YearOfEstablished: MarketInfoView.MarketInformation.Year,
                    AreasStockist: MarketInfoView.MarketInformation.Area,
                    TotalPotential: MarketInfoView.MarketInformation.Total,
                    JKAvg: MarketInfoView.MarketInformation.MonthlySale,
                    Pan: MarketInfoView.MarketInformation.PanNo,
                    Gst: MarketInfoView.MarketInformation.GstNo,
                    PartyBackground: MarketInfoView.MarketInformation.Background,
                });
                this.AvgData = MarketInfoView.AverageSale;
                this.averageSalesDetails = MarketInfoView.AverageSale;
                this.averageSalesDataSource = new MatTableDataSource(
                    this.averageSalesDetails
                );
                this.MIform.get('market').disable();
                this.MIform.get('Population').disable();
                this.MIform.get('Potential').disable();
                this.MIform.get('Stockist').disable();
                this.MIform.get('Distance').disable();
                this.MIform.get('NameOfNearest').disable();
                this.MIform.get('YearOfEstablished').disable();
                this.MIform.get('AreasStockist').disable();
                this.MIform.get('TotalPotential').disable();
                this.MIform.get('JKAvg').disable();
                this.MIform.get('PartyBackground').disable();
            }
        }
        if (this.Role == "Stockist") {
            if (MarketInfoView.MarketInformation.TransID != null) {
                // businessinformation = businessInfoView.Businessinfo;
                this.MIform.patchValue({
                    market: MarketInfoView.MarketInformation.MarketName,
                    Population: MarketInfoView.MarketInformation.Population,
                    Potential: MarketInfoView.MarketInformation.MarketPotential,
                    Stockist: MarketInfoView.MarketInformation.StockList,
                    Distance: MarketInfoView.MarketInformation.Distance,
                    NameOfNearest: MarketInfoView.MarketInformation.StockListName,
                    YearOfEstablished: MarketInfoView.MarketInformation.Year,
                    AreasStockist: MarketInfoView.MarketInformation.Area,
                    TotalPotential: MarketInfoView.MarketInformation.Total,
                    JKAvg: MarketInfoView.MarketInformation.MonthlySale,
                    Pan: MarketInfoView.MarketInformation.PanNo,
                    Gst: MarketInfoView.MarketInformation.GstNo,
                    PartyBackground: MarketInfoView.MarketInformation.Background,
                });
                this.AvgData = MarketInfoView.AverageSale;
                this.averageSalesDetails = MarketInfoView.AverageSale;
                this.averageSalesDataSource = new MatTableDataSource(
                    this.averageSalesDetails
                );
                this.Noview = true;
            }
        }
    }
    SetBusinessInfoDetails(
        businessInfoView: BusinessInformationView = new BusinessInformationView()
    ) {
        if (this.Role == "ASM" || this.Role == "Stockist") {
            if (businessInfoView.Businessinfo.TransID != null) {
                // businessinformation = businessInfoView.Businessinfo;
                this.BIform.patchValue({
                    NoOfYears: businessInfoView.Businessinfo.Turnover1,
                    NoOfYears1: businessInfoView.Businessinfo.Turnover2,
                    NoOfYears2: businessInfoView.Businessinfo.Turnover3,
                    capitalinvest: businessInfoView.Businessinfo.WorkingCaptial,
                    storagecapacity: businessInfoView.Businessinfo.TotalStorage,
                    retail: businessInfoView.Businessinfo.Retail,
                    vehicle: businessInfoView.Businessinfo.NoVechicle,
                    Wholesale: businessInfoView.Businessinfo.Wholesale,
                });
            }
        }
        if (this.Role == "SH" || this.Role == "ZH" || this.Role == "DH" || this.Role == "Accounts" || this.Role == "RAC") {
            if (businessInfoView.Businessinfo.TransID != null) {
                // businessinformation = businessInfoView.Businessinfo;
                this.BIform.patchValue({
                    NoOfYears: businessInfoView.Businessinfo.Turnover1,
                    NoOfYears1: businessInfoView.Businessinfo.Turnover2,
                    NoOfYears2: businessInfoView.Businessinfo.Turnover3,
                    capitalinvest: businessInfoView.Businessinfo.WorkingCaptial,
                    storagecapacity: businessInfoView.Businessinfo.TotalStorage,
                    retail: businessInfoView.Businessinfo.Retail,
                    vehicle: businessInfoView.Businessinfo.NoVechicle,
                    Wholesale: businessInfoView.Businessinfo.Wholesale,
                });
                this.BIform.disable();
            }
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
    IdentityAddClicked() {
        if (this.firmForm.valid) {
            var identity = new PersonIdentity();
            identity.Name = this.firmForm.get('Name1').value;
            identity.MobileNo = this.firmForm.get('Mobile1').value;
            identity.EmailId = this.firmForm.get('email1').value;
            identity.FirmName = this.GetIdentityRole();
            this.IdentityData.push(identity);
            this.firmForm.reset();
        }
        else {
            this._commonService.ShowValidationErrors(this.firmForm);
        }
    }
    GetIdentityRole(): string {
        var identity = this.PIform.get('Status').value;
        var role = "";
        if (identity == "Proprietor") {
            //role = "Proprietor " + (this.IdentityData.length + 1).toString().replace(/^0+/, '');
            role = "Proprietor " + (this.IdentityData.length + 1).toString();
        }
        else if (identity == "Partnership") {
            role = "Partner " + (this.IdentityData.length + 1).toString();
        }
        else if (identity == "Huf") {
            role = "Partner " + (this.IdentityData.length + 1).toString();
        }
        else {
            role = "Director " + (this.IdentityData.length + 1).toString();
        }
        return role;
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
    files: File[] = [];
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
    FileName: any;
    FileName1: any;
    FileName2: any;
    FileName3: any;
    FileName4: any;
    FileName5: any;
    FileName6: any;
    FileName7: any;
    csvInputChange(event) {
        this.handleFileInput(event, "PanCard");
        this.FileName = event.target.files[0].name;
        if (this.Attach1.AttachmentName != null) {
            this.Attach1 = null;
        }
      
    }
    onSelect(event) {
        this.files[0] = event.addedFiles[0];
        // this.SelectedFileName=this.files[0].name;
        // this.File  Error=false;
    }
    csv1InputChange(event) {

        this.FileName1 = event.target.files[0].name;
        // // console.log(fileInputEvent.target.files[0]);
        this.handleFileInput(event, "GSTCertificate");
        if (this.Attach2.AttachmentName != null) {
            this.Attach2 = null;
        }
        // this.GetAttachment(fileInputEvent.target.files[0],"GST");
    }
    csv2InputChange(event) {
        this.FileName2 = event.target.files[0].name;
        // // console.log(fileInputEvent.target.files[0]);
        // this.GetAttachment(fileInputEvent.target.files[0],"AADHAR CARD");
        this.handleFileInput(event, "AadharCard");
        if (this.Attach3.AttachmentName != null) {
            this.Attach3 = null;
        }
    }
    csv3InputChange(event) {
        this.FileName3 = event.target.files[0].name;
        // // console.log(fileInputEvent.target.files[0]);
        // this.GetAttachment(fileInputEvent.target.files[0],"Cancelled Cheque");
        this.handleFileInput(event, "CancelledCheque");
        if (this.Attach4.AttachmentName != null) {
            this.Attach4 = null;
        }
    }
    csv4InputChange(event) {
        this.handleFileInput(event, "PartnerPhoto");
        this.FileName4 = event.target.files[0].name;
        if (this.Attach5.AttachmentName != null) {
            this.Attach5 = null;
        }
        // // console.log(fileInputEvent.target.files[0]);
        // this.GetAttachment(fileInputEvent.target.files[0],"Photograph");
    }
    csv5InputChange(event) {
        this.handleFileInput(event, "TDSDeclaration");
        this.FileName5 = event.target.files[0].name;
        if (this.Attach6.AttachmentName != null) {
            this.Attach6 = null;
        }
        // // console.log(fileInputEvent.target.files[0]);
        // this.GetAttachment(fileInputEvent.target.files[0],"TDS");
    }
    csv6InputChange(event) {
        this.handleFileInput(event, "AddressProof");
        this.FileName6 = event.target.files[0].name;
        if (this.Attach7.AttachmentName != null) {
            this.Attach7 = null;
        }
        // // console.log(fileInputEvent.target.files[0]);
        // this.GetAttachment(fileInputEvent.target.files[0],"Address Proof");
    }
    csv7InputChange(event) {
        this.handleFileInput(event, "SignedDocument");
        this.FileName7 = event.target.files[0].name;
        if (this.Attach8.AttachmentName != null) {
            this.Attach8 = null;
        }
        // // console.log(fileInputEvent.target.files[0]);
        // this.GetAttachment(fileInputEvent.target.files[0],"Signed Digital Document");
    }
    Approve(): void {
        if (this.Role == "ASM") {
            var Customer = new CustomerOnboardingView();
            Customer.Status = "ASMApproved";
            Customer.TranID = this.transID;
            Customer.UserID = this.authenticationDetails.UserID.toString();
            Customer.PositionCode = this.authenticationDetails.PositionCode;
            Customer.RoleName = this.authenticationDetails.UserRole;
            Customer.PersonalInfo = new PersonalInformationView();
            Customer.PersonalInfo.PersonalInformation = this.GetPersonalInfoFromForm();
            Customer.PersonalInfo.Identities = this.IdentityData;
            Customer.MarketInfo = new MarketInformationView();
            Customer.MarketInfo.MarketInformation = this.GetMarketInfoFromForm();
            Customer.MarketInfo.AverageSale = this.AvgData;
            Customer.BusinessInfo = new BusinessInformationView();
            Customer.BusinessInfo.Businessinfo = this.GetBusinessInfoFromForm();
            Customer.BankInfo = new BankDetailsView();
            Customer.BankInfo.SecurityDeposit = this.GetSecurityInfoFromForm();
            Customer.BankInfo.BankDetailInfo = this.BankData;
            console.log("Approve", Customer.BankInfo.BankDetailInfo);
            var Cusotmer = new CustomerOnboardingView1();
            Cusotmer.Status = "ASMApproved";
            Cusotmer.TranID = this.transID;
            Cusotmer.UserID = this.authenticationDetails.UserID.toString();
            Cusotmer.PositionCode = this.authenticationDetails.PositionCode;
            Cusotmer.RoleName = this.authenticationDetails.UserRole;
            this.isProgressBarVisibile = true;


            this._dashboardService
                .updateCustomerOnboardingStatus(Customer)
                .subscribe(
                    (data) => {
                        // console.log(data);
                        this._dashboardService.AddDocumentRequiredAttachment(this.transID, this.files, this.Documentname).subscribe(
                            (res) => {
                                // console.log("Attachment added", res);
                            }
                        );
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(
                            "Approved successfully",
                            SnackBarStatus.success
                        );
                        this._router.navigate(["/pages/approvalinformation"]);
                    },
                    (err) => {
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(
                            err instanceof Object
                                ? "Something went wrong"
                                : err,
                            SnackBarStatus.danger
                        );
                    }
                );
        }
        if (this.Role == "Stockist") {
            var Customer = new CustomerOnboardingView();
            Customer.Status = "StockistApproved";
            Customer.TranID = this.transID;
            Customer.UserID = this.authenticationDetails.UserID.toString();
            Customer.PositionCode = this.authenticationDetails.PositionCode;
            Customer.RoleName = this.authenticationDetails.UserRole;
            Customer.PersonalInfo = new PersonalInformationView();
            Customer.PersonalInfo.PersonalInformation = this.GetPersonalInfoFromForm();
            Customer.PersonalInfo.Identities = this.IdentityData;
            Customer.MarketInfo = new MarketInformationView();
            Customer.MarketInfo.MarketInformation = this.GetMarketInfoFromForm();
            Customer.MarketInfo.AverageSale = this.AvgData;
            Customer.BusinessInfo = new BusinessInformationView();
            Customer.BusinessInfo.Businessinfo = this.GetBusinessInfoFromForm();
            Customer.BankInfo = new BankDetailsView();
            Customer.BankInfo.SecurityDeposit = this.GetSecurityInfoFromForm();
            Customer.BankInfo.BankDetailInfo = this.BankData;
            // console.log("Approve", Customer);

            this.isProgressBarVisibile = true;


            this._dashboardService
                .updateCustomerOnboardingStatus(Customer)
                .subscribe(
                    (data) => {
                        // console.log(data);
                        this._dashboardService.AddDocumentRequiredAttachment(this.transID, this.files, this.Documentname).subscribe(
                            (res) => {
                                // console.log("Attachment added", res);
                            }
                        );
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(
                            "Approved successfully",
                            SnackBarStatus.success
                        );
                        this._router.navigate(["/pages/approvalinformation"]);
                    },
                    (err) => {
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(
                            err instanceof Object
                                ? "Something went wrong"
                                : err,
                            SnackBarStatus.danger
                        );
                    }
                );
        }
        if (this.Role == "DH") {
            var Customer = new CustomerOnboardingView();
            Customer.Status = "DHApproved";
            Customer.TranID = this.transID;
            Customer.UserID = this.authenticationDetails.UserID.toString();
            Customer.PositionCode = this.authenticationDetails.PositionCode;
            Customer.RoleName = this.authenticationDetails.UserRole;
            Customer.PersonalInfo = new PersonalInformationView();
            Customer.PersonalInfo.PersonalInformation = this.GetPersonalInfoFromForm();
            Customer.PersonalInfo.Identities = this.IdentityData;
            Customer.MarketInfo = new MarketInformationView();
            Customer.MarketInfo.MarketInformation = this.GetMarketInfoFromForm();
            Customer.MarketInfo.AverageSale = this.AvgData;
            Customer.BusinessInfo = new BusinessInformationView();
            Customer.BusinessInfo.Businessinfo = this.GetBusinessInfoFromForm();
            Customer.BankInfo = new BankDetailsView();
            Customer.BankInfo.SecurityDeposit = this.GetSecurityInfoFromForm();
            Customer.BankInfo.BankDetailInfo = this.BankData;
            var Cusotmer = new CustomerOnboardingView1();
            Cusotmer.Status = "DHApproved";
            Cusotmer.TranID = this.transID;
            Cusotmer.UserID = this.authenticationDetails.UserID.toString();
            Cusotmer.PositionCode = this.authenticationDetails.PositionCode;
            Cusotmer.RoleName = this.authenticationDetails.UserRole;
            this.isProgressBarVisibile = true;
            this._dashboardService
                .updateCustomerOnboardingStatus(Customer)
                .subscribe(
                    (data) => {
                        // console.log(data);
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(
                            "Approved successfully",
                            SnackBarStatus.success
                        );
                        this._router.navigate(["/pages/approvalinformation"]);
                    },
                    (err) => {
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(
                            err instanceof Object
                                ? "Something went wrong"
                                : err,
                            SnackBarStatus.danger
                        );
                    }
                );
        }
        if (this.Role == "Accounts") {
            var Customer = new CustomerOnboardingView();
            Customer.Status = "AccountsApproved";
            Customer.TranID = this.transID;
            Customer.UserID = this.authenticationDetails.UserID.toString();
            Customer.PositionCode = this.authenticationDetails.PositionCode;
            Customer.RoleName = this.authenticationDetails.UserRole;
            Customer.PersonalInfo = new PersonalInformationView();
            Customer.PersonalInfo.PersonalInformation = this.GetPersonalInfoFromForm();
            Customer.PersonalInfo.Identities = this.IdentityData;
            Customer.MarketInfo = new MarketInformationView();
            Customer.MarketInfo.MarketInformation = this.GetMarketInfoFromForm();
            Customer.MarketInfo.AverageSale = this.AvgData;
            Customer.BusinessInfo = new BusinessInformationView();
            Customer.BusinessInfo.Businessinfo = this.GetBusinessInfoFromForm();
            Customer.BankInfo = new BankDetailsView();
            Customer.BankInfo.SecurityDeposit = this.GetSecurityInfoFromForm();
            Customer.BankInfo.BankDetailInfo = this.BankData;
            var Cusotmer = new CustomerOnboardingView1();
            Cusotmer.Status = "AccountsApproved";
            Cusotmer.TranID = this.transID;
            Cusotmer.UserID = this.authenticationDetails.UserID.toString();
            Cusotmer.PositionCode = this.authenticationDetails.PositionCode;
            Cusotmer.RoleName = this.authenticationDetails.UserRole;
            this.isProgressBarVisibile = true;
            this._dashboardService
                .updateCustomerOnboardingStatus(Customer)
                .subscribe(
                    (data) => {
                        // console.log(data);
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(
                            "Approved successfully",
                            SnackBarStatus.success
                        );
                        this._router.navigate(["/pages/approvalinformation"]);
                    },
                    (err) => {
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(
                            err instanceof Object
                                ? "Something went wrong"
                                : err,
                            SnackBarStatus.danger
                        );
                    }
                );
        }
        if (this.Role == "ZH") {
            var Customer = new CustomerOnboardingView();
            Customer.Status = "ZHApproved";
            Customer.TranID = this.transID;
            Customer.UserID = this.authenticationDetails.UserID.toString();
            Customer.PositionCode = this.authenticationDetails.PositionCode;
            Customer.RoleName = this.authenticationDetails.UserRole;
            Customer.PersonalInfo = new PersonalInformationView();
            Customer.PersonalInfo.PersonalInformation = this.GetPersonalInfoFromForm();
            Customer.PersonalInfo.Identities = this.IdentityData;
            Customer.MarketInfo = new MarketInformationView();
            Customer.MarketInfo.MarketInformation = this.GetMarketInfoFromForm();
            Customer.MarketInfo.AverageSale = this.AvgData;
            Customer.BusinessInfo = new BusinessInformationView();
            Customer.BusinessInfo.Businessinfo = this.GetBusinessInfoFromForm();
            Customer.BankInfo = new BankDetailsView();
            Customer.BankInfo.SecurityDeposit = this.GetSecurityInfoFromForm();
            Customer.BankInfo.BankDetailInfo = this.BankData;
            // console.log("Approve", Customer);
            var Cusotmer = new CustomerOnboardingView1();
            Cusotmer.Status = "ZHApproved";
            Cusotmer.TranID = this.transID;
            Cusotmer.UserID = this.authenticationDetails.UserID.toString();
            Cusotmer.PositionCode = this.authenticationDetails.PositionCode;
            Cusotmer.RoleName = this.authenticationDetails.UserRole;
            this.isProgressBarVisibile = true;


            this._dashboardService
                .updateCustomerOnboardingStatus(Customer)
                .subscribe(
                    (data) => {
                        // console.log(data);
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(
                            "Approved successfully",
                            SnackBarStatus.success
                        );
                        this._router.navigate(["/pages/approvalinformation"]);
                    },
                    (err) => {
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(
                            err instanceof Object
                                ? "Something went wrong"
                                : err,
                            SnackBarStatus.danger
                        );
                    }
                );
        }
        if (this.Role == "SH") {
            var Customer = new CustomerOnboardingView();
            Customer.Status = "SHApproved";
            Customer.TranID = this.transID;
            Customer.UserID = this.authenticationDetails.UserID.toString();
            Customer.PositionCode = this.authenticationDetails.PositionCode;
            Customer.RoleName = this.authenticationDetails.UserRole;
            Customer.PersonalInfo = new PersonalInformationView();
            Customer.PersonalInfo.PersonalInformation = this.GetPersonalInfoFromForm();
            Customer.PersonalInfo.Identities = this.IdentityData;
            Customer.MarketInfo = new MarketInformationView();
            Customer.MarketInfo.MarketInformation = this.GetMarketInfoFromForm();
            Customer.MarketInfo.AverageSale = this.AvgData;
            Customer.BusinessInfo = new BusinessInformationView();
            Customer.BusinessInfo.Businessinfo = this.GetBusinessInfoFromForm();
            Customer.BankInfo = new BankDetailsView();
            Customer.BankInfo.SecurityDeposit = this.GetSecurityInfoFromForm();
            Customer.BankInfo.BankDetailInfo = this.BankData;
            // console.log("Approve", Customer);
            var Cusotmer = new CustomerOnboardingView1();
            Cusotmer.Status = "SHApproved";
            Cusotmer.TranID = this.transID;
            Cusotmer.UserID = this.authenticationDetails.UserID.toString();
            Cusotmer.PositionCode = this.authenticationDetails.PositionCode;
            Cusotmer.RoleName = this.authenticationDetails.UserRole;
            this.isProgressBarVisibile = true;


            this._dashboardService
                .updateCustomerOnboardingStatus(Customer)
                .subscribe(
                    (data) => {
                        // console.log(data);
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(
                            "Approved successfully",
                            SnackBarStatus.success
                        );
                        this._router.navigate(["/pages/approvalinformation"]);
                    },
                    (err) => {
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(
                            err instanceof Object
                                ? "Something went wrong"
                                : err,
                            SnackBarStatus.danger
                        );
                    }
                );
        }
        if (this.Role == "RAC") {
            var Customer = new CustomerOnboardingView();
            Customer.Status = "RACApproved";
            Customer.TranID = this.transID;
            Customer.UserID = this.authenticationDetails.UserID.toString();
            Customer.PositionCode = this.authenticationDetails.PositionCode;
            Customer.RoleName = this.authenticationDetails.UserRole;
            Customer.PersonalInfo = new PersonalInformationView();
            Customer.PersonalInfo.PersonalInformation = this.GetPersonalInfoFromForm();
            Customer.PersonalInfo.Identities = this.IdentityData;
            Customer.MarketInfo = new MarketInformationView();
            Customer.MarketInfo.MarketInformation = this.GetMarketInfoFromForm();
            Customer.MarketInfo.AverageSale = this.AvgData;
            Customer.BusinessInfo = new BusinessInformationView();
            Customer.BusinessInfo.Businessinfo = this.GetBusinessInfoFromForm();
            Customer.BankInfo = new BankDetailsView();
            Customer.BankInfo.SecurityDeposit = this.GetSecurityInfoFromForm();
            Customer.BankInfo.BankDetailInfo = this.BankData;
            // console.log("Approve", Customer);
            var Cusotmer = new CustomerOnboardingView1();
            Cusotmer.Status = "RACApproved";
            Cusotmer.TranID = this.transID;
            Cusotmer.UserID = this.authenticationDetails.UserID.toString();
            Cusotmer.PositionCode = this.authenticationDetails.PositionCode;
            Cusotmer.RoleName = this.authenticationDetails.UserRole;
            this.isProgressBarVisibile = true;


            this._dashboardService
                .updateCustomerOnboardingStatus(Customer)
                .subscribe(
                    (data) => {
                        // console.log(data);
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(
                            "Approved successfully",
                            SnackBarStatus.success
                        );
                        this._router.navigate(["/pages/approvalinformation"]);
                    },
                    (err) => {
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(
                            err instanceof Object
                                ? "Something went wrong"
                                : err,
                            SnackBarStatus.danger
                        );
                    }
                );
        }

    }
    Reject(): void {
        var Cusotmer = new CustomerOnboardingView1();
        Cusotmer.Status = "Rejected";
        Cusotmer.TranID = this.transID;
        Cusotmer.UserID = this.authenticationDetails.UserID.toString();
        Cusotmer.PositionCode = this.authenticationDetails.PositionCode;
        Cusotmer.RoleName = this.authenticationDetails.UserRole;
        this.isProgressBarVisibile = true;
        this._dashboardService
            .updateCustomerOnboardingRejectedStatus(Cusotmer)
            .subscribe(
                (data) => {
                    // console.log(data);
                    this.isProgressBarVisibile = false;
                    this.notificationSnackBarComponent.openSnackBar(
                        "Rejected successfully",
                        SnackBarStatus.success
                    );
                    this._router.navigate(["/pages/approvalinformation"]);
                },
                (err) => {
                    this.isProgressBarVisibile = false;
                    this.notificationSnackBarComponent.openSnackBar(
                        err instanceof Object ? "Something went wrong" : err,
                        SnackBarStatus.danger
                    );
                }
            );
        // if (this.Role == "ASM") {
        // var Cusotmer = new CustomerOnboardingView1();
        // Cusotmer.Status = "ASMRejected";
        // Cusotmer.TranID = this.transID;
        // Cusotmer.UserID = this.authenticationDetails.UserID.toString();
        // Cusotmer.PositionCode = this.authenticationDetails.PositionCode;
        // Cusotmer.RoleName = this.authenticationDetails.UserRole;
        // this.isProgressBarVisibile = true;
        // this._dashboardService
        //     .updateCustomerOnboardingRejectedStatus(Cusotmer)
        //     .subscribe(
        //         (data) => {
        //             // console.log(data);
        //             this.isProgressBarVisibile = false;
        //             this.notificationSnackBarComponent.openSnackBar(
        //                 "Rejected successfully",
        //                 SnackBarStatus.success
        //             );
        //             this._router.navigate(["/pages/approvalinformation"]);
        //         },
        //         (err) => {
        //             this.isProgressBarVisibile = false;
        //             this.notificationSnackBarComponent.openSnackBar(
        //                 err instanceof Object ? "Something went wrong" : err,
        //                 SnackBarStatus.danger
        //             );
        //         }
        //     );
        // }
        // if (this.Role == "SH") {
        //     var Cusotmer = new CustomerOnboardingView1();
        //     Cusotmer.Status = "SHRejected";
        //     Cusotmer.TranID = this.transID;
        //     Cusotmer.UserID = this.authenticationDetails.UserID.toString();
        //     Cusotmer.PositionCode = this.authenticationDetails.PositionCode;
        //     Cusotmer.RoleName = this.authenticationDetails.UserRole;
        //     this.isProgressBarVisibile = true;
        //     this._dashboardService
        //         .updateCustomerOnboardingRejectedStatus(Cusotmer)
        //         .subscribe(
        //             (data) => {
        //                 // console.log(data);
        //                 this.isProgressBarVisibile = false;
        //                 this.notificationSnackBarComponent.openSnackBar(
        //                     "Rejected successfully",
        //                     SnackBarStatus.success
        //                 );
        //                 this._router.navigate(["/pages/approvalinformation"]);
        //             },
        //             (err) => {
        //                 this.isProgressBarVisibile = false;
        //                 this.notificationSnackBarComponent.openSnackBar(
        //                     err instanceof Object ? "Something went wrong" : err,
        //                     SnackBarStatus.danger
        //                 );
        //             }
        //         );
        //     }
        //     if (this.Role == "ZH") {
        //         var Cusotmer = new CustomerOnboardingView1();
        //         Cusotmer.Status = "ZHRejected";
        //         Cusotmer.TranID = this.transID;
        //         Cusotmer.UserID = this.authenticationDetails.UserID.toString();
        //         Cusotmer.PositionCode = this.authenticationDetails.PositionCode;
        //         Cusotmer.RoleName = this.authenticationDetails.UserRole;
        //         this.isProgressBarVisibile = true;
        //         this._dashboardService
        //             .updateCustomerOnboardingRejectedStatus(Cusotmer)
        //             .subscribe(
        //                 (data) => {
        //                     // console.log(data);
        //                     this.isProgressBarVisibile = false;
        //                     this.notificationSnackBarComponent.openSnackBar(
        //                         "Rejected successfully",
        //                         SnackBarStatus.success
        //                     );
        //                     this._router.navigate(["/pages/approvalinformation"]);
        //                 },
        //                 (err) => {
        //                     this.isProgressBarVisibile = false;
        //                     this.notificationSnackBarComponent.openSnackBar(
        //                         err instanceof Object ? "Something went wrong" : err,
        //                         SnackBarStatus.danger
        //                     );
        //                 }
        //             );
        //         }
        //         if (this.Role == "DH") {
        //             var Cusotmer = new CustomerOnboardingView1();
        //             Cusotmer.Status = "DHRejected";
        //             Cusotmer.TranID = this.transID;
        //             Cusotmer.UserID = this.authenticationDetails.UserID.toString();
        //             Cusotmer.PositionCode = this.authenticationDetails.PositionCode;
        //             Cusotmer.RoleName = this.authenticationDetails.UserRole;
        //             this.isProgressBarVisibile = true;
        //             this._dashboardService
        //                 .updateCustomerOnboardingRejectedStatus(Cusotmer)
        //                 .subscribe(
        //                     (data) => {
        //                         // console.log(data);
        //                         this.isProgressBarVisibile = false;
        //                         this.notificationSnackBarComponent.openSnackBar(
        //                             "Rejected successfully",
        //                             SnackBarStatus.success
        //                         );
        //                         this._router.navigate(["/pages/approvalinformation"]);
        //                     },
        //                     (err) => {
        //                         this.isProgressBarVisibile = false;
        //                         this.notificationSnackBarComponent.openSnackBar(
        //                             err instanceof Object ? "Something went wrong" : err,
        //                             SnackBarStatus.danger
        //                         );
        //                     }
        //                 );
        //             }
        //             if (this.Role == "RAC") {
        //                 var Cusotmer = new CustomerOnboardingView1();
        //                 Cusotmer.Status = "RACRejected";
        //                 Cusotmer.TranID = this.transID;
        //                 Cusotmer.UserID = this.authenticationDetails.UserID.toString();
        //                 Cusotmer.PositionCode = this.authenticationDetails.PositionCode;
        //                 Cusotmer.RoleName = this.authenticationDetails.UserRole;
        //                 this.isProgressBarVisibile = true;
        //                 this._dashboardService
        //                     .updateCustomerOnboardingRejectedStatus(Cusotmer)
        //                     .subscribe(
        //                         (data) => {
        //                             // console.log(data);
        //                             this.isProgressBarVisibile = false;
        //                             this.notificationSnackBarComponent.openSnackBar(
        //                                 "Rejected successfully",
        //                                 SnackBarStatus.success
        //                             );
        //                             this._router.navigate(["/pages/approvalinformation"]);
        //                         },
        //                         (err) => {
        //                             this.isProgressBarVisibile = false;
        //                             this.notificationSnackBarComponent.openSnackBar(
        //                                 err instanceof Object ? "Something went wrong" : err,
        //                                 SnackBarStatus.danger
        //                             );
        //                         }
        //                     );
        //                 }
        //                 if (this.Role == "Stockist") {
        //                     var Cusotmer = new CustomerOnboardingView1();
        //                     Cusotmer.Status = "StockistRejected";
        //                     Cusotmer.TranID = this.transID;
        //                     Cusotmer.UserID = this.authenticationDetails.UserID.toString();
        //                     Cusotmer.PositionCode = this.authenticationDetails.PositionCode;
        //                     Cusotmer.RoleName = this.authenticationDetails.UserRole;
        //                     this.isProgressBarVisibile = true;
        //                     this._dashboardService
        //                         .updateCustomerOnboardingRejectedStatus(Cusotmer)
        //                         .subscribe(
        //                             (data) => {
        //                                 // console.log(data);
        //                                 this.isProgressBarVisibile = false;
        //                                 this.notificationSnackBarComponent.openSnackBar(
        //                                     "Rejected successfully",
        //                                     SnackBarStatus.success
        //                                 );
        //                                 this._router.navigate(["/pages/approvalinformation"]);
        //                             },
        //                             (err) => {
        //                                 this.isProgressBarVisibile = false;
        //                                 this.notificationSnackBarComponent.openSnackBar(
        //                                     err instanceof Object ? "Something went wrong" : err,
        //                                     SnackBarStatus.danger
        //                                 );
        //                             }
        //                         );
        //                     }
    }
    GetAttachment(fileName: string, file?: File): void {
        // if (file && file.size) {
        //     const blob = new Blob([file], { type: file.type });
        //     this.OpenAttachmentDialog(fileName, blob);
        // } else {
        console.log("FileName :", this.FileName);

        this.isProgressBarVisibile = true;
        this._dashboardService
            .DowloandAttachment(fileName, this.transID)
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
    OpenAttachmentDialog(FileName: string, blob: Blob): void {
        const attachmentDetails: AttachmentDetails = {
            FileName: FileName,
            blob: blob,
        };
        const dialogConfig: MatDialogConfig = {
            data: attachmentDetails,
            panelClass: "attachment-dialog",
        };
        // const dialogRef = this.dialog.open(
        //     AttachmentDialogComponent,
        //     dialogConfig
        // );
        // dialogRef.afterClosed().subscribe((result) => {
        //     if (result) {
        //     }
        // });
    }
    ngOnDestroy(): void {
        localStorage.removeItem("Approved");
        localStorage.removeItem("Rejected");
    }
}
