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
    PositionID: string;
    ReportingTo: string;
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
    PositionID: string;
    ReportingTo: string;
    DisplayName: string;
    EmailAddress: string;
    UserRole: string;
    MenuItemNames: string;
    Profile: string;
    RefreahToken: string;
    Expires: string;
    Issued: string;
    Expiresin: string;
    Token: string;
}
export class ChangePassword {
    UserID: Guid;
    UserName: string;
    CurrentPassword: string;
    NewPassword: string;
}
export class EMailModel {
    EmailAddress: string;
    PortalAddress: string;
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
export class CustomerOnboardingView1 extends CommonClass {
    TranID: number;
    Status: string;
    UserID: string;
    PositionID: string;
    RoleName: string;
}
export class CustomerOnboardingView {
    UserID: string;
    PositionID: string;
    Transaction: CustomerOnboarding;
    PersonalInfo: PersonalInformationView;
}
export class BankDetails {
    ID: number;
    BankName: string;
    BankAddress: string;
    IFSC: string;
    AccountNum: string;
    TransID: number;
}
export class AttachmentDetails {
    FileName: string;
    blob: Blob;
}
export class DocumentRequired {
    ID: number;
    TransID: number;
    DocumentTitle: string;
    AttachmentName: string;
    ContentType: string;
    ContentLength: number;
    AttachmentFile: string;
}
export class BusinessInformationView {
    Businessinfo: BusinessInformation;
    SalesandTargets: SalesAndTarget[];
}
// export class BankDetailsView {
//   BankDetailInfo: BankDetails[];
//   SecurityDetails:SecurityDepositDetail;
//   Documentsrequired: DocumentRequired[];
// }
export class BankDetailsView {
    BankDetailInfo: BankDetails[];
    SecurityDeposit: SecurityDepositDetail;
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
    Latitude: string;
    Logitude: string;
}
export class PersonalInfoStatusView {
    TranID: number;
    Name: string;
    City: string;
    District: string;
    State: string;
    TransID: number;
    Status: string;
}
export class PersonalInfoByStatusView {
    Role: string;
    Name: string;
    City: string;
    District: string;
    State: string;
    TransID: number;
    Status: string;

}
export class SecurityDepositDetail {
    ID: number;
    TransID: number;
    Type: string;
    Leaf: string;
    Date: Date | string;
    Amount: number;
    BankName: string;
    AdvBillingParty: boolean;
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

export class BusinessInformation {
    ID: number;
    TransID: number;
    Turnover1: string;
    Turnover2: string;
    Turnover3: string;
    WorkingCaptial: string;
    NoVechicle: number;
    TotalStorage: string;
    Retail: number;
    Wholesale: number;
    Retailers: string;
}
export class SalesAndTarget {
    ID: number;
    TransID: number;
    Product:string;
    Month: string;
    Value: number;
}
export class MarketInformation {
    ID: number;
    MarketName: string;
    Population: number;
    MarketPotential: string;
    StockList: string;
    Distance: number;
    StockListName: string;
    Year: number;
    Area: string;
    Total: number;
    MonthlySale: number;
    PanNo: string;
    GstNo: string;
    Background: string;
    TransID: number;

}
export class AverageSale {
    ID: number;
    TransID: number;
    Brand: string;
    AvgSale: number;
}
export class MarketInformationView {
    AverageSale: AverageSale[];
    MarketInformation: MarketInformation;
}
// export class BusinessInfoView{
//     Business:BusinessInformation;
//     Sales:SalesAndTarget[];
// }
export class LineChartData {
    ID: number;
    Month: string;
    InitiatorDraftCount: number;
    InitiatorReleasedCount: number;
    CustomerReleasedCount: number;
    StokistApprovedCount: number;
    RejectedCount: number;
}

export class CustomerOnboardingApprovalMatrix extends CommonClass {
    ID: number;
    TranID: number;
    InitialApproverPositionID: string;
    LastApproverPositionID: string;
    IsASMApproved: boolean;
    ASMApprovedOn: Date | string | null;
    ASMApprover: string;

    IsSHApproved: boolean;
    SHApprovedOn: Date | string | null;
    SHApprover: string;

    IsZHApproved: boolean;
    ZHApprovedOn: Date | string | null;
    ZHApprover: string;

    IsDHApproved: boolean;
    DHApprovedOn: Date | string | null;
    DHApprover: string;

    IsRejected: boolean;
    RejectededOn: Date | string | null;
    RejectedBy: string;

}