import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { RoomService } from '../_services/room.service';
import { FlashMessagesService } from 'angular2-flash-messages'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  houseNames = [];
  roomNames = [];
  months = [];
  residents: any = [];
  selectedHouse = '';
  selectedRoom = '';
  selectedMonth = '';
  selectedResident = '';
  totalRent;
  selectedRoomRent;
  selected: boolean = false ;

  houseData = [{baseRent:'', internet:'', insurance:''}];
  roomData = [{share:''}];
  monthData = [{heat:'', hydro:'',water:''}];

  constructor(
    private userService: UserService,
    private roomService: RoomService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getHouses();
    this.getUsers();
  }

  async getHouses(): Promise<void> {
    const res = await this.roomService.getHouseNames().toPromise();
    this.houseNames = res.houses.map((item) => {
      return {name: item.name, baseRent: item.baseRent, internet: item.internet, insurance: item.insurance}
    })
    console.log(this.houseNames);
  }
  
  async getRoom(house): Promise<void> {
    const res =await this.roomService.getRoomNames(house).toPromise();
    this.roomNames = res.rooms.map(item => {
      return {name: item.name, share: item.sharePercentage}
    })
  }

  async getMonth(house): Promise<void> {
    const res =await this.roomService.getMonths(house).toPromise();
    this.months = res.variables.map(item => {
      return {month: item.month, heat: item.heat, hydro: item.hydro, water:item.water}
    })
  }

  async getUsers(): Promise<void> {
    const res = await this.userService.getResidents().toPromise();
    this.residents = res.residents.map((item) => {
      return {name: item.name, email: item.email, phone: item.phone, emergencyContact: item.emergencyContact}
    })
    console.log(this.residents);
  }

  async selectHouse(value) {
    this.selectedHouse = value;
    this.getRoom(this.selectedHouse);
    this.getMonth(this.selectedHouse);
    this.houseData = await this.houseNames.filter(item => item.name === value);
    //console.log(this.houseData)
  }

  selectRoom(value) {
    this.selectedRoom = value;
    this.roomData = this.roomNames.filter(item => item.name === value);
  }

  selectMonth(value) {
    this.selectedMonth = value;
    this.monthData = this.months.filter(item => item.month === value)
    this.totalRent = parseInt(this.houseData[0].baseRent) + parseInt(this.houseData[0].insurance) + parseInt(this.houseData[0].internet) + parseInt(this.monthData[0].heat) + parseInt(this.monthData[0].hydro) + parseInt(this.monthData[0].water);
    this.selectedRoomRent = this.totalRent * parseInt(this.roomData[0].share)/100;
  }

  selectResident(value) {
    this.selectedResident = value
  }
  
  onResidentSetting() {
    const userData = this.residents.filter(item => item.email === this.selectedResident);
    const data = {house:this.selectedHouse, room: this.selectedRoom, userData: userData};
    //console.log(data)
    this.userService.setResident(data).subscribe(res => {
      if(res.success) {
        this.flashMessagesService.show('Setting done.', { cssClass: 'alert-success', timeout: 2500});
      }
      else {
        this.flashMessagesService.show(res.msg, { cssClass: 'alert-danger', timeout: 2500});
      }
    });
  }

  async sendEmail(to) {
    this.userService.sendEmail(to).subscribe(res => {
      if (res) {
        this.flashMessagesService.show('sd done.', { cssClass: 'alert-success', timeout: 2500 });
      }
      else {
        this.flashMessagesService.show('', { cssClass: 'alert-danger', timeout: 2500 });
      }
    })
  }
}

