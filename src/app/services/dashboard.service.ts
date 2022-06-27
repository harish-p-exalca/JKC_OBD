import { Guid } from 'guid-typescript';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { _MatChipListMixinBase } from '@angular/material';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { CustomerOnboardingView, PersonalInfo, SendMail } from 'app/models/master';
import { MarketInformation } from 'app/allModules/pages/marketinformation/marketinformation.component';
import { BusinessInformation } from 'app/allModules/pages/business/business.component';
import { BankDetailInformation, BankInformation, JKCInformation } from 'app/allModules/pages/bankinformation/bankinformation.component';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    baseAddress: string;
    NotificationEvent: Subject<any>;
    sample = new Subject();
    personalInfo: PersonalInfo = null;
    // setCurrent(personalHistory: PersonalInformation) {
    //     this.selecteddetails = personalHistory;
    // }
    // getCurrent() {
    //     return this.selecteddetails;
    // }

    GetNotification(): Observable<any> {
        return this.NotificationEvent.asObservable();
    }

    TriggerNotification(eventName: string): void {
        this.NotificationEvent.next(eventName);
    }

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this.baseAddress = _authService.baseAddress;
        this.NotificationEvent = new Subject();
    }
    // Error Handler
    errorHandler(error: HttpErrorResponse): Observable<string> {
        return throwError(error.error || error.message || 'Server Error');
    }

    // getEmployee(): Observable<PersonalInformation[] | string> {
    //     return this._httpClient.get<PersonalInformation[]>('http://10.43.13.9:80/api/PersonalInfo/GetEmployees')
    //         .pipe(catchError(this.errorHandler));
    // }
    // getPersonalInfo(): Observable<PersonalInformation[] | string> {
    //     return this._httpClient.get<PersonalInformation[]>('http://10.43.13.9:80/api/PersonalInfo/GetAllPersoalDetails')
    //         .pipe(catchError(this.errorHandler));
    // }
    // AddEmployee(personalHistory: PersonalInformation): Observable<PersonalInformation | string> {
    //     return this._httpClient.post<PersonalInformation>('http://10.43.13.9:80/api/PersonalInfo/CreatePersonalInfo', personalHistory, {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json'
    //         })
    //     })
    //         .pipe(catchError(this.errorHandler));
    // }
    // UpdateEmployee(personalHistory: PersonalInformation): Observable<PersonalInformation | string> {
    //     return this._httpClient.post<PersonalInformation>('http://10.43.13.9:80/api/PersonalInfo/UpdateEmployee', personalHistory, {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json'
    //         })
    //     })
    //         .pipe(catchError(this.errorHandler));
    // }

    SendMailResponse(SendMail: SendMail): Observable<any> {
        return this._httpClient.post<any>('http://10.43.13.9:80/api/Master/SendMailResponse', SendMail, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.errorHandler));
    }
    AddMArketInfo(marketInfo: MarketInformation): Observable<MarketInformation | string> {
        return this._httpClient.post<MarketInformation>('http://10.43.13.9:80/api/MarketInfo/CreateMarketInfo', marketInfo, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.errorHandler));
    }
    AddBusinessInfo(businessInfo: BusinessInformation): Observable<BusinessInformation | string> {
        return this._httpClient.post<BusinessInformation>('http://10.43.13.9:80/api/BusinessInfo/CreateBusinessInfo', businessInfo, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.errorHandler));
    }
    AddBankInfo(bankInfo: BankInformation): Observable<BankInformation | string> {
        return this._httpClient.post<BankInformation>('http://10.43.13.9:80/api/BankDetails/CreateBankDetailInfo', bankInfo, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.errorHandler));
    }
    AddBankDetInfo(bankInfo: BankDetailInformation): Observable<BankDetailInformation | string> {
        return this._httpClient.post<BankDetailInformation>('http://10.43.13.9:80/api/BankDetails/CreateBankInfo', bankInfo, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.errorHandler));
    }
    AddconnectionInfo(bankInfo: JKCInformation): Observable<JKCInformation | string> {
        return this._httpClient.post<JKCInformation>('http://10.43.13.9:80/api/BankDetails/CreateConnectionInfo', bankInfo, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.errorHandler));
    }
    // AddFirmInfo(firmInfo: FirmInformation): Observable<FirmInformation | string> {
    //     return this._httpClient.post<FirmInformation>('http://10.43.13.9:80/api/PersonalInfo/CreateFirmInfo', firmInfo, {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json'
    //         })
    //     })
    //         .pipe(catchError(this.errorHandler));
    // }
    GetAllStates(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/GetStates`)
            .pipe(catchError(this.errorHandler));
    }
    GetCityByState(ID: number): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/GetCityByID?ID=${ID}`)
    }
    CreateOTPBymailID(UserName: string): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/CreateOTP?UserName=${UserName}`)
    }
    GetPersonalInformationByOTP(UserName: string, status: string): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/GetPersonalInformation?UserName=${UserName}&status=${status}`)
            .pipe(catchError(this.errorHandler));
    }
    GetPersonalInfo(): PersonalInfo {
        return this.personalInfo;
    }
    SetPersonalInfo(_personalInfo: PersonalInfo): void {
        this.personalInfo = _personalInfo;
    }

    SaveCustomerPersonalDetails(cobView: CustomerOnboardingView): Observable<any> {
        return this._httpClient.post<CustomerOnboardingView>(`${this.baseAddress}api/CustomerRegistration/SaveCustomerPersonalDetails`, cobView, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.errorHandler));
    }
    GetIdentityByTransID(ID: number): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetIdentityByTransID?transID=${ID}`)
        .pipe(catchError(this.errorHandler));
    }
    GenerateOTPForCustomer(transID: number): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GenerateOTPForCustomer?transID=${transID}`)
        .pipe(catchError(this.errorHandler));
    }
    AuthenticateCustomerWithOTP(otp:number,transID: number): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/AuthenticateCustomerWithOTP?otp=${otp}&transID=${transID}`)
        .pipe(catchError(this.errorHandler));
    }
    GetCustomerOnboardingView(transID: number): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetCustomerOnboardingView?transID=${transID}`)
        .pipe(catchError(this.errorHandler));
    }
}

