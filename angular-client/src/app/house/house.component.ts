import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { House } from '../_classes/house';
import { Room } from '../_classes/room';
import { HouseService } from '../_services/house.service';
import { RoomService } from '../_services/room.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})

export class HouseComponent implements OnInit {

    houseData = new House();
    roomData = new Room();
    houseNames = [];
    selectedHouse = '';

  constructor(
    private houseService: HouseService,
    private roomService: RoomService,
    private flashMessagesService: FlashMessagesService
    ) {}

  ngOnInit() { 
    this.getHouses()
  }

  async getHouses(): Promise<void> {
    const res = await this.roomService.getHouseNames().toPromise();
    this.houseNames = res.houses.map((item) => {
      return {name: item.name}
    })
    //console.log(this.houseNames);
  }

  selectHouse(value) {
    this.selectedHouse = value;
    this.roomData.houseName = this.selectedHouse;
    //console.log(this.selectedHouse);
  }

  onHouseSubmit() {
    const houseData = new House(
        this.houseData.name,this.houseData.address,this.houseData.baseRent,this.houseData.internet,this.houseData.insurance,
    )
    
    //console.log(this.houseData);

    this.houseService.addHouse(houseData).subscribe(res => {
        if(res.success) {
          this.flashMessagesService.show('House added.', { cssClass: 'alert-success', timeout: 2500});
        }
        else {
          this.flashMessagesService.show(res.msg, { cssClass: 'alert-danger', timeout: 2500});
        }
      });
  }

  onAddRoomSubmit() {
    const roomData = new Room(this.roomData.houseName, this.roomData.name, this.roomData.sharePercentage,)

    //console.log(this.roomData);

    this.roomService.addRoom(roomData).subscribe(res => {
        if(res.success) {
          this.flashMessagesService.show('Room added.', { cssClass: 'alert-success', timeout: 2500});
        }
        else {
          this.flashMessagesService.show(res.msg, { cssClass: 'alert-danger', timeout: 2500});
        }
      });
  }
}
