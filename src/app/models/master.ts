import { Guid } from 'guid-typescript';

export class CommonClass {
    IsActive: boolean;
    CreatedOn: Date | string;
    CreatedBy: string;
    ModifiedOn: Date | string | null;
    ModifiedBy: string;
}
export class UserWithRole {
    UserID: Guid;
    RoleID: Guid;
    UserName: string;
    Plant: string;
    Email: string;
    Password: string;
    ContactNumber: string;
    IsActive: boolean;
    CreatedOn: Date;
    CreatedBy: string;
    ModifiedOn?: Date;
    ModifiedBy: string;
}
export class RoleWithApp {
    RoleID: Guid;
    RoleName: string;
    AppIDList: number[];
    IsActive: boolean;
    CreatedOn: Date;
    CreatedBy: string;
    ModifiedOn?: Date;
    ModifiedBy: string;
}
export class MenuApp {
    AppID: number;
    AppName: string;
    IsActive: boolean;
    CreatedOn: Date;
    CreatedBy: string;
    ModifiedOn?: Date;
    ModifiedBy: string;
}
export class Reason {
    ReasonID: number;
    Description: string;
    IsActive: boolean;
    CreatedOn: Date;
    CreatedBy: string;
    ModifiedOn?: Date;
    ModifiedBy: string;
}
export class AuthenticationDetails {
    isAuth: boolean;
    UserID: Guid;
    UserName: string;
    DisplayName: string;
    EmailAddress: string;
    UserRole: string;
    MenuItemNames: string;
    Profile: string;
    RefreahToken: string;
    Expires: string;
    Issued: string;
    Expiresin: string;
}
export class ChangePassword {
    UserID: Guid;
    UserName: string;
    CurrentPassword: string;
    NewPassword: string;
}
export class EMailModel {
    EmailAddress: string;
    siteURL: string;
}
export class ForgotPassword {
    UserID: Guid;
    EmailAddress: string;
    NewPassword: string;
    Token: string;
}
export class UserNotification {
    ID: number;
    UserID: string;
    Message: string;
    HasSeen: boolean;
    CreatedOn: Date;
    ModifiedOn?: Date;
}
export class SendMail {
    Username: string;
    toEmail: string;
    otp: string;
}

export class LoginModel {
    UserName: string;
    Password: string;
    clientId: string;
}
export class OTPLogin {
    OTPNo: number;
    UserName: string;
}
export class PersonalInfo {
    FirmStatus: string;
    Name: string[];
    constructor() {
        this.Name = [];
    }
}
export class PersonIdentity {
    FirmName: string;
    Name: string;
    MobileNo: string;
    EmailId: string;
    TransID: number;
}

export class CustomerOnboarding extends CommonClass {
    TranID: number;
    Status: string;
}
export class CustomerOnboardingView {
    Transaction: CustomerOnboarding;
    PersonalInfo: PersonalInformationView;
}
export class PersonalInformationView {
    PersonalInformation: PersonalInformation;
    Identities: PersonIdentity[];
}
export class PersonalInformation {
    ID: string;
    category: string;
    Name: string;
    Address: string;
    District: string;
    product: string;
    City: string;
    Taluk: string;
    Tehsil: string;
    State: string;
    Pincode: number;
    Status: string;
    TransID: number;
    Latitude:string;
    Logitude:string;
}
export class States {
    ID: number;
    StateName: string;
}
export class Cities {
    ID: number;
    City: string;
    State_id: number;
}
export class ProductDetails {
    ProductID: number;
    ProductName1: string;
    ProductName2: string;
    ProductName3: string;
    ProductName4: string;
    ProductName5: string;
    ID: number;
}
