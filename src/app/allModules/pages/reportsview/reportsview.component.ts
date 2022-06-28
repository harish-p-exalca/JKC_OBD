import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Monthlysales } from '../business/business.component';

const ELEMENT_DATA: Monthlysales[] = [
  { sale: "WallmaxX" },
  { sale: "WhitemaxX" },
  { sale: "GypsomaxX" },
  { sale: "ShieldmaxX" },
  { sale: "SmoothMaxX" },
  { sale: "RepairmaxX" },
  { sale: "TilemaxX" },
  { sale: "Woodamore" },
];

@Component({
  selector: 'app-reportsview',
  templateUrl: './reportsview.component.html',
  styleUrls: ['./reportsview.component.scss']
})

export class ReportsviewComponent implements OnInit {
  
  PIform: FormGroup;
  MIform!: FormGroup;
  BrandForm!:FormGroup
  BIform !: FormGroup
  BrandForm1!: FormGroup;
  BIform1!: FormGroup;
  displayedColumns: string[] = ["sale"]
  displayColumns: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  columnsToDisplay: string[] = this.displayColumns.slice();
  dataSource = ELEMENT_DATA;
  constructor( private fb: FormBuilder,) { }

  ngOnInit() {
    this.InitializeFormGroup();
    this.MIform = this.fb.group({
      market: [''],
      Population: [''],
      Potential: ['', Validators.required],
      Stockist: [''],
      Distance: [''],
      NameOfNearest: [''],
      YearOfEstablished: ['', Validators.required],
      AreasStockist: [''],
      TotalPotential: ['', Validators.required],
      JKAvg: ['', Validators.required],
      Pan: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
      Gst: ['',[Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]],
      PartyBackground: ['', Validators.required],

    })
    this.BrandForm = this.fb.group({
      brand: ['',Validators.required],
      wpMonth: [''],
      wcMonth: [''],
    })
    this.BIform = this.fb.group({
      NoOfYears: ['', Validators.required],
      NoOfYears1: ['', Validators.required],
      capitalinvest: ['', Validators.required],
      storagecapacity: ['', Validators.required],
      retail: ['', Validators.pattern(/^[0-9]$/)],
      vehicle: ['', Validators.required],
      Wholesale: ['', Validators.pattern(/^[a-zA-Z0-9]+$/)],



    })
    this.BrandForm1 = this.fb.group({
      sales: ['', Validators.required],
      date1: [''],
      date2: [''],
    })
    this.BIform1 = this.fb.group({
      leaf: ['', Validators.required],
      Leafno: ['', Validators.required],
      Date: ['', Validators.required],
      Amount: ['', Validators.required],
      nameofbank: ['', Validators.required],
      bankno: [''],
      bankname: ['', Validators.required],
      bankaddress: ['', Validators.required],
      ifsccode: ['', Validators.required],
      bankacno: ['', Validators.required],
      jkc1: ['', Validators.required],
      politicalParty: ['', Validators.required],
      police: ['', Validators.required],
      admin: ['', Validators.required],
      sales: ['', Validators.required],
      asmname: ['', Validators.required],
      headname: ['', Validators.required],
      jkc1Name: ['',],
      jkcMobile: [''],
      jkcPerson: [''],
      politicalname: [''],
      politicalMobile: [''],
      politicalPerson: [''],
      policeName: [''],
      policeMobile: [''],
      policePerson: [''],
      adminName: [''],
      adminMobile: [''],
      adminperson: [''],
      salesName: [''],
      salesMobile: [''],
      salesPerson: [''],
      asmname1: [''],
      asmnMobile: [''],
      asmnperson: [''],
      headname1: [''],
      headMobile: [''],
      headPerson: [''],
      declare: [''],
      billing: []
    });
  }
  InitializeFormGroup() {
    this.PIform = this.fb.group({
        category: ["", Validators.required],
        product: ["", Validators.required],
        Name: ["", Validators.required],
        Address: ["", Validators.required],
        latitude: [''],
        longitude: [''],
        District: ["", Validators.required],
        City: ["", Validators.required],
        Taluka: ["", Validators.required],
        Tehsil: ["", Validators.required],
        State: ["", Validators.required],
        Pincode: [
            "",
            [
                Validators.required,
                Validators.pattern(/^(\d{6}|\d{7}|\d{8}|\d{9}|\d{10})$/),
            ],
        ],
        Status: ["", Validators.required]
    });
    // this.firmForm = this.fb.group({

    //     Status: [""],
    //     Name1: ["", Validators.required],
    //     Mobile1: [
    //         "",
    //         [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)],
    //     ],
    //     email1: [
    //         "",
    //         [
    //             Validators.required,
    //             Validators.pattern(
    //                 /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    //             ),
    //         ],
    //     ],

    // });
}
}
