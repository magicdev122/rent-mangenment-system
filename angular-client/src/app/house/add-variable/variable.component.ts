import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Variable } from 'src/app/_classes/variable';
import { VariableService } from 'src/app/_services/variable.service';
import { RoomService } from 'src/app/_services/room.service';

@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.css']
})

export class VariableComponent implements OnInit {

  month = '';
  variable = new Variable();
  houseNames = [];
  selectedHouse = '';
    
  constructor(
    private roomService: RoomService,
    private variableService: VariableService,
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

  changeMonth(value) {
    this.month = value;
    this.variable.month = this.month;
  }

  selectHouse(value) {
    this.selectedHouse = value;
    this.variable.house = this.selectedHouse;
  }

  onAddVariable() {
    const variable = new Variable(this.variable.month, this.variable.house, this.variable.heat, this.variable.hydro, this.variable.water)

    console.log(this.variable);

    this.variableService.addVariable(variable).subscribe(res => {
        if(res.success) {
          this.flashMessagesService.show('Variable added.', { cssClass: 'alert-success', timeout: 2500});
        }
        else {
          this.flashMessagesService.show(res.msg, { cssClass: 'alert-danger', timeout: 2500});
        }
      });
  }
}
