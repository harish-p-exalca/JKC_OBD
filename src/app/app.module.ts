import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { MatButtonModule, MatIconModule, MatSnackBar, MatSnackBarModule, MatDialogModule, MatToolbarModule, MAT_DATE_LOCALE } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { NotificationSnackBarComponent } from './notifications/notification-snack-bar/notification-snack-bar.component';
import { DatePipe } from '@angular/common';
import { NotificationDialogComponent } from './notifications/notification-dialog/notification-dialog.component';
import { WINDOW_PROVIDERS } from './window.providers';
// import { AuthenticationModule } from './allModules/authentication/authentication.module';
// import { PagesModule } from './allModules/pages/pages.module';
import { ForgetPasswordLinkDialogComponent } from './allModules/authentication/forget-password-link-dialog/forget-password-link-dialog.component';
// import { NgApexchartsModule } from "ng-apexcharts";
// import { ApprovalscreenComponent } from './approvalscreen/approvalscreen.component';
// import { InvitepageComponent } from './allModules/pages/invitepage/invitepage.component';



// import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';


const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: './allModules/authentication/authentication.module#AuthenticationModule'
    },
    {
        path: 'pages',
        loadChildren: './allModules/pages/pages.module#PagesModule'
    },
    {
        path: 'master',
       
        loadChildren: './allModules/master/master.module#MasterModule'
    },
    {
        path: 'reports',
        loadChildren: './allModules/reports/reports.module#ReportsModule'
    },
    {
        path: '**',
        redirectTo: 'pages/nextlogin'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        NotificationSnackBarComponent,
        NotificationDialogComponent,
       
        // ApprovalscreenComponent,
        // NgbdDatepickerBasic,
        // InvitepageComponent,
        
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, useHash: true }),
       
        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatDialogModule,
        MatToolbarModule,
        MatDatepickerModule,
        // NgApexchartsModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
    ],
    providers: [
        
        DatePipe,
        WINDOW_PROVIDERS,
        {provide: MAT_DATE_LOCALE, useValue: 'en-IN'}
    ],
    bootstrap: [
        AppComponent,
        // NgbdDatepickerBasic
    ],
    entryComponents: [
        NotificationDialogComponent
    ]
})
export class AppModule {
}
