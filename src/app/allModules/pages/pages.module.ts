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
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { BusinessComponent } from './business/business.component';
import { MarketinformationComponent } from './marketinformation/marketinformation.component';
import { BankinformationComponent } from './bankinformation/bankinformation.component';



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
        path: 'personalinformation',
        component: PersonalInformationComponent
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
        path: '**',
        redirectTo: '/auth/login'
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
        FormsModule
    ],
    declarations: [
        DashboardComponent,
        dialogComponent,
        NextloginComponent,
        InvitepageComponent,
        PersonalInformationComponent,
        BusinessComponent,
        MarketinformationComponent,
        BankinformationComponent,

    ],
    providers: [
        DecimalPipe
    ],
    entryComponents: [
        dialogComponent,
    ]
})
export class PagesModule { }
