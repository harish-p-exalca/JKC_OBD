import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { _MatChipListMixinBase } from '@angular/material';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { MenuApp, RoleWithApp, UserWithRole, UserNotification, Reason, AccountGroupMaster, DistributionChannelMaster, DivisionMaster, SalesOrgMaster, RegionMaster } from 'app/models/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  baseAddress: string;
  NotificationEvent: Subject<any>;

  GetNotification(): Observable<any> {
    return this.NotificationEvent.asObservable();
  }

  TriggerNotification(eventName: string): void {
    this.NotificationEvent.next(eventName);
  }

  constructor(private _httpClient: HttpClient, private _authService: AuthService) {
    this.baseAddress = _authService.baseAddress;
    this.NotificationEvent = new Subject();
  }

  // Error Handler
  errorHandler(error: HttpErrorResponse): Observable<string> {
    return throwError(error.error || error.message || 'Server Error');
  }

  // App
  CreateMenuApp(menuApp: MenuApp): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/CreateApp`,
      menuApp,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  GetAllMenuApp(): Observable<MenuApp[] | string> {
    return this._httpClient.get<MenuApp[]>(`${this.baseAddress}api/Master/GetAllApps`)
      .pipe(catchError(this.errorHandler));
  }

  UpdateMenuApp(menuApp: MenuApp): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/UpdateApp`,
      menuApp,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  DeleteMenuApp(menuApp: MenuApp): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/DeleteApp`,
      menuApp,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  // Reason
  CreateReason(reason: Reason): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/CreateReason`,
      reason,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  GetAllReasons(): Observable<Reason[] | string> {
    return this._httpClient.get<Reason[]>(`${this.baseAddress}api/Master/GetAllReasons`)
      .pipe(catchError(this.errorHandler));
  }

  UpdateReason(reason: Reason): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/UpdateReason`,
      reason,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  DeleteReason(reason: Reason): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/DeleteReason`,
      reason,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  // Role
  CreateRole(role: RoleWithApp): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/CreateRole`,
      role,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  GetAllRoles(): Observable<RoleWithApp[] | string> {
    return this._httpClient.get<RoleWithApp[]>(`${this.baseAddress}api/Master/GetAllRoles`)
      .pipe(catchError(this.errorHandler));
  }

  UpdateRole(role: RoleWithApp): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/UpdateRole`,
      role,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  DeleteRole(role: RoleWithApp): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/DeleteRole`,
      role,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  // Users

  CreateUser1(user: UserWithRole, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);
    formData.append('userName', user.UserName);

    return this._httpClient.post<any>(`${this.baseAddress}api/Master/CreateUser1`,
      formData,
      // {
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json'
      //   })
      // }
    )
      .pipe(catchError(this.errorHandler));
  }

  // CreateUser(user: UserWithRole): Observable<any> {

  //   const formData: FormData = new FormData();
  //   // if (selectedFile) {
  //   //   formData.append('selectedFile', selectedFile, selectedFile.name);
  //   // }
  //   // formData.append('UserID', user.UserID.toString());
  //   formData.append('UserName', user.UserName);
  //   formData.append('Plant', user.Plant);
  //   formData.append('Email', user.Email);
  //   formData.append('ContactNumber', user.ContactNumber);
  //   formData.append('Password', user.Password);
  //   formData.append('RoleID', user.RoleID.toString());
  //   formData.append('CreatedBy', user.CreatedBy);

  //   return this._httpClient.post<any>(`${this.baseAddress}api/Master/CreateUser`,
  //     formData,
  //     // {
  //     //   headers: new HttpHeaders({
  //     //     'Content-Type': 'application/json'
  //     //   })
  //     // }
  //   ).pipe(catchError(this.errorHandler));

  // }

  CreateUser(user: UserWithRole): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/CreateUser`,
      user,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(catchError(this.errorHandler));

  }

  GetAllUsers(): Observable<UserWithRole[] | string> {
    return this._httpClient.get<UserWithRole[]>(`${this.baseAddress}api/Master/GetAllUsers`)
      .pipe(catchError(this.errorHandler));
  }

  // UpdateUser(user: UserWithRole): Observable<any> {
  //   const formData: FormData = new FormData();
  //   // if (selectedFile) {
  //   //   formData.append('selectedFile', selectedFile, selectedFile.name);
  //   // }
  //   formData.append('UserID', user.UserID.toString());
  //   formData.append('UserName', user.UserName);
  //   formData.append('Plant', user.Plant);
  //   formData.append('Email', user.Email);
  //   formData.append('ContactNumber', user.ContactNumber);
  //   formData.append('Password', user.Password);
  //   formData.append('RoleID', user.RoleID.toString());
  //   formData.append('CreatedBy', user.CreatedBy);
  //   formData.append('ModifiedBy', user.ModifiedBy);
  //   return this._httpClient.post<any>(`${this.baseAddress}api/Master/UpdateUser`,
  //     formData,
  //     // {
  //     //   headers: new HttpHeaders({
  //     //     'Content-Type': 'application/json'
  //     //   })
  //     // }
  //   ).pipe(catchError(this.errorHandler));

  // }

  UpdateUser(user: UserWithRole): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/UpdateUser`,
      user,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(catchError(this.errorHandler));

  }

  DeleteUser(user: UserWithRole): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/DeleteUser`,
      user,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  GetAllNotificationByUserID(UserID: string): Observable<UserNotification[] | string> {
    return this._httpClient.get<UserNotification[]>(`${this.baseAddress}api/Notification/GetAllNotificationByUserID?UserID=${UserID}`)
      .pipe(catchError(this.errorHandler));
  }

  UpdateNotification(SelectedNotification: UserNotification): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Notification/UpdateNotification`,
      SelectedNotification, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.errorHandler));
  }



  // AccountGroupMaster
  CreateAccountGroupMaster(accountGroup: AccountGroupMaster): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/CreateAccountGroupMaster`,
      accountGroup,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  GetAllAccountGroupMasters(): Observable<AccountGroupMaster[] | string> {
    return this._httpClient.get<AccountGroupMaster[]>(`${this.baseAddress}api/Master/GetAllAccountGroupMasters`)
      .pipe(catchError(this.errorHandler));
  }

  UpdateAccountGroupMaster(accountGroup: AccountGroupMaster): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/UpdateAccountGroupMaster`,
      accountGroup,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  DeleteAccountGroupMaster(accountGroup: AccountGroupMaster): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/DeleteAccountGroupMaster`,
      accountGroup,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  // DistributionChannelMaster
  CreateDistributionChannelMaster(DistributionChannel: DistributionChannelMaster): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/CreateDistributionChannelMaster`,
      DistributionChannel,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  GetAllDistributionChannelMasters(): Observable<DistributionChannelMaster[] | string> {
    return this._httpClient.get<DistributionChannelMaster[]>(`${this.baseAddress}api/Master/GetAllDistributionChannelMasters`)
      .pipe(catchError(this.errorHandler));
  }

  UpdateDistributionChannelMaster(DistributionChannel: DistributionChannelMaster): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/UpdateDistributionChannelMaster`,
      DistributionChannel,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  DeleteDistributionChannelMaster(DistributionChannel: DistributionChannelMaster): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/DeleteDistributionChannelMaster`,
      DistributionChannel,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  // DivisionMaster
  CreateDivisionMaster(Division: DivisionMaster): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/CreateDivisionMaster`,
      Division,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  GetAllDivisionMasters(): Observable<DivisionMaster[] | string> {
    return this._httpClient.get<DivisionMaster[]>(`${this.baseAddress}api/Master/GetAllDivisionMasters`)
      .pipe(catchError(this.errorHandler));
  }

  UpdateDivisionMaster(Division: DivisionMaster): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/UpdateDivisionMaster`,
      Division,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  DeleteDivisionMaster(Division: DivisionMaster): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/DeleteDivisionMaster`,
      Division,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  // SalesOrgMaster
  CreateSalesOrgMaster(SalesOrg: SalesOrgMaster): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/CreateSalesOrgMaster`,
      SalesOrg,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  GetAllSalesOrgMasters(): Observable<SalesOrgMaster[] | string> {
    return this._httpClient.get<SalesOrgMaster[]>(`${this.baseAddress}api/Master/GetAllSalesOrgMasters`)
      .pipe(catchError(this.errorHandler));
  }

  UpdateSalesOrgMaster(SalesOrg: SalesOrgMaster): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/UpdateSalesOrgMaster`,
      SalesOrg,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  DeleteSalesOrgMaster(SalesOrg: SalesOrgMaster): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/DeleteSalesOrgMaster`,
      SalesOrg,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  // RegionMaster
  CreateRegionMaster(Region: RegionMaster): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/CreateRegionMaster`,
      Region,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  GetAllRegionMasters(): Observable<RegionMaster[] | string> {
    return this._httpClient.get<RegionMaster[]>(`${this.baseAddress}api/Master/GetAllRegionMasters`)
      .pipe(catchError(this.errorHandler));
  }

  UpdateRegionMaster(Region: RegionMaster): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/UpdateRegionMaster`,
      Region,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

  DeleteRegionMaster(Region: RegionMaster): Observable<any> {
    return this._httpClient.post<any>(`${this.baseAddress}api/Master/DeleteRegionMaster`,
      Region,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.errorHandler));
  }

}
