import { Component } from '@angular/core';
import { DataReducerEntity } from '../../state/data/data.reducer';
import { UsersEndpoints } from '../../services/api-endpoints/endpoints';
import { USERS_HUB_COLUMNS_DEFINITION } from '../../common/table/columns-definition';
import { HEADER_DEFINITIONS } from '../../common/header/header-definitions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  entityType = DataReducerEntity.Users;
  endpoint = UsersEndpoints.Users;
  columns = USERS_HUB_COLUMNS_DEFINITION;
  headerDefinition = HEADER_DEFINITIONS.usersHub;
}
