import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import {
    MatIconRegistry,
    MatSnackBar,
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatTabChangeEvent,
} from "@angular/material";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationSnackBarComponent } from "app/notifications/notification-snack-bar/notification-snack-bar.component";
import { SnackBarStatus } from "app/notifications/notification-snack-bar/notification-snackbar-status-enum";
import { AuthenticationDetails, Cities, CustomerOnboardingView, CustomerOnboarding, PersonIdentity, States, PersonalInformation, PersonalInformationView } from "app/models/master";
import { fuseAnimations } from "@fuse/animations";
import { DashboardService } from "app/services/dashboard.service";
import { ShareParameterService } from "app/services/share-parameters.service";
import { SelectionModel } from "@angular/cdk/collections";
import { Guid } from "guid-typescript";
import {
    FormGroup,
    Validators,
    FormBuilder,
    FormControl,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { dialogComponent } from "./dialog.component";
import { map, startWith } from "rxjs/operators";
import { forEach } from 'lodash';
import { CommonService } from "app/services/common.service";
export interface DialogData {
    Firmname: string;
}
@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class DashboardComponent implements OnInit {
    categorylist: string[] = [
        "Stockist",
        "Retail Stockist",
        "D2RS Retail Stockist",
    ];
    productlist: string[] = ["WP", "WC", "POP", "TM", "Woodamore"];
    identitylist: string[] = [
        "Proprietor",
        "Partner Name 1",
        "Partner Name 2",
        "Director 1",
        "Director 2",
    ];
    authenticationDetails: AuthenticationDetails;
    currentUserID: Guid;
    color = '#90b645';
    PersonalDetailOTP: any;
    currentUserRole: string;
    MenuItems: string[];
    isProgressBarVisibile: boolean;
    notificationSnackBarComponent: NotificationSnackBarComponent;
    displayedColumns: string[] = [
        "INV_NO",
        "INV_DATE",
        "INV_TYPE",
        "PLANT",
        "VEHICLE_NO",
        "VEHICLE_CAPACITY",
        "FWD_AGENT",
        "CARRIER",
        "EWAYBILL_NO",
        "EWAYBILL_DATE",
        "PROPOSED_DELIVERY_DATE",
        "ACTUAL_DELIVERY_DATE",
    ];
    dataSource = new MatTableDataSource<any>();
    selection = new SelectionModel<any>(true, []);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    SOption: States[] = [
    ];
    States: string[] = [];
    City: Cities[] = [];
    arr: any;
    Role: boolean = false;
    filteropt: Observable<string[]>;
    firmForm!: FormGroup;
    private listData: any;
    public listData1 = [];
    selected = '';
    currentTransaction: number;
    SubmitValue: boolean = false;
    transID: any;
    UserRole: string;
    Responded: string;
    CustomerObdView: CustomerOnboardingView = new CustomerOnboardingView();
    Districts:string[]=[];
    Talukas:string[]=[];
    PinCodes:string[]=[];
    constructor(
        private _router: Router,
        private route: ActivatedRoute,
        private _dashboardService: DashboardService,
        private _shareParameterService: ShareParameterService,
        public snackBar: MatSnackBar,
        private fb: FormBuilder,
        public dialog: MatDialog,
        private _commonService: CommonService
    ) {
        this.isProgressBarVisibile = false;
        this.notificationSnackBarComponent = new NotificationSnackBarComponent(
            this.snackBar
        );
        this.listData = [];
    }
    PIform: FormGroup;
    // PI: PersonalInformation[] = [];

    // selectedPI: PersonalInformation = new PersonalInformation();
    ngOnInit(): void {
        const retrievedObject = localStorage.getItem('authorizationData');
        if (retrievedObject) {
            this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
            this.currentTransaction = parseInt(this.authenticationDetails.Token);
        }
        this.UserRole = this.authenticationDetails.UserRole;
        if (this.UserRole == "SSA") {
            this.SubmitValue = false;
        }
        if (this.authenticationDetails.UserRole == "Customer") {
            this.Role = true;
            this.SubmitValue = true;
            
        }
       
        this.InitializeFormGroup();
        this.filteropt = this.PIform.get("State").valueChanges.pipe(
            startWith(""),
            map((value) => this._filterstate(value))
        );
        this.transID = localStorage.getItem('TransID');
        if(this.transID != null || this.transID!=NaN)
        {
        // if (this.transID != null) {
            this.isProgressBarVisibile = true;
            this._dashboardService.GetCustomerOnboardingView(this.transID).subscribe(res => {
                console.log("view", res);
                this.CustomerObdView = res;
                this.SetPersonalInfoValues();
                this.isProgressBarVisibile = false;
            },
                err => {
                    console.log(err);
                    this.isProgressBarVisibile = false;
                });
        }
        
        this.isProgressBarVisibile = true;
        this._dashboardService.GetAllStates().subscribe(
            (data) => {
                this.SOption = data;
                if (this.currentTransaction != NaN) {
                    this.GetTransactionDetails();
                    this.isProgressBarVisibile = false;
                }
            },
            (err) => console.log(err)
        );
    }
    InitializeFormGroup() {
        this.PIform = this.fb.group({
            category: ["", Validators.required],
            product: ["", Validators.required],
            Name: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
            Address: ["", Validators.required],
            latitude: [''],
            longitude: [''],
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
            Status: ["", Validators.required]
        });
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
    }
    GetTransactionDetails() {
        this.isProgressBarVisibile = true;
        this._dashboardService.GetCustomerOnboardingView(this.currentTransaction).subscribe(res => {
            console.log("view", res);
            this.CustomerObdView = res;
            this.SetPersonalInfoValues();
            this.isProgressBarVisibile = false;
        },
            err => {
                console.log(err);
            });
    }
    SetPersonalInfoValues() {
        var products = null;
        if (this.CustomerObdView.PersonalInfo.PersonalInformation.product != null) {
            products = this.CustomerObdView.PersonalInfo.PersonalInformation.product.split(',');
        }
        var state = new States();
        state.StateName = this.CustomerObdView.PersonalInfo.PersonalInformation.State;
        this.SOption.push(state);
        var city = new Cities();
        city.City = this.CustomerObdView.PersonalInfo.PersonalInformation.City;
        this.City.push(city);
        this.PIform.patchValue({
            category: this.CustomerObdView.PersonalInfo.PersonalInformation.category,
            product: products,
            Address: this.CustomerObdView.PersonalInfo.PersonalInformation.Address,
            Name: this.CustomerObdView.PersonalInfo.PersonalInformation.Name,
            latitude: this.CustomerObdView.PersonalInfo.PersonalInformation.Latitude,
            longitude: this.CustomerObdView.PersonalInfo.PersonalInformation.Logitude,
            District: this.CustomerObdView.PersonalInfo.PersonalInformation.District,
            City: this.CustomerObdView.PersonalInfo.PersonalInformation.City,
            Taluka: this.CustomerObdView.PersonalInfo.PersonalInformation.Taluk,
            Tehsil: this.CustomerObdView.PersonalInfo.PersonalInformation.Tehsil,
            State: this.CustomerObdView.PersonalInfo.PersonalInformation.State,
            Pincode: this.CustomerObdView.PersonalInfo.PersonalInformation.Pincode,
            Status: this.CustomerObdView.PersonalInfo.PersonalInformation.Status,
        });
        if (localStorage.getItem('ActionStatus') == "Draft" && this.UserRole == "Customer") {
            this.SubmitValue = true;
        }
        if (localStorage.getItem('ActionStatus') == "Responded") {
            this.Responded = "Responded";
            this.SubmitValue = true;
            // this.PIform.disable();

            // this.firmForm.disable();

        }
        if(localStorage.getItem('ActionStatus') == "Pending")
        {
            this.SubmitValue = true;
            this.PIform.disable();
            this.firmForm.disable();
            
        }
        if (this.authenticationDetails.UserRole == "Customer")
        {
            this.PIform.get("category").disable();
            this.PIform.get("product").disable();
            this.PIform.get("Name").disable();
            this.PIform.get("Address").disable();
            this.PIform.get("latitude").disable();
            this.PIform.get("longitude").disable();
            this.PIform.get("District").disable();
            this.PIform.get("City").disable();
            this.PIform.get("Taluka").disable();
            this.PIform.get("Tehsil").disable();
            this.PIform.get("State").disable();
            this.PIform.get("Pincode").disable();
            
        }
        this.selected = this.CustomerObdView.PersonalInfo.PersonalInformation.Status;
        this.IdentityData = this.CustomerObdView.PersonalInfo.Identities;
    }
    FirmStatusChange() {
        this.IdentityData = [];
    }
    SubmitButtonClick(isDraft: boolean = false) {
        if (this.PIform.valid) {
            if (this.IdentityData.length > 0) {
                var cobView = new CustomerOnboardingView();
                cobView.Transaction = new CustomerOnboarding();
                //cobView.Transaction.TranID =  null;
                cobView.Transaction.Status = isDraft ? "InitiatorDraft" : "InitiatorReleased";
                cobView.PersonalInfo = new PersonalInformationView();
                cobView.PersonalInfo.PersonalInformation = this.GetPersonalInfoFromForm();
                cobView.PersonalInfo.Identities = this.IdentityData;
                if(this.transID != null){
                    cobView.Transaction.TranID=this.transID;
                }
                cobView.PositionCode = this.authenticationDetails.PositionCode;
                cobView.UserID = this.authenticationDetails.UserID.toString();
                console.log("cobView", cobView);
                this.isProgressBarVisibile = true;
                this._dashboardService.SaveCustomerPersonalDetails(cobView).subscribe(res => {
                    console.log("From save api", res);
                    this.isProgressBarVisibile = false;
                    if (res.Status == 1) {
                        this.notificationSnackBarComponent.openSnackBar(isDraft?"Draft saved successfully":"Details submitted successfully",SnackBarStatus.success);
                    }
                    else {
                        this.notificationSnackBarComponent.openSnackBar(res.Error, SnackBarStatus.danger);
                    }
                    if(!isDraft){
                        this.ClearAll();
                    }
                },
                    err => {
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(err instanceof Object ? 'Something went wrong' : err, SnackBarStatus.danger);
                    }
                );
            }
            else {
                this.notificationSnackBarComponent.openSnackBar("Please fill contact details", SnackBarStatus.warning);
            }
        }
        else {
            this._commonService.ShowValidationErrors(this.PIform);
        }
    }
    NextButtonClick(isDraft: boolean = false) {
        if (this.PIform.valid) {
            if (this.IdentityData.length > 0) {
                var cobView = new CustomerOnboardingView();
                cobView.Transaction = new CustomerOnboarding();
                cobView.Transaction.TranID =  null;
                cobView.Transaction.Status = isDraft ? "InitiatorDraft" : "InitiatorReleased";
                cobView.PersonalInfo = new PersonalInformationView();
                cobView.PersonalInfo.PersonalInformation = this.GetPersonalInfoFromForm();
                cobView.PersonalInfo.Identities = this.IdentityData;
                if(this.transID != null){
                    cobView.Transaction.TranID=this.transID;
                }
                cobView.PositionID = this.authenticationDetails.PositionID;
                cobView.UserID = this.authenticationDetails.UserID.toString();
                console.log("cobView", cobView);
                localStorage.setItem("category",this.PIform.get('category').value)
                this.isProgressBarVisibile = true;
                this._dashboardService.SaveCustomerPersonalDetails(cobView).subscribe(res => {
                    console.log("From save api", res);
                    this.isProgressBarVisibile = false;
                    if (res.Status == 1) {
                        this.notificationSnackBarComponent.openSnackBar(isDraft?"Draft saved successfully":"Details saved successfully",SnackBarStatus.success);
                        this._router.navigate(['/pages/marketinformation']); 
                    }
                    else {
                        this.notificationSnackBarComponent.openSnackBar(res.Error, SnackBarStatus.danger);
                    }
                    if(!isDraft){
                        this.ClearAll();
                    }
                },
                    err => {
                        this.isProgressBarVisibile = false;
                        this.notificationSnackBarComponent.openSnackBar(err instanceof Object ? 'Something went wrong' : err, SnackBarStatus.danger);
                    }
                );
            }
            else {
                this.notificationSnackBarComponent.openSnackBar("Please fill contact details", SnackBarStatus.warning);
            }
        }
        else if(this.PIform.disabled)
        {
            localStorage.setItem("ActionStatus", "Pending");
            this._router.navigate(['/pages/marketinformation']); 
        }
        else {
            this._commonService.ShowValidationErrors(this.PIform);
        }
      
    }
    GetPersonalInfoFromForm(): PersonalInformation {
        var pi = new PersonalInformation();
        pi.category = this.PIform.get('category').value;
        pi.Name = this.PIform.get('Name').value;
        pi.Address = this.PIform.get('Address').value;
        pi.District = this.PIform.get('District').value;
        var products = "";
        var productList = this.PIform.get('product').value;
        if (productList != null) {
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
        if(this.transID!=null)
        {
            pi.TransID = Number(localStorage.getItem('TransID'));
        }
        return pi;
    }
    OpenSuccessDialog() {
        const dialogRef = this.dialog.open(dialogComponent, {
            width: "53%",
            data: { Firmname: this.PIform.get("Name").value }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._router.navigate(['/pages/nextlogin']);
            }
        });
    }
    // RegistrationClicked(): void {
    //     const dialogRef = this.dialog.open(dialogComponent, {
    //         width: "53%",

    //         data: { Firmname: this.PIform.get("Name").value }
    //     });
    //     dialogRef.afterClosed().subscribe((result) => {
    //         console.log(`Dialog result: ${result}`);
    //         const retrievedObject = localStorage.getItem('authorizationData');
    //         console.log(retrievedObject);
    //         if (retrievedObject == "ok") {
    //             this.PIform.reset();
    //             this.listData = [];
    //         }
    //     });

    //     if (this.PIform.get("category").value == "D2RS Retail Stockist") {
    //         localStorage.setItem('retail_D2RS', "ok");
    //     }
    //     else {
    //         localStorage.setItem('retail_D2RS', "notok");

    //     }
    //     // this.passproperiatordata();
    //     const personalinformation: PersonalInformation =
    //         new PersonalInformation();
    //     personalinformation.category = this.PIform.get("category").value;
    //     personalinformation.Name = this.PIform.get("Name").value;
    //     personalinformation.Address = this.PIform.get("Address").value;
    //     personalinformation.District = this.PIform.get("District").value;
    //     var a = this.PIform.get("State").value;
    //     personalinformation.State = a.StateName;
    //     var city = this.PIform.get("City").value;
    //     personalinformation.City = city.City;
    //     personalinformation.Taluk = this.PIform.get("Taluka").value;
    //     personalinformation.Tehsil = this.PIform.get("Tehsil").value;
    //     personalinformation.Pincode = this.PIform.get("Pincode").value;
    //     personalinformation.Status = this.PIform.get("Status").value;
    //     personalinformation.identity = this.PIform.get("identity").value;
    //     personalinformation.Name1 = this.PIform.get("Name1").value;
    //     personalinformation.DOB = this.PIform.get("DOB").value;
    //     personalinformation.Mobile1 = this.PIform.get("Mobile1").value;
    //     personalinformation.Mobile2 = this.PIform.get("Mobile2").value;
    //     personalinformation.EmailId1 = this.PIform.get("email1").value;
    //     personalinformation.EmailId2 = this.PIform.get("email2").value;
    //     var a = this.PIform.get('product').value;
    //     personalinformation.Product = a.join();
    //     this._dashboardService.AddEmployee(personalinformation).subscribe(
    //         (data) => {
    //             this.notificationSnackBarComponent.openSnackBar(
    //                 "Saved Successfully",
    //                 SnackBarStatus.success
    //             );
    //             console.log(data);
    //         },
    //         (err) => {
    //             console.error(err);
    //         }
    //     );
    //     this._router.navigate(["pages/nextlogin"]);

    // }
    // updateForm(): void {
    //     const personalinformation: PersonalInformation =
    //         new PersonalInformation();
    //     this._dashboardService.UpdateEmployee(personalinformation).subscribe((data) => {
    //         this.notificationSnackBarComponent.openSnackBar(
    //             "Saved Successfully",
    //             SnackBarStatus.success
    //         );
    //         console.log(data);
    //     },
    //         (err) => {
    //             console.error(err);
    //         }
    //     );
    // }
    SelectCity(event): void {
        this.isProgressBarVisibile = true;
        this._dashboardService.GetCityByState(event.ID).subscribe(
            (data) => {
                this.City = data;
                console.log(this.City);
                this.isProgressBarVisibile = false;
            }
        );
        this._dashboardService.GetGeoLocationMasters("district",event.StateName).subscribe(res=>{
            this.Districts=res;
        });
    }
    districtSelected($event){
        this._dashboardService.GetGeoLocationMasters("taluka",$event.option.value).subscribe(res=>{
            this.Talukas=res;
        });
    }
    talukaSelected($event){
        this._dashboardService.GetGeoLocationMasters("pincode",$event.option.value).subscribe(res=>{
            this.PinCodes=res;
        });
    }
    NxtButtonClick(){
        this._router.navigate(['/pages/businessinformation']); 
    }
    // GetEmployees(): void {
    //     this._dashboardService.getEmployee().subscribe(
    //         (data) => {
    //             this.PI = data as PersonalInformation[];
    //         },
    //         (err) => {
    //             console.error(err);
    //         }
    //     );
    // }

    // opendialog(): void {
    //     const dialogRef = this.dialog.open(dialogComponent, {
    //         width: "50%",
    //         height: "40%",
    //     });
    //     dialogRef.afterClosed().subscribe((result) => {
    //         console.log(`Dialog result: ${result}`);
    //     });

    //     // if (this.PIform.valid) {
    //     const personalinformation: PersonalInformation =
    //         new PersonalInformation();
    //     personalinformation.category = this.PIform.get("category").value;
    //     personalinformation.Name = this.PIform.get("Name").value;
    //     personalinformation.Address = this.PIform.get("Address").value;
    //     personalinformation.District = this.PIform.get("District").value;
    //     personalinformation.State = this.PIform.get("State").value;
    //     personalinformation.Pincode = this.PIform.get("Pincode").value;
    //     personalinformation.Status = this.PIform.get("Status").value;
    //     personalinformation.identity = this.PIform.get("identity").value;
    //     personalinformation.Name1 = this.PIform.get("Name1").value;
    //     personalinformation.DOB = this.PIform.get("DOB").value;
    //     personalinformation.Mobile1 = this.PIform.get("Mobile1").value;
    //     personalinformation.Mobile2 = this.PIform.get("Mobile2").value;
    //     personalinformation.EmailId1 = this.PIform.get("email1").value;
    //     personalinformation.EmailId2 = this.PIform.get("email2").value;
    //     // this._dashboardService.AddEmployee(personalinformation).subscribe(
    //     //     (data) => {
    //     //         console.log(data);
    //     //     },
    //     //     (err) => {
    //     //         console.error(err);
    //     //     }
    //     // );
    //     // } else {
    //     // }
    // }

    private _filterstate(value: string): string[] {
        const filterValue1 = value.toLowerCase();
        for (var i = 0; i <= this.SOption.length; i++) {
            this.States.push(this.SOption[i].StateName);
            return this.States.filter((myoption) =>
                myoption.toLowerCase().includes(filterValue1)
            );
        }

    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    previousbtn(): void {
        this._router.navigate(["pages/nextlogin"]);
    }

    nextbtn(): void {
        this._router.navigate(['pages/marketinformation'])
    }
    ClearAll(): void {
        this.PIform.reset();
        this.IdentityData = [];
        this.firmForm.reset();
    }
    public statuscount: any;
    IdentityData: PersonIdentity[] = [];
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
    decimalOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode === 8 || charCode === 9 || charCode === 13 || charCode === 46
            || charCode === 37 || charCode === 39 || charCode === 123 || charCode === 190) {
            return true;
        }
        else if (charCode < 48 || charCode > 57) {
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
    ngOnDestroy(): void {
        //localStorage.removeItem('ActionStatus');
       // localStorage.removeItem('TransID');
    }
}