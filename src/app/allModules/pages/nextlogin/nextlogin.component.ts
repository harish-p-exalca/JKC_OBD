import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
// import { LoginService } from 'app/services/login.service';
// import { UserDetails } from 'app/models/user-details';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { NotificationSnackBarComponent } from 'app/notifications/notification-snack-bar/notification-snack-bar.component';
import { SnackBarStatus } from 'app/notifications/notification-snack-bar/notification-snackbar-status-enum';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseNavigation } from '@fuse/types';
import { MenuUpdataionService } from 'app/services/menu-update.service';
import { AuthenticationDetails, ChangePassword, EMailModel } from 'app/models/master';
import { ChangePasswordDialogComponent } from 'app/allModules/authentication/change-password-dialog/change-password-dialog.component';
import { ForgetPasswordLinkDialogComponent } from 'app/allModules/authentication/forget-password-link-dialog/forget-password-link-dialog.component';

@Component({
  selector: 'app-nextlogin',
  templateUrl: './nextlogin.component.html',
  styleUrls: ['./nextlogin.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class NextloginComponent implements OnInit {
  signinForm: FormGroup;
  navigation: FuseNavigation[] = [];
  authenticationDetails: AuthenticationDetails;
  MenuItems: string[];
  children: FuseNavigation[] = [];
  subChildren: FuseNavigation[] = [];
  private _unsubscribeAll: Subject<any>;
  message = 'Snack Bar opened.';
  actionButtonLabel = 'Retry';
  action = true;
  setAutoHide = true;
  autoHide = 2000;

  addExtraClass: false;
  notificationSnackBarComponent: NotificationSnackBarComponent;
  IsProgressBarVisibile: boolean;

  constructor(
    private _fuseNavigationService: FuseNavigationService,
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _menuUpdationService: MenuUpdataionService,
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
    this. signinForm = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  LoginClicked(): void {
    if (this. signinForm.valid) {
      this.IsProgressBarVisibile = true;
      this._authService.login(this. signinForm.get('userName').value, this. signinForm.get('password').value).subscribe(
        (data) => {
          this.IsProgressBarVisibile = false;
          const dat = data as AuthenticationDetails;
          if (data.isChangePasswordRequired === 'Yes') {
            this.OpenChangePasswordDialog(dat);
          } else {
            this.saveUserDetails(dat);
          }
        },
        (err) => {
          this.IsProgressBarVisibile = false;
          console.error(err);
          // // console.log(err instanceof Object);
          this.notificationSnackBarComponent.openSnackBar(err instanceof Object ? 'Something went wrong' : err, SnackBarStatus.danger);
        }
      );
      // this._router.navigate(['dashboard']);
      // this.notificationSnackBarComponent.openSnackBar('Logged in successfully', SnackBarStatus.success);
    } else {
      Object.keys(this. signinForm.controls).forEach(key => {
        const abstractControl = this. signinForm.get(key);
        abstractControl.markAsDirty();
      });
    }

  }
  saveUserDetails(data: any): void {
    // console.log(data);
    localStorage.setItem('authorizationData', JSON.stringify(data));
    this.UpdateMenu();
    this.notificationSnackBarComponent.openSnackBar('Logged in successfully', SnackBarStatus.success);
    if (data.UserRole === 'Admin') {
      this._router.navigate(['master/user']);
    } 
    else if(data.UserRole=='SSA') {
      this._router.navigate(['pages/initiatordashboard']);
    }
    else{
      this._router.navigate(['pages/approvalinformation']);
    }
  }
  OpenChangePasswordDialog(data: AuthenticationDetails): void {
    const dialogConfig: MatDialogConfig = {
      data: null,
      panelClass: 'change-password-dialog'
    };
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          const changePassword = result as ChangePassword;
          changePassword.UserID = data.UserID;
          changePassword.UserName = data.UserName;
          this._authService.ChangePassword(changePassword).subscribe(
            (res) => {
              // // console.log(res);
              // this.notificationSnackBarComponent.openSnackBar('Password updated successfully', SnackBarStatus.success);
              this.notificationSnackBarComponent.openSnackBar('Password updated successfully, please log with new password', SnackBarStatus.success);
              this._router.navigate(['/auth/login']);
            }, (err) => {
              this.notificationSnackBarComponent.openSnackBar(err instanceof Object ? 'Something went wrong' : err, SnackBarStatus.danger);
              this._router.navigate(['/auth/login']);
              console.error(err);
            }
          );
        }
      });
  }
  OpenForgetPasswordLinkDialog(): void {
    const dialogConfig: MatDialogConfig = {
      data: null,
      panelClass: 'forget-password-link-dialog'
    };
    const dialogRef = this.dialog.open(ForgetPasswordLinkDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          const emailModel = result as EMailModel;
          this.IsProgressBarVisibile = true;
          this._authService.SendResetLinkToMail(emailModel).subscribe(
            (data) => {
              // console.log(data);
              this.notificationSnackBarComponent.openSnackBar(data.Comment, SnackBarStatus.success);
              // this.notificationSnackBarComponent.openSnackBar(`Reset password link sent successfully to ${emailModel.EmailAddress}`, SnackBarStatus.success);
              // this.ResetControl();
              this.IsProgressBarVisibile = false;
              // this._router.navigate(['auth/login']);
            },
            (err) => {
              console.error(err);
              this.IsProgressBarVisibile = false;
              this.notificationSnackBarComponent.openSnackBar(err instanceof Object ? 'Something went wrong' : err, SnackBarStatus.danger); console.error(err);
            }
          );
        }
      });
  }
  UpdateMenu(): void {
    const retrievedObject = localStorage.getItem('authorizationData');
    if (retrievedObject) {
      this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
      this.MenuItems = this.authenticationDetails.MenuItemNames.split(',');
      // console.log(this.MenuItems);
    } else {
    }
    if (this.MenuItems.indexOf('InitiatorDashboard') >= 0) {
      this.children.push(
        {
          id: 'initiatorDashboard',
          title: 'Dashboard',
          translate: 'NAV.SAMPLE.TITLE',
          type: 'item',
          icon: 'dashboard',
          isSvgIcon: false,
          url: '/pages/initiatordashboard',
        }
      );
    }
    if (this.MenuItems.indexOf('ApproverDashboard') >= 0) {
      this.children.push(
        {
          id: 'approverDashboard',
          title: 'Dashboard',
          translate: 'NAV.SAMPLE.TITLE',
          type: 'item',
          icon: 'dashboard',
          isSvgIcon: false,
          url: '/pages/approvalinformation',
        }
      );
    }
    if (this.MenuItems.indexOf('Personal') >= 0) {
      this.children.push(
        {
          id: 'personal',
          title: 'Initiate',
          translate: 'NAV.SAMPLE.TITLE',
          type: 'item',
          icon: 'person',
          isSvgIcon: false,
          url: '/pages/dashboard',
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
    if (this.MenuItems.indexOf('App') >= 0) {
      this.subChildren.push(
        {
          id: 'menuapp',
          title: 'App',
          type: 'item',
          url: '/master/menuApp'
        },
      );
    }
    if (this.MenuItems.indexOf('Role') >= 0) {
      this.subChildren.push(
        {
          id: 'role',
          title: 'Role',
          type: 'item',
          url: '/master/role'
        },
      );
    }
    if (this.MenuItems.indexOf('User') >= 0) {
      this.subChildren.push(
        {
          id: 'user',
          title: 'User',
          type: 'item',
          url: '/master/user'
        }
      );
    }

    if (this.MenuItems.indexOf('App') >= 0 || this.MenuItems.indexOf('Role') >= 0 ||
      this.MenuItems.indexOf('User') >= 0) {
      this.children.push({
        id: 'master',
        title: 'Master',
        // translate: 'NAV.DASHBOARDS',
        type: 'collapsable',
        icon: 'menuwithdotsIcon',
        isSvgIcon: true,
        // icon: 'view_list',
        children: this.subChildren
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
