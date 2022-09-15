import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSidebarModule } from '@fuse/components';
import {
    MatFormFieldModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {
    FuseCountdownModule,
    FuseHighlightModule,
    FuseMaterialColorPickerModule,
    FuseWidgetModule
} from '@fuse/components';

import { FuseSharedModule } from '@fuse/shared.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DecimalPipe } from '@angular/common';
import { dialogComponent } from './dashboard/dialog.component';
import { NextloginComponent } from './nextlogin/nextlogin.component';
import { InvitepageComponent } from './invitepage/invitepage.component';
import { BusinessComponent } from './business/business.component';
import { MarketinformationComponent } from './marketinformation/marketinformation.component';
import { BankinformationComponent } from './bankinformation/bankinformation.component';
import { ApprovalscreenComponent } from '../approvalscreen/approvalscreen.component';
import { ChartsModule } from 'ng2-charts';
 import { NgApexchartsModule } from "ng-apexcharts";
import { BankdialogComponent } from './bankdialog/bankdialog.component';
import { InitiatorDashboardComponent } from './initiator-dashboard/initiator-dashboard.component';
import { ReportsviewComponent } from './reportsview/reportsview.component';
import { ForgotPasswordComponent } from '../authentication/forgot-password/forgot-password.component';
import { ForgetPasswordLinkDialogComponent } from '../authentication/forget-password-link-dialog/forget-password-link-dialog.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { AttachmentDialogComponent } from './attachment-dialog/attachment-dialog.component';


const routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'nextlogin',
        component:NextloginComponent
    },
    {
        path: 'invite',
        component: InvitepageComponent
    },
    {
        path: 'businessinformation',
        component: BusinessComponent
    },
    {
        path: 'marketinformation',
        component: MarketinformationComponent
    },
    {
        path: 'bankinformation',
        component: BankinformationComponent
    },
    {
        path: 'approvalinformation',
        component: ApprovalscreenComponent
    },
    {
        path: 'initiatordashboard',
        component: InitiatorDashboardComponent
    },
    {
        path: 'reportview',
        component: ReportsviewComponent
    },
    // {
    //     path: 'usermanagement',
    //     loadChildren: './usermanagement.module#UserManagementModule'
    // },
    {
        path: '**',
        redirectTo: 'pages/nextlogin'
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        // HttpClientModule,
        // TranslateModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        NgxChartsModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseCountdownModule,
        FuseHighlightModule,
        FuseMaterialColorPickerModule,
        FuseWidgetModule,
        FormsModule,
       ChartsModule,
       NgApexchartsModule,
       NgOtpInputModule
    ],
    declarations: [
        DashboardComponent,
        dialogComponent,
        NextloginComponent,
        InvitepageComponent,
        BusinessComponent,
        MarketinformationComponent,
        BankinformationComponent,
        ApprovalscreenComponent,
        BankdialogComponent,
        InitiatorDashboardComponent,
        ReportsviewComponent,
        ForgetPasswordLinkDialogComponent,
        AttachmentDialogComponent,
    ],
    providers: [
        DecimalPipe
    ],
    entryComponents: [
        dialogComponent,
        BankdialogComponent,
        ForgetPasswordLinkDialogComponent,
        AttachmentDialogComponent
    ]
})
export class PagesModule { }
