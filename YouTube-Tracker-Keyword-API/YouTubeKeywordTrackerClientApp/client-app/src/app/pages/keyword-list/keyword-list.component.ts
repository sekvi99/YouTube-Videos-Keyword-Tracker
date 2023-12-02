import { Component } from '@angular/core';
import { KeywordsEndpoints } from '../../services/api-endpoints/endpoints';
import { KEYWORD_COLUMNS_DEFINITION } from '../../common/table/columns-definition';
import { HEADER_DEFINITIONS } from '../../common/header/header-definitions';
import { DataReducerEntity } from '../../state/data/data.reducer';

@Component({
  selector: 'app-keyword-list',
  templateUrl: './keyword-list.component.html',
  styleUrl: './keyword-list.component.scss'
})
export class KeywordListComponent {
  entityType = DataReducerEntity.Keywords;
  endpoint = KeywordsEndpoints.GetAllKeywords;
  columns = KEYWORD_COLUMNS_DEFINITION;
  headerDefinition = HEADER_DEFINITIONS.keywords;
}
