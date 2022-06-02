import { Guid } from 'guid-typescript';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { _MatChipListMixinBase } from '@angular/material';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { PersonalInformation } from 'app/allModules/pages/dashboard/dashboard.component';
import { SendMail } from 'app/models/master';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    baseAddress: string;
    selecteddetails !: PersonalInformation;
    NotificationEvent: Subject<any>;
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

    getEmployee(): Observable<PersonalInformation[] | string> {
        return this._httpClient.get<PersonalInformation[]>('http://localhost:6540/api/OTPDetails/GetEmployees')
            .pipe(catchError(this.errorHandler));
    }
    AddEmployee(personalHistory: PersonalInformation): Observable<PersonalInformation | string> {
        return this._httpClient.post<PersonalInformation>('http://localhost:6540/api/OTPDetails/AddEmployee', personalHistory, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.errorHandler));
    }
    UpdateEmployee(personalHistory: PersonalInformation): Observable<PersonalInformation | string> {
        return this._httpClient.post<PersonalInformation>('http://localhost:6540/api/OTPDetails/UpdateEmployee', personalHistory, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.errorHandler));
    }

    SendMailResponse( SendMail : SendMail): Observable<any> {
        return this._httpClient.post<any>('http://localhost:6540/api/Master/SendMailResponse', SendMail, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.errorHandler));
    }
}
