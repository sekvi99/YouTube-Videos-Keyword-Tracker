import { Component } from '@angular/core';
import { DataReducerEntity } from '../../state/data/data.reducer';
import { UsersEndpoints } from '../../services/api-endpoints/endpoints';
import { USERS_HUB_COLUMNS_DEFINITION } from '../../common/table/columns-definition';
import { HEADER_DEFINITIONS } from '../../common/header/header-definitions';
import { ListComponent } from '../../generic-components/list-component';
import { deleteData } from '../../state/data/data.actions';
import { IUserDisplayView } from '../../models/user/user.display.view';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent extends ListComponent<IUserDisplayView> {
  entityType = DataReducerEntity.Users;
  endpoint = UsersEndpoints.Users;
  columns = USERS_HUB_COLUMNS_DEFINITION;
  headerDefinition = HEADER_DEFINITIONS.usersHub;

  override editDataClick(data: IUserDisplayView): void {
    this.dialog.openDialog(data, this.entityType, true);
  }

  override deleteDataClick(data: IUserDisplayView): void {
    this.store.dispatch(deleteData({
      endpoint: UsersEndpoints.User,
      entity: data
    }))
  }
}
