import { MarketInformationView, CustomerOnboarding, DocumentRequired, CustomerOnboardingView } from './../models/master';
import { Guid } from 'guid-typescript';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { _MatChipListMixinBase } from '@angular/material';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { BankDetailsView, BusinessInformation, BusinessInformationView, PersonalInfo, SendMail } from 'app/models/master';
// import { BusinessInformation } from 'app/allModules/pages/business/business.component';

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
    getPersonalInfo(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/GetAllPersoalDetailsAndStatus`)
            .pipe(catchError(this.errorHandler));
    }
    getPersonalInfoByStatus(status: string): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/GetAllPersoalDetailsByStatus?status=${status}`,)
            .pipe(catchError(this.errorHandler));
    }
    GetAllRejectedPersonalStatusInfo(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/GetAllRejectedPersonalStatusInfo`)
            .pipe(catchError(this.errorHandler));
    }
    updateCustomerOnboardingStatus(CustomerOnboardingView:CustomerOnboardingView): Observable<any> {
        return this._httpClient.post<CustomerOnboarding>(`${this.baseAddress}api/PersonalInfo/UpdateCustomerOnboardingStatus`, CustomerOnboardingView ,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.errorHandler));
    }
    updateCustomerOnboardingRejectedStatus(CustomerOnboarding): Observable<any> {
        return this._httpClient.post<CustomerOnboarding>(`${this.baseAddress}api/PersonalInfo/UpdateCustomerOnboardingRejectedStatus`, CustomerOnboarding ,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.errorHandler));
    }
    getPersonalInfoByStatusAndRole(Role: string, status: string): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/GetPersonalInfoByStatusAndRole?Role=${Role}&status=${status}`,)
            .pipe(catchError(this.errorHandler));
    }
    GetAllCustomerOnBoardingByUserPosition(PositionID: string,UserID: string): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetAllCustomerOnBoardingByUserPosition?PositionID=${PositionID}&UserID=${UserID}`,)
            .pipe(catchError(this.errorHandler));
    }
    GetOpenCustomerOnBoardingByPosition(PositionID: string): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetOpenCustomerOnBoardingByPosition?PositionID=${PositionID}`,)
            .pipe(catchError(this.errorHandler));
    }
    GetApprovedCustomerOnBoardingByUser(UserID: string): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetApprovedCustomerOnBoardingByUser?UserID=${UserID}`,)
            .pipe(catchError(this.errorHandler));
    }
    GetRejectedCustomerOnBoardingByUser(UserID: string): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetRejectedCustomerOnBoardingByUser?UserID=${UserID}`,)
            .pipe(catchError(this.errorHandler));
    }
    GetAttachment(TransID: number,DocumentTitle:string): Observable<DocumentRequired | string> {
        return this._httpClient.get<DocumentRequired>(`${this.baseAddress}api/BankDetails/GetDocumentAttachment?TransID=${TransID}&DocumentTitle=${DocumentTitle}`)
            .pipe(catchError(this.errorHandler));
    }
    DowloandAttachment(AttachmentName: string,TransID: number): Observable<Blob | string> {
        return this._httpClient.get(`${this.baseAddress}api/BankDetails/DowloandDocumentAttachment?AttachmentName=${AttachmentName}&TransID=${TransID}`, {
          responseType: 'blob',
          headers: new HttpHeaders().append('Content-Type', 'application/json')
        })
          .pipe(catchError(this.errorHandler));
      }
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
    // AddMArketInfo(marketInfo: MarketInformation): Observable<MarketInformation | string> {
    //     return this._httpClient.post<MarketInformation>('http://10.43.13.9:80/api/MarketInfo/CreateMarketInfo', marketInfo, {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json'
    //         })
    //     })
    //         .pipe(catchError(this.errorHandler));
    // }
    AddBusinessInfo(businessInfo: BusinessInformation): Observable<BusinessInformation | string> {
        return this._httpClient.post<BusinessInformation>('http://10.43.13.9:80/api/BusinessInfo/CreateBusinessInfo', businessInfo, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.errorHandler));
    }
    // AddBankInfo(bankInfo: BankInformation): Observable<BankInformation | string> {
    //     return this._httpClient.post<BankInformation>('http://10.43.13.9:80/api/BankDetails/CreateBankDetailInfo', bankInfo, {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json'
    //         })
    //     })
    //         .pipe(catchError(this.errorHandler));
    // }
    // AddBankDetInfo(bankInfo: BankDetailInformation): Observable<BankDetailInformation | string> {
    //     return this._httpClient.post<BankDetailInformation>('http://10.43.13.9:80/api/BankDetails/CreateBankInfo', bankInfo, {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json'
    //         })
    //     })
    //         .pipe(catchError(this.errorHandler));
    // }
    // AddconnectionInfo(bankInfo: JKCInformation): Observable<JKCInformation | string> {
    //     return this._httpClient.post<JKCInformation>('http://10.43.13.9:80/api/BankDetails/CreateConnectionInfo', bankInfo, {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json'
    //         })
    //     })
    //         .pipe(catchError(this.errorHandler));
    // }
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
    AuthenticateCustomerWithOTP(otp: number, transID: number): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/AuthenticateCustomerWithOTP?otp=${otp}&transID=${transID}`)
            .pipe(catchError(this.errorHandler));
    }
    GetCustomerOnboardingView(transID: number): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetCustomerOnboardingView?transID=${transID}`)
            .pipe(catchError(this.errorHandler));
    }
    GetBusinessInformationView(transID: number): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/BusinessInfo/GetBusinessDatas?transID=${transID}`)
            .pipe(catchError(this.errorHandler));
    }
    GetMarketInformationView(transID: number): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/MarketInfo/GetMarketDatas?transID=${transID}`)
            .pipe(catchError(this.errorHandler));
    }
    SaveMarketInfoView(cobView: MarketInformationView): Observable<any> {
        return this._httpClient.post<MarketInformationView>(`${this.baseAddress}api/MarketInfo/SaveCustomerMarketDetails`, cobView, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.errorHandler));
    }
    SaveBankInfoView(cobView: BankDetailsView): Observable<any> {
        return this._httpClient.post<BankDetailsView>(`${this.baseAddress}api/BankDetails/saveBankInfoView`, cobView, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.errorHandler));
    }
    AddDocumentRequiredAttachment(TransID: number, selectedFiles: File[],DocumentTitle:string): Observable<any> {
        const formData: FormData = new FormData();
        if (selectedFiles && selectedFiles.length) {
            selectedFiles.forEach(x => {
                formData.append(x.name, x,x.name);
            });
        }
         formData.append('DocumentTitle',DocumentTitle);
        formData.append('TransID', TransID.toString());


        return this._httpClient.post<any>(`${this.baseAddress}api/BankDetails/AddDocumentRequiredAttachment`,
            formData,
            // {
            //   headers: new HttpHeaders({
            //     'Content-Type': 'application/json'
            //   })
            // }
        ).pipe(catchError(this.errorHandler));
    }

    // SaveBusinessInfoView(businessInfoView: BusinessInformationView): Observable<any> {
    //     return this._httpClient.post<BusinessInformationView>(`${this.baseAddress}api/BusinessInfo/SaveBusinessInformationDetails`, businessInfoView, {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json'
    //         })
    //     }).pipe(catchError(this.errorHandler));
    // }
    SaveBusinessInfoView(cobView: BusinessInformationView): Observable<any> {
        return this._httpClient.post<BusinessInformationView>(`${this.baseAddress}api/BusinessInfo/SaveBusinessInformationDetails`, cobView, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.errorHandler));
    }
    GetSecurityDetails(transID: number): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/BankDetails/GetBankViewDetails?transID=${transID}`)
            .pipe(catchError(this.errorHandler));
    }
    GetGeoLocationMasters(column: string,key:string): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/GetGeoLocationMasters?column=${column}&key=${key}`)
        .pipe(catchError(this.errorHandler));
    }
    GetInitiatorApprovedPieData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/GetInitiatorPieData`)
            .pipe(catchError(this.errorHandler));
    }
    GetASMPieData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/GetASMPieData`)
            .pipe(catchError(this.errorHandler));
    }
    GetSHPieData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/GetSHPieData`)
            .pipe(catchError(this.errorHandler));
    }
    GetZHPieData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/GetZHPieData`)
            .pipe(catchError(this.errorHandler));
    }
    GetDHPieData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/GetDHPieData`)
            .pipe(catchError(this.errorHandler));
    }
    GetRACPieData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/GetRACPieData`)
            .pipe(catchError(this.errorHandler));
    }
    GetStokistPieData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/PersonalInfo/GetStokistPieData`)
            .pipe(catchError(this.errorHandler));
    }
    GetCustomerInitiatedDraftBarData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetCustomerInitiatedDraftBarData`)
            .pipe(catchError(this.errorHandler));
    }
    GetCustomerInitiatedReleasedBarData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetCustomerInitiatedReleasedBarData`)
            .pipe(catchError(this.errorHandler));
    }
    GetCustomerCustomerReleasedBarData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetCustomerCustomerReleasedBarData`)
            .pipe(catchError(this.errorHandler));
    }
    GetCustomerStokistApprovedBarData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetCustomerStokistApprovedBarData`)
            .pipe(catchError(this.errorHandler));
    }
    GetCustomerRejectedBarData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetCustomerRejectedBarData`)
            .pipe(catchError(this.errorHandler));
    }
    GetCustomerASMApprovedBarData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetCustomerASMApprovedBarData`)
            .pipe(catchError(this.errorHandler));
    }
    GetCustomerSHApprovedBarData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetCustomerSHApprovedBarData`)
            .pipe(catchError(this.errorHandler));
    }
    GetCustomerZHApprovedBarData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetCustomerZHApprovedBarData`)
            .pipe(catchError(this.errorHandler));
    }
    GetCustomerDHApprovedBarData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetCustomerDHApprovedBarData`)
            .pipe(catchError(this.errorHandler));
    }
    GetCustomerRACApprovedBarData(): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/CustomerRegistration/GetCustomerRACApprovedBarData`)
            .pipe(catchError(this.errorHandler));
    }

}


