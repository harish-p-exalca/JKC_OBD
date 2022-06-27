import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { dialogComponent } from '../dashboard/dialog.component';

@Component({
  selector: 'app-bankdialog',
  templateUrl: './bankdialog.component.html',
  styleUrls: ['./bankdialog.component.scss']
})
export class BankdialogComponent implements OnInit {

  constructor(public dialog: MatDialog, 
    public dialogRef: MatDialogRef<dialogComponent>,
    private router: Router,) { }

  ngOnInit() {
  }
  Okbtn(){
    this.router.navigate(['pages/nextlogin'])
  }
  closebtn(){
    this.router.navigate(['pages/nextlogin'])
  }
}
