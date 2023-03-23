import { Component, OnInit } from '@angular/core';
import { User } from '../_classes/user';
import { UserService } from '../_services/user.service';
import { RoomService } from '../_services/room.service'; 

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.css']
})
export class ResidentsComponent implements OnInit {

  residents: any = [];

  constructor(
    private userService: UserService,
    private roomService: RoomService,
    ) {}

  ngOnInit() {
    this.getResidentList();
  }

  async getResidentList(): Promise<void> {
    const res = await this.userService.getResidents().toPromise();
    //console.log(res);
    this.residents = res.residents.map((item) => {
      if(!item.address.length) return {name: item.name, email: item.email, phone: item.phone, emergencyContact: item.emergencyContact, address:item.address}
      else return {name: item.name, email: item.email, phone: item.phone, emergencyContact: item.emergencyContact, address:item.address[0].room+','+item.address[0].house}
    });
  }

  onToggleChange(state) {
    console.log(state) 
  }

}