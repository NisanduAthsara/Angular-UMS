import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

  @Input() details:any
  @Output() handleUserData:EventEmitter<any> = new EventEmitter()

  resData:any

  constructor() { }

  ngOnInit(): void {
  }

  updateUser(){
    this.resData = {...this.details,isUpdate:true,isDelete:false}
    this.handleUserData.emit(this.resData)
  }

  deleteUser(){
    this.resData = {...this.details,isUpdate:false,isDelete:true}
    this.handleUserData.emit(this.resData)
  }

}
