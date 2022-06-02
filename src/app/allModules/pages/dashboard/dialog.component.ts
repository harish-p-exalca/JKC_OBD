import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvitepageComponent } from '../invitepage/invitepage.component';
import { DashboardComponent } from './dashboard.component';

import { SendMail } from 'app/models/master';
import { DashboardService } from 'app/services/dashboard.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class dialogComponent {
  SendMail = []
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<dialogComponent>, private router: Router, private _dashboardService: DashboardService) { }
  closebtn(): void {
    this.dialogRef.close();
  }
  Invite(): void {
    // sendMail: SendMail;
    this.dialogRef.close();
    const sendmail: SendMail = new SendMail();
    sendmail.Username = "Exalca";
    sendmail.toEmail = "afrinbanu.n@exalca.com";
    sendmail.otp ="";
    //"mithuna80255@gmail.com";
      this._dashboardService.SendMailResponse(sendmail).subscribe(
        (res) => {  
        console.log(res);
        } 
        );
        this.router.navigate(['pages/invite']);
  }
}
