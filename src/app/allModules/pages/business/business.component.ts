import { SalesAndTarget, BusinessInformation } from "./../../../models/master";
import { Component, OnInit } from "@angular/core";
import {
    FormControl,
    FormBuilder,
    FormGroup,
    Validators,
} from "@angular/forms";
import { MatSnackBar, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import {
    AuthenticationDetails,
    BusinessInformationView,
    States,
} from "app/models/master";
import { NotificationSnackBarComponent } from "app/notifications/notification-snack-bar/notification-snack-bar.component";
import { SnackBarStatus } from "app/notifications/snackbar-status-enum";
import { CommonService } from "app/services/common.service";
import { DashboardService } from "app/services/dashboard.service";
export interface Monthlysales {
    Product: string;
}
const ELEMENT_DATA: Monthlysales[] = [
    { Product: "WallmaxX" },
    { Product: "WhitemaxX" },
    { Product: "GypsomaxX" },
    { Product: "ShieldmaxX" },
    { Product: "SmoothMaxX" },
    { Product: "RepairmaxX" },
    { Product: "TilemaxX" },
    { Product: "Woodamore" },
];
@Component({
    selector: "app-business",
    templateUrl: "./business.component.html",
    styleUrls: ["./business.component.scss"],
})
export class BusinessComponent implements OnInit {
    BIform!: FormGroup;
    BrandForm!: FormGroup;
    private listData: any;
    notificationSnackBarComponent: NotificationSnackBarComponent;
    displayedColumns: string[] = ["Product"];
    displayColumns: string[] = [
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
    //displayColumns:string[]=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    brandName: string[] = [
        "WallmaxX",
        "WhitemaxX",
        "GypsomaxX",
        "ShieldmaxX",
        "SmoothMaxX",
        "RepairmaxX",
        "TilemaxX",
        "Woodamore",
    ];
    columnsToDisplay: string[] = this.displayColumns.slice();
    dataSource: Monthlysales[] = ELEMENT_DATA;
    SOption: States[] = [];
    isProgressBarVisibile: boolean;
    authenticationDetails: AuthenticationDetails;

    currentTransaction: number;
    businessInfoView: BusinessInformationView = new BusinessInformationView();
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        private _dashboardService: DashboardService,
        public snackBar: MatSnackBar,
        private _commonService: CommonService
    ) {
        this.isProgressBarVisibile = false;
        this.listData = [];
        this.notificationSnackBarComponent = new NotificationSnackBarComponent(
            this.snackBar
        );
    }
    IdentityData: SalesAndTarget[] = [];
    IdentityAddClicked() {
        if (this.BrandForm.valid) {
            var identity = new SalesAndTarget();
            identity.Value = this.BrandForm.get("sales").value;
            identity.Month = this.BrandForm.get("date1").value;
            identity.TransID = this.currentTransaction;
            this.IdentityData.push(identity);
            this.BrandForm.reset();
        } else {
            this._commonService.ShowValidationErrors(this.BrandForm);
        }
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
        }
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
        this.BrandForm = this.fb.group({
            sales: ["", Validators.required],
            date1: [""],
            date2: [""],
        });
        // [a-zA-Z0-9]+$
        this.BIform.get("Wholesale").valueChanges.subscribe((value) => {
            if (value != "") {
                this.BIform.get("retail").setValue(
                    isNaN(value) ? 0 : 100 - value
                );
            } else {
                this.BIform.get("retail").setValue(isNaN(value) ? "" : "");
            }
        });
        this.isProgressBarVisibile = true;
        this._dashboardService.GetAllStates().subscribe(
            (data) => {
                this.SOption = data;
                this.GetBusinessDetails();
                this.isProgressBarVisibile = false;
            },
            (err) => console.log(err)
        );
    }
    GetBusinessDetails() {
        this.isProgressBarVisibile = true;
        this._dashboardService
            .GetBusinessInformationView(this.currentTransaction)
            .subscribe(
                (res) => {
                    console.log("view", res);
                    this.businessInfoView = res;
                    this.SetBusinessInfoDetails(this.businessInfoView);
                    this.isProgressBarVisibile = false;
                },
                (err) => {
                    console.log(err);
                }
            );
    }
    SetBusinessInfoDetails(
        businessInfoView: BusinessInformationView = new BusinessInformationView()
    ) {
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
            // this.BrandForm.patchValue({
            //   sales: ['', Validators.required],
            //   date1: [''],
            //   date2: [''],
            // });
        }
    }
    SubmitButtonClick(isDraft: boolean = false) {
        if (this.BIform.valid) {
            var cobView = new BusinessInformationView();
            cobView.Businessinfo = this.GetBusinessInfoFromForm();
            cobView.SalesandTargets = this.IdentityData;
            console.log("cobView", cobView);
            this.isProgressBarVisibile = true;
            this._dashboardService.SaveBusinessInfoView(cobView).subscribe(
                (res) => {
                    console.log("From save api", res);
                    this.isProgressBarVisibile = false;
                    this._router.navigate(["pages/marketinformation"]);
                    this.ClearAll();
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
        businessformvalues.TransID = this.currentTransaction;
        return businessformvalues;
    }
    public saletableNumber: number = 0;
    // addSales() {
    //   const number = 1;
    //   if(this.data || this.dataSource.filteredData) {
    //     this.dataSource.filteredData.push(this.brandName[this.saletableNumber]);
    //     this.saletableNumber = this.saletableNumber + number;
    //   }
    // }
    keyPressNumbers(event) {
        var charCode = event.which ? event.which : event.keyCode;
        // Only Numbers 0-9
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
            return false;
        } else {
            return true;
        }
    }

    saveBusinessInfo(): void {
        if (this.BIform.valid) {
            const businessformvalues: BusinessInformation =
                new BusinessInformation();
            businessformvalues.Turnover1 = this.BIform.get("NoOfYears").value;
            businessformvalues.Turnover2 = this.BIform.get("NoOfYears1").value;
            businessformvalues.Turnover3 = this.BIform.get("NoOfYears2").value;
            businessformvalues.Retail = parseInt(
                this.BIform.get("retail").value
            );
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
            this._dashboardService
                .AddBusinessInfo(businessformvalues)
                .subscribe(
                    (data) => {
                        console.log(data);
                        this.notificationSnackBarComponent.openSnackBar(
                            "Saved successfully",
                            SnackBarStatus.success
                        );
                        this._router.navigate(["pages/marketinformation"]);
                    },
                    (err) => {
                        console.error(err);
                    }
                );
        } else {
            this._commonService.ShowValidationErrors(this.BIform);
        }
        // this._router.navigate(['pages/nextlogin']);
    }
    public count = -1;
    public a: string = "";
    public data = [];
    public SaleData = [];
    add(): void {
        var d = new Date();
        d.setDate(1); //REM: To prevent month skipping.
        this.data.push(this.displayColumns[d.getMonth()]);
        console.log(this.displayColumns);
        console.log("data ", this.data);

        for (var i = 0; i < 11; i++) {
            d.setMonth(d.getMonth() + 1);
            this.data.push(this.displayColumns[d.getMonth()]);
            console.log(this.displayColumns[d.getMonth()], d.getFullYear());
        }
        if (this.count < 12) {
            this.count++;
        }
        if (this.data[this.count] != "Mar") {
            this.a += " " + this.data[this.count];
            this.displayedColumns.push(this.data[this.count]);
        } else {
            this.a += " " + this.data[this.count];
            this.displayedColumns.push(this.data[this.count]);
            this.count = 13;
        }
    }

    onAdd(): void {
        this.listData.push(this.BrandForm.value);
        this.BrandForm.reset();
    }
    RegistrationClicked(): void {
        this._router.navigate(["pages/marketinformation"]);
    }
    previousbtn(): void {
        this._router.navigate(["pages/dashboard"]);
    }
    nextbtn(): void {
        this._router.navigate(["pages/bankinformation"]);
    }
    ClearAll(): void {
        this.BIform.reset();
    }
}
// export class BusinessInformation {
//   ID !: string;
//   Turnover !: string;
//   WorkingCaptial!: string;
//   Retail!: number;
//   NoVechicle!: number;
//   TotalStorage!: string;
//   Wholesale!: number;
//   Retailers!: string;
// }
