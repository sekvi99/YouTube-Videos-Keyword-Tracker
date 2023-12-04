import { Component } from '@angular/core';
import { DataReducerEntity } from '../../state/data/data.reducer';
import { UsersEndpoints } from '../../services/api-endpoints/endpoints';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  entityType = DataReducerEntity.Users;
  endpoint = UsersEndpoints.Users;
  // columns = 
}
