import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  MatIconRegistry,
  MatSnackBar,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatTabChangeEvent
} from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationSnackBarComponent } from 'app/notifications/notification-snack-bar/notification-snack-bar.component';
import { SnackBarStatus } from 'app/notifications/notification-snack-bar/notification-snackbar-status-enum';
import { AuthenticationDetails } from 'app/models/master';
import { fuseAnimations } from '@fuse/animations';
import { DashboardService } from 'app/services/dashboard.service';
import { ShareParameterService } from 'app/services/share-parameters.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Guid } from 'guid-typescript';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PersonalInformationComponent implements OnInit {
  categorylist: string[] = ['Stockist', 'Retail Stockist', 'D2RS Retail Stockist'];
  productlist: string[] = ['WP', 'WC', 'POP', 'TM', 'Woodamore'];
  identitylist: string[] = ['Proprietor', 'Partner Name 1', 'Partner Name 2', 'Director 1', 'Director 2']
  authenticationDetails: AuthenticationDetails;
  currentUserID: Guid;
  currentUserRole: string;
  MenuItems: string[];
  isProgressBarVisibile: boolean;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  displayedColumns: string[] = [
    'INV_NO',
    'INV_DATE',
    'INV_TYPE',
    'PLANT',
    'VEHICLE_NO',
    'VEHICLE_CAPACITY',
    'FWD_AGENT',
    'CARRIER',
    'EWAYBILL_NO',
    'EWAYBILL_DATE',
    'PROPOSED_DELIVERY_DATE',
    'ACTUAL_DELIVERY_DATE'
  ];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  SOption: string[] = ["Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"];

  filteropt: Observable<string[]>;

  constructor(
    private _router: Router,
    private _dashboardService: DashboardService,
    private _shareParameterService: ShareParameterService,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.isProgressBarVisibile = false;
    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
  }

  PIform!: FormGroup;
  PI: PersonalInformation[] = [];
  selectedPI: PersonalInformation = new PersonalInformation();
  ngOnInit(): void {
    this.PIform = this.fb.group({
      category: ['', Validators.required],
      product: ['', Validators.required],
      Name: ['', Validators.required],
      Address: ['', Validators.required],
      District: ['', Validators.required],
      State: ['', Validators.required],
      Pincode: ['', [Validators.required, Validators.pattern(/^(\d{6}|\d{7}|\d{8}|\d{9}|\d{10})$/)]],
      Status: ['', [Validators.required]],
      identity: ['', Validators.required],
      Name1: ['', Validators.required],
      DOB: ['', Validators.required],
      Mobile1: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      Mobile2: ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
      email1: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      email2: ['', [Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    })
    // this.selectedPI = this._dashboardService.getCurrent();
    this.UpdateEmployee(this.selectedPI);

    this.filteropt = this.PIform.get('State').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterstate(value))
      );

    // Retrive authorizationData
    const retrievedObject = localStorage.getItem('authorizationData');
    if (retrievedObject) {
      this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
      this.currentUserID = this.authenticationDetails.userID;
      this.currentUserRole = this.authenticationDetails.userRole;
      this.MenuItems = this.authenticationDetails.menuItemNames.split(',');
      if (this.MenuItems.indexOf('Dashboard') < 0) {
        this.notificationSnackBarComponent.openSnackBar('You do not have permission to visit this page', SnackBarStatus.danger
        );
        this._router.navigate(['/auth/login']);
      }
    } else {
      this._router.navigate(['/auth/login']);
    }
  }
  RegistrationClicked(): void {
    this._router.navigate(['pages/businessinformation'])
    // if (this.PIform.valid) {
    //   const personalinformation: PersonalInformation = new PersonalInformation();
    //   personalinformation.category = this.PIform.get('category').value;
    //   personalinformation.product = this.PIform.get('product').value;
    //   personalinformation.Name = this.PIform.get('Name').value;
    //   personalinformation.Address = this.PIform.get('Address').value;
    //   personalinformation.District = this.PIform.get('District').value;
    //   personalinformation.State = this.PIform.get('State').value;
    //   personalinformation.Pincode = this.PIform.get('Pincode').value;
    //   personalinformation.Status = this.PIform.get('Status').value;
    //   personalinformation.identity = this.PIform.get('identity').value;
    //   personalinformation.Name1 = this.PIform.get('Name1').value;
    //   personalinformation.DOB = this.PIform.get('DOB').value;
    //   personalinformation.Mobile1 = this.PIform.get('Mobile1').value;
    //   personalinformation.Mobile2 = this.PIform.get('Mobile2').value;
    //   personalinformation.email1 = this.PIform.get('email1').value;
    //   personalinformation.email2 = this.PIform.get('email2').value;
    //   if (this.selectedPI.ID) {
    //     personalinformation.ID = this.selectedPI.ID;
    //     this._dashboardService.UpdateEmployee(personalinformation).subscribe(
    //       (data) => {
    //         console.log(data);
    //       },
    //       (err) => {

    //         console.error(err);
    //       },
    //     );
    //   }
    //   this._router.navigate['/pages/businessinformation']
    // } else { }
  }
  UpdateEmployee(personalHistory: PersonalInformation): void {
    this.selectedPI = personalHistory;
    this.PIform.get('category').patchValue(personalHistory.category);
    this.PIform.get('product').patchValue(personalHistory.product);
    this.PIform.get('Name').patchValue(personalHistory.Name);
    this.PIform.get('Address').patchValue(personalHistory.Address);
    this.PIform.get('State').patchValue(personalHistory.State);
    this.PIform.get('Pincode').patchValue(personalHistory.Pincode);
    this.PIform.get('Status').patchValue(personalHistory.Status);
    this.PIform.get('identity').patchValue(personalHistory.identity);
    this.PIform.get('Name1').patchValue(personalHistory.Name1);
    this.PIform.get('Mobile1').patchValue(personalHistory.Mobile1);
    this.PIform.get('Mobile2').patchValue(personalHistory.Mobile2);
    this.PIform.get('email1').patchValue(personalHistory.email1);
    this.PIform.get('email2').patchValue(personalHistory.email2);
  }

  private _filterstate(value: string): string[] {
    const filterValue1 = value.toLowerCase();

    return this.SOption.filter(myoption => myoption.toLowerCase().includes(filterValue1));
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  previousbtn(): void {
    this._router.navigate(['pages/invite']);
  }
  nextbtn() :void{
    this._router.navigate(['pages/businessinformation'])
  }
  ClearAll(): void {
    this.PIform.reset();
  }
}
export class PersonalInformation {
  ID !: string;
  category !: string;
  product!: string;
  Name!: string;
  Address!: string;
  District!: string;
  State!: string;
  Pincode!: number;
  Status!: string;
  identity!: string;
  Name1!: string;
  DOB!: Date;
  Mobile1!: number;
  Mobile2!: number;
  email1!: string;
  email2!: string;
}
