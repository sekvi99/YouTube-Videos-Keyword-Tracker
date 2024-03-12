import { DataReducerEntity } from '../../state/data/data.reducer';
import { IUserDisplayView } from '../../models/user/user.display.view';
import { getRoleName } from '../helpers/role-name-mapper';
import { getFormattedDate } from '../helpers/date-mapper';
import { ISearchKeyword } from '../../models/data/search.keyword';
import { IReport } from '../../models/report/report';

export const TABLE_MAP_FUNCTIONS: Record<DataReducerEntity, any> = {
  keywordsData: (items: ISearchKeyword[]) => {
    return items.map((item: ISearchKeyword) => ({
      ...item,
      dateCreated: getFormattedDate(item.dateCreated),
      dateModified: getFormattedDate(item.dateModified),
    }));
  },
  singleKeywordData: null,
  reportsData: (items: IReport[]) => {
    return items.map((item: IReport) => ({
      ...item,
      publishedAt: getFormattedDate(item.publishedAt),
    }));
  },
  usersData: (items: IUserDisplayView[]) => {
    return items.map((item: IUserDisplayView) => ({
      ...item,
      roleName: getRoleName(item.roleId),
    }));
  },
};
