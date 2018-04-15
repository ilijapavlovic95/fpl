import { DataService } from './data.service';
import { MyTeam } from './../models/myteam.model';
import { Injectable } from '@angular/core';

@Injectable()
export class MyTeamService {

  myTeam: MyTeam;

  constructor() { }

}
