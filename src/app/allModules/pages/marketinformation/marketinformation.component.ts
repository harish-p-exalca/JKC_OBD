import {
    AverageSale,
    MarketInformationView,
    States,
} from "./../../../models/master";
import { Component, OnInit } from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { AuthenticationDetails, MarketInformation } from "app/models/master";
import { NotificationSnackBarComponent } from "app/notifications/notification-snack-bar/notification-snack-bar.component";
import { SnackBarStatus } from "app/notifications/snackbar-status-enum";
import { CommonService } from "app/services/common.service";
import { DashboardService } from "app/services/dashboard.service";
export interface Monthlysales {
    cement: string;
    wp: string;
    wc: string;
}
const ELEMENT_DATA: Monthlysales[] = [
    { cement: "Birla", wp: "Enter", wc: "Enter" },
    { cement: "JK Cement", wp: "Enter", wc: "Enter" },
    // { cement : "JK Laxmi",wp:"Enter",wc:"Enter"},
    // { cement : "Asian Paints",wp:"Enter",wc:"Enter"},
    // { cement : "Berger",wp:"Enter",wc:"Enter"},
    // { cement : "Nerolac",wp:"Enter",wc:"Enter"},
    // { cement : "Other Paint Cos",wp:"Enter",wc:"Enter"},
    // { cement : "Other Local Brands",wp:"Enter",wc:"Enter"},
];
@Component({
    selector: "app-marketinformation",
    templateUrl: "./marketinformation.component.html",
    styleUrls: ["./marketinformation.component.scss"],
})
export class MarketinformationComponent implements OnInit {
    partylist: string[] = [
        "Paint",
        "Grey Cement",
        "Hardware",
        "Wall Putty",
        "White cement",
        "Sanitary",
        "Water Proofing Chemicals",
        "others",
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
    selected = "";
    MIform!: FormGroup;
    BrandForm!: FormGroup;
    public listData: any;
    isgst: boolean = false;
    ispan: boolean = false;
    // selected:boolean=true;
    notificationSnackBarComponent: NotificationSnackBarComponent;
    displayedColumns: string[] = ["cement", "wp", "wc"];
    dataSource = ELEMENT_DATA;
    authenticationDetails: AuthenticationDetails;
    currentTransaction: number;
    SOption: States[] = [];
    isProgressBarVisibile: boolean;
    MarketInfoView: MarketInformationView = new MarketInformationView();
    TransID: number;
    CustmerView: boolean = true;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public snackBar: MatSnackBar,
        private _dashboardService: DashboardService,
        private _commonService: CommonService
    ) {
        this.isProgressBarVisibile = false;
        this.notificationSnackBarComponent = new NotificationSnackBarComponent(
            this.snackBar
        );
        this.listData = [];
    }
    IdentityData: AverageSale[] = [];
    IdentityAddClicked() {
        if (this.BrandForm.valid) {
            var identity = new AverageSale();
            identity.AvgSale = this.BrandForm.get("wpMonth").value;
            identity.Brand = this.BrandForm.get("brand").value;
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
        else {
            this.currentTransaction = parseInt(localStorage.getItem("TransID"));
        }
        if (this.authenticationDetails.UserRole == "Customer") {
            this.CustmerView = true;
        }
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
                    Validators.pattern(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/),
                ],
            ],
            Gst: [
                "",
                [
                    Validators.required,
                    Validators.pattern(
                        /^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[1-9A-Za-z]{1}Z[0-9A-Za-z]{1}$/
                    ),
                ],
            ],
            PartyBackground: ["", Validators.required],

        });
        // this.MIform.get("YearOfEstablished").valueChanges.subscribe((value) => {
        //     if (value != "" && value!=null) {
        //         if(value<new Date().getFullYear && value>1900){
        //             this.MIform.get("YearOfEstablished").setValue(value);
        //         }
        //         else if(value>2022){
        //             this.MIform.get("YearOfEstablished").setValue(null);
        //             this.notificationSnackBarComponent.openSnackBar("Please enter valid year",SnackBarStatus.danger);
        //         }
        //     }
        // });
        this.BrandForm = this.fb.group({
            brand: ["", Validators.required],
            wpMonth: [""],
            wcMonth: [""],
        });
        this.isProgressBarVisibile = true;
        this._dashboardService.GetAllStates().subscribe(
            (data) => {
                this.SOption = data;
                this.GetMarketDetails();
                this.isProgressBarVisibile = false;
            },
            (err) => console.log(err)
        );

    }
    GetMarketDetails() {
        this.isProgressBarVisibile = true;
        this._dashboardService
            .GetMarketInformationView(this.currentTransaction)
            .subscribe(
                (res) => {
                    console.log("view", res);
                    this.MarketInfoView = res;
                    this.SetMarketInfoDetails(this.MarketInfoView);
                    this.isProgressBarVisibile = false;
                },
                (err) => {
                    console.log(err);
                }
            );
    }
    SetMarketInfoDetails(
        MarketInfoView: MarketInformationView = new MarketInformationView()
    ) {
        if (MarketInfoView.MarketInformation && MarketInfoView.MarketInformation.TransID != null) {
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
            if (localStorage.getItem('ActionStatus') == "Pending") {
                this.MIform.disable();
            }
            // this.BrandForm.patchValue({
            //   sales: ['', Validators.required],
            //   date1: [''],
            //   date2: [''],
            // });
        }
    }
    SubmitButtonClick(isDraft: boolean = false) {
        console.log(this.MIform.disabled);
        if (this.MIform.valid) {
            var cobView = new MarketInformationView();
            cobView.MarketInformation = this.GetMarketInfoFromForm();
            cobView.AverageSale = this.IdentityData;
            console.log("cobView", cobView);
            this.isProgressBarVisibile = true;
            this._dashboardService.SaveMarketInfoView(cobView).subscribe(
                (res) => {
                    console.log("From save api", res);
                    this.isProgressBarVisibile = false;
                    this._router.navigate(["pages/businessinformation"]);
                    this.ClearAll();
                },
                (err) => {
                    this.notificationSnackBarComponent.openSnackBar(
                        err instanceof Object ? "Something went wrong" : err,
                        SnackBarStatus.danger
                    );
                }
            );
        }
        else if (this.MIform.disabled) {
            localStorage.setItem("ActionStatus", "Pending");
            this._router.navigate(['/pages/businessinformation']);
        }
        else {
            this._commonService.ShowValidationErrors(this.MIform);
        }
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
        marketInformation.TransID = this.currentTransaction;
        return marketInformation;
    }
    previousbtn(): void {
        this._router.navigate(["pages/dashboard"]);
    }
    nextbtn(): void {
        this._router.navigate(["pages/businessinformation"]);
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
    IsGstValid() {
        let GST = this.MIform.controls["Gst"].value;
        if (
            /^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[1-9A-Za-z]{1}Z[0-9A-Za-z]{1}$/.test(
                GST
            )
        ) {
            console.log("true");
            this.isgst = true;
        } else {
            console.log("false");
            this.isgst = false;
        }
    }
    IsPanValid() {
        let Pan = this.MIform.controls["Pan"].value;
        if (/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/.test(Pan)) {
            console.log("true");
            this.ispan = true;
        } else {
            console.log("false");
            this.ispan = false;
        }
    }
    saveInfo(): void {
        if (this.MIform.valid) {
            const personalinformation: MarketInformation =
                new MarketInformation();
            personalinformation.MarketName = this.MIform.get("market").value;
            personalinformation.Population =
                this.MIform.get("Population").value;
            personalinformation.MarketPotential =
                this.MIform.get("Potential").value;
            personalinformation.StockList = this.MIform.get("Stockist").value;
            personalinformation.Distance = this.MIform.get("Distance").value;
            personalinformation.StockListName =
                this.MIform.get("NameOfNearest").value;
            personalinformation.Year =
                this.MIform.get("YearOfEstablished").value;
            personalinformation.Area = this.MIform.get("AreasStockist").value;
            personalinformation.Total = this.MIform.get("TotalPotential").value;
            personalinformation.MonthlySale = this.MIform.get("JKAvg").value;
            personalinformation.PanNo = this.MIform.get("Pan").value;
            personalinformation.GstNo = this.MIform.get("Gst").value;
            personalinformation.Background =
                this.MIform.get("PartyBackground").value;

            // this._dashboardService.AddMArketInfo(personalinformation).subscribe(
            //     (data) => {
            //         console.log(data);
            //         this.notificationSnackBarComponent.openSnackBar(
            //             "Saved successfully",
            //             SnackBarStatus.success
            //         );
            //         this._router.navigate(["pages/bankinformation"]);
            //     },
            //     (err) => {
            //         console.error(err);
            //         this.notificationSnackBarComponent.openSnackBar(
            //             "Something went wrong",
            //             SnackBarStatus.danger
            //         );
            //     }
            // );
        } else {
            this._commonService.ShowValidationErrors(this.MIform);
        }
    }
    onAdd(): void {
        var val = this.BrandForm.value;
        var avgSale = this.listData.find(t => t.brand == val.brand);
        if (this.listData.length == 0) {
            this.listData.push(this.BrandForm.value);
            this.IdentityAddClicked();
            this.BrandForm.reset();
        }
        else if (avgSale != undefined) {
            this.notificationSnackBarComponent.openSnackBar("Record already exists!!", SnackBarStatus.danger);
        }
        else {
            this.listData.push(this.BrandForm.value);
            this.IdentityAddClicked();
            this.BrandForm.reset();
        }
    }

    // nextbtn():void{
    //   this._router.navigate(['pages/marketinformation'])
    // }
    ClearAll(): void {
        this.MIform.reset();
    }
}
