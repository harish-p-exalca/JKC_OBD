import { Component, OnInit } from "@angular/core";
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

export interface Element {
    Role: string;
    Name: string;
    MobileNo: string;
    Emailid: string;
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
})
export class ReportsviewComponent implements OnInit {
    PIform: FormGroup;
    MIform!: FormGroup;
    BrandForm!: FormGroup;
    BIform!: FormGroup;
    BrandForm1!: FormGroup;
    BIform1!: FormGroup;
    contactDetailsColumns: string[] = ["Role", "Name", "MobileNo", "Emailid"];
    contactdataSource = datas;
    averageSalesColumns: string[] = [
        "White_Cement_Wall_Putty",
        "WP_Avg_Month_Sales",
        "WC_Avg_Month_sales",
    ];
    averageSalesDataSource = avgdatasource;
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
    saleDataSource = sales;
    authenticationDetails: AuthenticationDetails;
    currentTransaction: number;
    SOption: States[] = [];
    City: Cities[] = [];
    selected = "";
    IdentityData: PersonIdentity[] = [];
    CustomerObdView: CustomerOnboardingView = new CustomerOnboardingView();
    transID: any;
    MarketInfoView: MarketInformationView = new MarketInformationView();
    businessInfoView: BusinessInformationView = new BusinessInformationView();
    constructor(
        private fb: FormBuilder,
        private _dashboardService: DashboardService
    ) {}

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
        this.InitializeFormGroup();
        this.transID = localStorage.getItem("TransID");
        if (this.transID != null) {
            this._dashboardService
                .GetCustomerOnboardingView(this.transID)
                .subscribe(
                    (res) => {
                        console.log("view", res);
                        this.CustomerObdView = res;
                        this.SetPersonalInfoValues();
                    },
                    (err) => {
                        console.log(err);
                    }
                );
            this._dashboardService
                .GetMarketInformationView(this.transID)
                .subscribe(
                    (res) => {
                        console.log("view", res);
                        this.MarketInfoView = res;
                        this.SetMarketInfoDetails(this.MarketInfoView);
                    },
                    (err) => {
                        console.log(err);
                    }
                );
                this._dashboardService.GetBusinessInformationView(this.transID).subscribe(res => {
                  console.log("view", res);
                  this.businessInfoView = res;
                  this.SetBusinessInfoDetails(this.businessInfoView);
              },
                  err => {
                      console.log(err);
                  });
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
        this.BrandForm = this.fb.group({
            brand: ["", Validators.required],
            wpMonth: [""],
            wcMonth: [""],
        });
        this.BIform = this.fb.group({
          NoOfYears: ['', Validators.required],
          NoOfYears1: ['', Validators.required],
          NoOfYears2: ['', Validators.required],
          capitalinvest: ['', Validators.required],
          storagecapacity: ['', Validators.required],
          retail: ['', Validators.required],
          vehicle: ['', Validators.required],
          Wholesale: ['', Validators.required],
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
            Status: ["", Validators.required],
        });
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
    GetTransactionDetails() {
        this._dashboardService
            .GetCustomerOnboardingView(this.currentTransaction)
            .subscribe(
                (res) => {
                    console.log("view", res);
                    this.CustomerObdView = res;
                    this.SetPersonalInfoValues();
                },
                (err) => {
                    console.log(err);
                }
            );
    }
    SetPersonalInfoValues() {
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
        this.selected =
            this.CustomerObdView.PersonalInfo.PersonalInformation.Status;
        this.IdentityData = this.CustomerObdView.PersonalInfo.Identities;
    }
    SetMarketInfoDetails(
        MarketInfoView: MarketInformationView = new MarketInformationView()
    ) {
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
            // this.BrandForm.patchValue({
            //   sales: ['', Validators.required],
            //   date1: [''],
            //   date2: [''],
            // });
        }
    }
    SetBusinessInfoDetails(businessInfoView:BusinessInformationView = new BusinessInformationView() ) {

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
}
