import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import {
    MatTableDataSource,
    MatSort,
    MatPaginator,
    MatTabChangeEvent,
} from "@angular/material";
import { Router } from "@angular/router";
import {
    AuthenticationDetails,
    PersonalInfoStatusView,
} from "app/models/master";
import { DashboardService } from "app/services/dashboard.service";
// import { ChartDataSets, ChartOptions } from 'chart.js';
// import { Color, Label } from 'ng2-charts';
import { Chart } from "chart.js";
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexTooltip,
    ApexStroke,
    ApexResponsive,
    ApexNonAxisChartSeries,
    ApexLegend,
} from "ng-apexcharts";
export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    tooltip: ApexTooltip;
    responsive: ApexResponsive[];
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
};
export type ChartOptions1 = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
    legend: any;
    dataLabels: ApexDataLabels; // add this
    colors: any[];
};
export interface Element {
    No: number;
    Name: string;
    Gmail: string;
    Type: string;
    Country: string;
    MobileNo: string;
    Status: string;
    Action: string;
}
const datas: Element[] = [
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
    {
        No: 1,
        Name: "prasath",
        Gmail: "prasath@exalca.com",
        Type: "jagdb",
        Country: "India",
        MobileNo: "9486740455",
        Status: "Single",
        Action: "action",
    },
];
@Component({
    selector: "app-approvalscreen",
    templateUrl: "./approvalscreen.component.html",
    styleUrls: ["./approvalscreen.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ApprovalscreenComponent implements OnInit {
    PI: PersonalInformation[] = [];
    PIStatus: PersonalInfoStatusView[] = [];
    AllOpenDetails: any[] = [];
    AllHeaderDetails: any[] = [];
    AllApprovedDetails: any[] = [];
    AllRejectedDetails: any[] = [];
    tab: any;
    employeesDataSource: MatTableDataSource<PersonalInfoStatusView>;
    employeesDisplayColumns: string[] = [
        "No",
        "Name",
        "Gmail",
        "Type",
        "Country",
        "Status",
        "Action",
    ];
    //employeesDataSource = datas;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    public chartOptions1: Partial<ChartOptions1>;
    public chart1: any;
    authenticationDetails: AuthenticationDetails;
    currentTransaction: number;
    links = ["All", "Open", "Approved", "Rejected"];
    activeLink = this.links[0];
    Role: string;
    constructor(
        private _router: Router,
        private _dashboardService: DashboardService,
        private elementRef: ElementRef
    ) {
        this.chartOptions = {
            series: [
                {
                    name: "series1",
                    data: [31, 40, 28, 51, 42, 109, 100],
                },
                {
                    name: "series2",
                    data: [11, 32, 45, 32, 34, 52, 41],
                },
            ],
            chart: {
                height: 150,
                width: 400,
                toolbar: {
                    show: false,
                },
                type: "area",
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
            },
            stroke: {
                curve: "smooth",
            },
            xaxis: {
                type: "datetime",

                categories: [
                    "2018-09-19T00:00:00.000Z",
                    "2018-09-19T01:30:00.000Z",
                    "2018-09-19T02:30:00.000Z",
                    "2018-09-19T03:30:00.000Z",
                    "2018-09-19T04:30:00.000Z",
                    "2018-09-19T05:30:00.000Z",
                    "2018-09-19T06:30:00.000Z",
                ],
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm",
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 500,
                            redrawOnWindowResize: false,
                        },
                    },
                },
            ],
        };
        this.chartOptions1 = {
            series: [45, 52, 22, 51, 30],
            chart: {
                type: "donut",
                width: "200px",
            },
            labels: [],
            // labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F'],
            colors: ["#1158A6", "#1158A6", "#1158A6", "#1158A6", "#C1D6EA"], // add this part to modify colours
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 100,
                        },
                    },
                },
            ],

            legend: {
                show: false,
            },
            dataLabels: {
                // add this part to remove %
                enabled: false,
                formatter(value: any, opts: any): any {
                    return opts.w.config.series[opts.seriesIndex];
                },
            },
        };

        // this.chartOptions1 = {
        //   series: [44, 55, 13, 43, 22],
        //   chart: {
        //     type: "donut"
        //   },
        //   labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        //   responsive: [
        //     {
        //       breakpoint: 480,
        //       options: {
        //         chart: {
        //           width: 150
        //         },
        //         legend: {
        //           position: "bottom"
        //         }
        //       }
        //     }
        //   ]
        // };
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
        if (this.Role == "ASM") {
            // this._dashboardService
            //     .getPersonalInfoByStatus("CustomerReleased")
            //     .subscribe((data) => {
            //         this.AllHeaderDetails = data;
            //         this.LoadTableSource(this.AllHeaderDetails);
            //     });
        }
        if (this.Role == "Stokist") {
            this._dashboardService
                .getPersonalInfoByStatus("RACApproved")
                .subscribe((data) => {
                    this.AllHeaderDetails = data;
                    this.LoadTableSource(this.AllHeaderDetails);
                });
        }
        if (this.Role == "DH") {
            this._dashboardService
                .getPersonalInfoByStatus("ZHApproved")
                .subscribe((data) => {
                    this.AllHeaderDetails = data;
                    this.LoadTableSource(this.AllHeaderDetails);
                });
        }
        if (this.Role == "ZH") {
            this._dashboardService
                .getPersonalInfoByStatus("SHApproved")
                .subscribe((data) => {
                    this.AllHeaderDetails = data;
                    this.LoadTableSource(this.AllHeaderDetails);
                });
        }
        if (this.Role == "SH") {
            this._dashboardService
                .getPersonalInfoByStatus("ASMApproved")
                .subscribe((data) => {
                    this.AllHeaderDetails = data;
                    this.LoadTableSource(this.AllHeaderDetails);
                });
        }
        if (this.Role == "RAC") {
            this._dashboardService
                .getPersonalInfoByStatus("DHApproved")
                .subscribe((data) => {
                    this.AllHeaderDetails = data;
                    this.LoadTableSource(this.AllHeaderDetails);
                });
        }
        this.tab = "All";

        this._dashboardService
            .getPersonalInfoByStatus("Rejected")
            .subscribe((data) => {
                this.AllRejectedDetails = data;
            });
        //   this.GetEmployeewithDraft();
        //   this.GetEmployeewithRespodedStatus();
        //   this.GetEmployeewithPendingStatus();
        //   this.GetEmployeewithApprovesStatus();
        //   this.GetEmployeewithRejectedStatus();
        // this.GetEmployees(); // forgeted this line
    }
    tabClick(event: MatTabChangeEvent): void {
        this.tab = event.tab.textLabel;
        console.log(this.tab);
        if (this.tab === "All") {
            this.GetEmployees();
        }
        if (this.tab === "Open") {
            this.GetEmployeewithOpenStatus();
        }
        if (this.tab === "Rejected") {
            this.GetEmployeewithRejectedStatus();
        }
    }
    GetEmployees(): void {
        if (this.Role == "ASM") {
            this._dashboardService
                .getPersonalInfoByStatus("CustomerReleased")
                .subscribe((data) => {
                    this.AllHeaderDetails = data;
                    this.LoadTableSource(this.AllHeaderDetails);
                });
        }
        if (this.Role == "Stokist") {
            this._dashboardService
                .getPersonalInfoByStatus("RACApproved")
                .subscribe((data) => {
                    this.AllHeaderDetails = data;
                    this.LoadTableSource(this.AllHeaderDetails);
                });
        }
        if (this.Role == "DH") {
            this._dashboardService
                .getPersonalInfoByStatus("ZHApproved")
                .subscribe((data) => {
                    this.AllHeaderDetails = data;
                    this.LoadTableSource(this.AllHeaderDetails);
                });
        }
        if (this.Role == "ZH") {
            this._dashboardService
                .getPersonalInfoByStatus("SHApproved")
                .subscribe((data) => {
                    this.AllHeaderDetails = data;
                    this.LoadTableSource(this.AllHeaderDetails);
                });
        }
        if (this.Role == "SH") {
            this._dashboardService
                .getPersonalInfoByStatus("ASMApproved")
                .subscribe((data) => {
                    this.AllHeaderDetails = data;
                    this.LoadTableSource(this.AllHeaderDetails);
                });
        }
        if (this.Role == "RAC") {
            this._dashboardService
                .getPersonalInfoByStatus("DHApproved")
                .subscribe((data) => {
                    this.AllHeaderDetails = data;
                    this.LoadTableSource(this.AllHeaderDetails);
                });
        }
    }

    GetEmployeewithOpenStatus(): void {
        if (this.Role == "ASM") {
            this._dashboardService
                .getPersonalInfoByStatus("CustomerReleased")
                .subscribe((data) => {
                    this.AllOpenDetails = data;
                    this.LoadTableSource(this.AllOpenDetails);
                    // this.employeesDataSource =
                    //     new MatTableDataSource<PersonalInfoStatusView>(data); //pass the array you want in the table
                    // this.employeesDataSource.sort = this.sort;
                    // this.employeesDataSource.paginator = this.paginator;
                });
        }
        if (this.Role == "Stokist") {
            this._dashboardService
                .getPersonalInfoByStatus("RACApproved")
                .subscribe((data) => {
                    this.AllOpenDetails = data;
                    this.LoadTableSource(this.AllOpenDetails);
                    // this.employeesDataSource =
                    //     new MatTableDataSource<PersonalInfoStatusView>(data); //pass the array you want in the table
                    // this.employeesDataSource.sort = this.sort;
                    // this.employeesDataSource.paginator = this.paginator;
                });
        }
        if (this.Role == "DH") {
            this._dashboardService
                .getPersonalInfoByStatus("ZHApproved")
                .subscribe((data) => {
                    this.AllOpenDetails = data;
                    this.LoadTableSource(this.AllOpenDetails);
                    // this.employeesDataSource =
                    //     new MatTableDataSource<PersonalInfoStatusView>(data); //pass the array you want in the table
                    // this.employeesDataSource.sort = this.sort;
                    // this.employeesDataSource.paginator = this.paginator;
                });
        }
        if (this.Role == "ZH") {
            this._dashboardService
                .getPersonalInfoByStatus("SHApproved")
                .subscribe((data) => {
                    this.AllOpenDetails = data;
                    this.LoadTableSource(this.AllOpenDetails);
                    // this.employeesDataSource =
                    //     new MatTableDataSource<PersonalInfoStatusView>(data); //pass the array you want in the table
                    // this.employeesDataSource.sort = this.sort;
                    // this.employeesDataSource.paginator = this.paginator;
                });
        }
        if (this.Role == "SH") {
            this._dashboardService
                .getPersonalInfoByStatus("ASMApproved")
                .subscribe((data) => {
                    this.AllOpenDetails = data;
                    this.LoadTableSource(this.AllOpenDetails);
                    // this.employeesDataSource =
                    //     new MatTableDataSource<PersonalInfoStatusView>(data); //pass the array you want in the table
                    // this.employeesDataSource.sort = this.sort;
                    // this.employeesDataSource.paginator = this.paginator;
                });
        }
        if (this.Role == "RAC") {
            this._dashboardService
                .getPersonalInfoByStatus("DHApproved")
                .subscribe((data) => {
                    this.AllOpenDetails = data;
                    this.LoadTableSource(this.AllOpenDetails);
                    // this.employeesDataSource =
                    //     new MatTableDataSource<PersonalInfoStatusView>(data); //pass the array you want in the table
                    // this.employeesDataSource.sort = this.sort;
                    // this.employeesDataSource.paginator = this.paginator;
                });
        }
    }
    GetEmployeewithApprovedStatus(): void {
        if (this.Role == "ASM") {
            this._dashboardService
                .getPersonalInfoByStatus("ASMApproved")
                .subscribe((data) => {
                    this.AllOpenDetails = data;
                    this.LoadTableSource(this.AllOpenDetails);
                    // this.employeesDataSource =
                    //     new MatTableDataSource<PersonalInfoStatusView>(data); //pass the array you want in the table
                    // this.employeesDataSource.sort = this.sort;
                    // this.employeesDataSource.paginator = this.paginator;
                });
        }
        if (this.Role == "Stokist") {
            this._dashboardService
                .getPersonalInfoByStatus("Stokist")
                .subscribe((data) => {
                    this.AllOpenDetails = data;
                    this.LoadTableSource(this.AllOpenDetails);
                    // this.employeesDataSource =
                    //     new MatTableDataSource<PersonalInfoStatusView>(data); //pass the array you want in the table
                    // this.employeesDataSource.sort = this.sort;
                    // this.employeesDataSource.paginator = this.paginator;
                });
        }
        if (this.Role == "DH") {
            this._dashboardService
                .getPersonalInfoByStatus("DHApproved")
                .subscribe((data) => {
                    this.AllOpenDetails = data;
                    this.LoadTableSource(this.AllOpenDetails);
                    // this.employeesDataSource =
                    //     new MatTableDataSource<PersonalInfoStatusView>(data); //pass the array you want in the table
                    // this.employeesDataSource.sort = this.sort;
                    // this.employeesDataSource.paginator = this.paginator;
                });
        }
        if (this.Role == "ZH") {
            this._dashboardService
                .getPersonalInfoByStatus("ZHApproved")
                .subscribe((data) => {
                    this.AllOpenDetails = data;
                    this.LoadTableSource(this.AllOpenDetails);
                    // this.employeesDataSource =
                    //     new MatTableDataSource<PersonalInfoStatusView>(data); //pass the array you want in the table
                    // this.employeesDataSource.sort = this.sort;
                    // this.employeesDataSource.paginator = this.paginator;
                });
        }
        if (this.Role == "SH") {
            this._dashboardService
                .getPersonalInfoByStatus("SHApproved")
                .subscribe((data) => {
                    this.AllOpenDetails = data;
                    this.LoadTableSource(this.AllOpenDetails);
                    // this.employeesDataSource =
                    //     new MatTableDataSource<PersonalInfoStatusView>(data); //pass the array you want in the table
                    // this.employeesDataSource.sort = this.sort;
                    // this.employeesDataSource.paginator = this.paginator;
                });
        }
        if (this.Role == "RAC") {
            this._dashboardService
                .getPersonalInfoByStatus("RACApproved")
                .subscribe((data) => {
                    this.AllOpenDetails = data;
                    this.LoadTableSource(this.AllOpenDetails);
                    // this.employeesDataSource =
                    //     new MatTableDataSource<PersonalInfoStatusView>(data); //pass the array you want in the table
                    // this.employeesDataSource.sort = this.sort;
                    // this.employeesDataSource.paginator = this.paginator;
                });
        }
    }
    GetEmployeewithRejectedStatus(): void {
        this._dashboardService
            .getPersonalInfoByStatus("Rejected")
            .subscribe((data) => {
                this.AllRejectedDetails = data;
                this.LoadTableSource(this.AllRejectedDetails);
                // this.employeesDataSource =
                //     new MatTableDataSource<PersonalInfoStatusView>(data); //pass the array you want in the table
                // this.employeesDataSource.sort = this.sort;
                // this.employeesDataSource.paginator = this.paginator;
            });
    }
    LoadTableSource(DataArray: any[]) {
        this.employeesDataSource = new MatTableDataSource(DataArray);
        this.employeesDataSource.paginator = this.paginator;
        this.employeesDataSource.sort = this.sort;
    }
    GotoPersonalInfo(TransID): void {
        localStorage.setItem("TransID", TransID);
        localStorage.setItem("ActionStatus", "Draft");
        this._router.navigate(["pages/reportview"]);
    }
    GotoPersonalInfoWithReview(TransID): void {
        localStorage.setItem("TransID", TransID);
        localStorage.setItem("ActionStatus", "Responded");
        this._router.navigate(["pages/reportview"]);
    }
}

export class PersonalInformation {
    ID!: string;
    category!: string;
    Name!: string;
    Address!: string;
    District!: string;
    Product!: string;
    City: string;
    Taluk: string;
    Tehsil: string;
    State!: string;
    Pincode!: number;
    Status!: string;
    identity!: string;
    Name1!: string;
    DOB!: Date;
    Mobile1!: number;
    Mobile2!: number;
    EmailId1!: string;
    EmailId2!: string;
}
