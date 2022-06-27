import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvitepageComponent } from '../invitepage/invitepage.component';
import { DashboardComponent, DialogData } from './dashboard.component';

import { SendMail } from 'app/models/master';
import { DashboardService } from 'app/services/dashboard.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class dialogComponent {
  SendMail = []
  constructor(public dialog: MatDialog, 
    public dialogRef: MatDialogRef<dialogComponent>,
    private router: Router, private _dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
     ) { }
 
  closebtn(): void {
    this.dialogRef.close();
  }
  Okbtn(){
    this.dialogRef.close();
  }
  cancel(){
    this.dialogRef.close(true);
  }
}
