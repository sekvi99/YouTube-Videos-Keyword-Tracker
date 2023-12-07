import { Component } from '@angular/core';
import { KeywordsEndpoints } from '../../services/api-endpoints/endpoints';
import { KEYWORD_COLUMNS_DEFINITION } from '../../common/table/columns-definition';
import { HEADER_DEFINITIONS } from '../../common/header/header-definitions';
import { DataReducerEntity } from '../../state/data/data.reducer';
import { ListComponent } from '../../generic-components/list-component';
import { ISearchKeyword } from '../../models/data/search.keyword';

@Component({
  selector: 'app-keyword-list',
  templateUrl: './keyword-list.component.html',
  styleUrl: './keyword-list.component.scss'
})
export class KeywordListComponent extends ListComponent<ISearchKeyword> {
  entityType = DataReducerEntity.Keywords;
  endpoint = KeywordsEndpoints.GetAllKeywords;
  columns = KEYWORD_COLUMNS_DEFINITION;
  headerDefinition = HEADER_DEFINITIONS.keywords;

  override editDataClick(data: ISearchKeyword): void {
    this.dialog.openDialog(data, this.entityType, true);
  }

  override deleteDataClick(data: ISearchKeyword): void {
    throw new Error('Method not implemented.');
  }
}
