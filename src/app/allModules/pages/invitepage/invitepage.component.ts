import { DashboardService } from 'app/services/dashboard.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
// import { LoginService } from 'app/services/login.service';
// import { UserDetails } from 'app/models/user-details';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { NotificationSnackBarComponent } from 'app/notifications/notification-snack-bar/notification-snack-bar.component';
import { SnackBarStatus } from 'app/notifications/notification-snack-bar/notification-snackbar-status-enum';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseNavigation } from '@fuse/types';
import { MenuUpdataionService } from 'app/services/menu-update.service';
import { AuthenticationDetails, ChangePassword, EMailModel, PersonIdentity } from 'app/models/master';
import { ChangePasswordDialogComponent } from 'app/allModules/authentication/change-password-dialog/change-password-dialog.component';
import { ForgetPasswordLinkDialogComponent } from 'app/allModules/authentication/forget-password-link-dialog/forget-password-link-dialog.component';
import { Console } from 'console';
import { stat } from 'fs';

@Component({
  selector: 'app-invitepage',
  templateUrl: './invitepage.component.html',
  styleUrls: ['./invitepage.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class InvitepageComponent implements OnInit {
  InviteForm !: FormGroup
  navigation: FuseNavigation[] = [];
  authenticationDetails: AuthenticationDetails;
  MenuItems: string[];
  children: FuseNavigation[] = [];
  subChildren: FuseNavigation[] = [];
  OTP: any[] = [];
  private _unsubscribeAll: Subject<any>;
  message = 'Snack Bar opened.';
  actionButtonLabel = 'Retry';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  arr: any;
  addExtraClass: false;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  IsProgressBarVisibile: boolean;
  TransID: number;
  Identity: PersonIdentity;
  @ViewChild('otp1') otpEl1: ElementRef;
  @ViewChild('otp2') otpEl2: ElementRef;
  @ViewChild('otp3') otpEl3: ElementRef;
  @ViewChild('otp4') otpEl4: ElementRef;
  @ViewChild('otp5') otpEl5: ElementRef;
  @ViewChild('otp6') otpEl6: ElementRef;
  constructor(
    private _fuseNavigationService: FuseNavigationService,
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _dashboardService: DashboardService,
    private _authService: AuthService,
    private _menuUpdationService: MenuUpdataionService,
    private route: ActivatedRoute,
    // private _loginService: LoginService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };

    this.notificationSnackBarComponent = new NotificationSnackBarComponent(this.snackBar);
    this.IsProgressBarVisibile = false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.TransID = params['id'];
      if (this.TransID) {
        this.GetIdentity(this.TransID);
      }
    });

    this.InviteForm = this._formBuilder.group({
      userName: [''],
      OTP1: [''],
      OTP2: [''],
      OTP3: [''],
      OTP4: [''],
      OTP5: [''],
      OTP6: ['']
    });
  }
  ShiftFocus(el: string) {
    if (el == "otp2") {
      this.otpEl2.nativeElement.focus();
    }
    else if (el == "otp3") {
      this.otpEl3.nativeElement.focus();
    }
    else if (el == "otp4") {
      this.otpEl4.nativeElement.focus();
    }
    else if (el == "otp5") {
      this.otpEl5.nativeElement.focus();
    }
    else if (el == "otp6") {
      this.otpEl6.nativeElement.focus();
    }
  }
  
  GetIdentity(transID: number) {
    this._dashboardService.GetIdentityByTransID(transID).subscribe(res => {
      console.log("identity", res);
      this.Identity = res;
      this.InviteForm.get('userName').setValue(res.Name);
      this.InviteForm.get('userName').disable();
    },
      err => {
        this.notificationSnackBarComponent.openSnackBar(err instanceof Object ? 'Something went wrong' : err, SnackBarStatus.danger);
    });
  }
  LoginClicked(): void {
    if (this.InviteForm.valid) {
      this.IsProgressBarVisibile = true;
      this.OTP[0] = (this.InviteForm.get('OTP1').value);
      this.OTP[1] = (this.InviteForm.get('OTP2').value);
      this.OTP[2] = (this.InviteForm.get('OTP3').value);
      this.OTP[3] = (this.InviteForm.get('OTP4').value);
      this.OTP[4] = (this.InviteForm.get('OTP5').value);
      this.OTP[5] = (this.InviteForm.get('OTP6').value);
      var OTPNo = this.OTP.join();
      var status = OTPNo.replace(/,/g, '').toString();
      console.log("otp",parseInt(status));
      this._dashboardService.AuthenticateCustomerWithOTP(parseInt(status), this.TransID).subscribe(
        (res) => {
          this.IsProgressBarVisibile = false;
          console.log(res);
          const dat = res as AuthenticationDetails;
          this.saveUserDetails(dat);
        },
        (err) => {
          this.IsProgressBarVisibile = false;
          console.error(err);
          this.notificationSnackBarComponent.openSnackBar(err instanceof Object ? 'Something went wrong' : err, SnackBarStatus.danger);
        }
      );
    } else {
      Object.keys(this.InviteForm.controls).forEach(key => {
        const abstractControl = this.InviteForm.get(key);
        abstractControl.markAsDirty();
      });
    }
  }
  saveUserDetails(data: any): void {
    console.log(data);
    localStorage.setItem('authorizationData', JSON.stringify(data));
    this.UpdateMenu();
    this.notificationSnackBarComponent.openSnackBar('Logged in successfully', SnackBarStatus.success);
    this._router.navigate(['pages/dashboard']);
  }
  CreateOTP(): void {
    console.log("otp requested");
    this._dashboardService.GenerateOTPForCustomer(this.TransID).subscribe(
      (res) => {
        this.IsProgressBarVisibile = false;
        console.log(res);
        if (res.Status == 1) {
          this.notificationSnackBarComponent.openSnackBar('OTP Generated Successfully', SnackBarStatus.success);
        }
        else {
          this.notificationSnackBarComponent.openSnackBar(res.Error, SnackBarStatus.success);
        }
      },
      (err) => {
        this.IsProgressBarVisibile = false;
        // this.notificationSnackBarComponent.openSnackBar('OTP Generated Successfully', SnackBarStatus.success);
        console.error(err);
        this.notificationSnackBarComponent.openSnackBar(err instanceof Object ? 'Something went wrong' : err, SnackBarStatus.danger);
      }
    );
  }
  UpdateMenu(): void {
    const retrievedObject = localStorage.getItem('authorizationData');
    if (retrievedObject) {
      this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
      this.MenuItems = this.authenticationDetails.MenuItemNames.split(',');
      console.log(this.MenuItems);
    } else {
    }
    if (this.MenuItems.indexOf('Personal') >= 0) {
      this.children.push(
        {
          id: 'dashboard',
          title: 'Personal',
          translate: 'NAV.SAMPLE.TITLE',
          type: 'item',
          icon: 'person',
          isSvgIcon: false,
          url: '/pages/dashboard',
        }
      );
    }
    if (this.MenuItems.indexOf('Business') >= 0) {
      this.children.push(
        {
          id: 'business',
          title: 'Business',
          translate: 'NAV.SAMPLE.TITLE',
          type: 'item',
          icon: 'business',
          isSvgIcon: false,
          url: '/pages/businessinformation',
        }
      );
    }
    if (this.MenuItems.indexOf('Market') >= 0) {
      this.children.push(
        {
          id: 'market',
          title: 'Market',
          translate: 'NAV.SAMPLE.TITLE',
          type: 'item',
          icon: 'gps_fixed',
          isSvgIcon: false,
          url: '/pages/marketinformation',
        }
      );
    }
    if (this.MenuItems.indexOf('Bank') >= 0) {
      this.children.push(
        {
          id: 'bank',
          title: 'Bank',
          translate: 'NAV.SAMPLE.TITLE',
          type: 'item',
          icon: 'payment',
          isSvgIcon: false,
          url: '/pages/bankinformation',
        }
      );
    }
    this.navigation.push({
      id: 'applications',
      title: '',
      translate: 'NAV.APPLICATIONS',
      type: 'group',
      children: this.children
    });
    // Saving local Storage
    localStorage.setItem('menuItemsData', JSON.stringify(this.navigation));
    // Update the service in order to update menu
    this._menuUpdationService.PushNewMenus(this.navigation);
  }

}
