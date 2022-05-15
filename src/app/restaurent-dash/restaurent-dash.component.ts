import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from '../shared/restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.scss']
})

export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup
  restaurentModelObj: RestaurentData = new RestaurentData
  allRestaurentData: any
  showAdd!: boolean;
  showbtn!: boolean;

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData()
  }

  clickAddRestau() {
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false;
  }

  //Subscribing the data from Services
  addRestau() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestaurent(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurent records Added Successfully");
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllData();
    },
      err => {
        alert("Invalid");
      })
  }
  //Get all Data in Table
  getAllData() {
    this.api.getRestaurent().subscribe(res => {
      this.allRestaurentData = res;
    })
  }
  //Delete records
  deleteRestau(data: any) {
    this.api.deleteRestaurent(data.id).subscribe(res => {
      alert("Records Deleted Succesfully");
      this.getAllData();
    })
  }
  //Edit Data
  onEditRestau(data: any) {
    this.showAdd = false;
    this.showbtn = true;
    this.restaurentModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateRestau() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurent(this.restaurentModelObj, this.restaurentModelObj.id).subscribe(res => {
      alert("Records Update Successfully");

      this.formValue.reset();
      this.getAllData();
    })
  }
}

