import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, map, tap, mergeMap } from 'rxjs';
import { DataService } from "../../services/data.service";
import {
    fetch,
    fetchSuccess,
    fetchError,
    fetchById,
    fetchByIdSuccess
} from './data.actions';
import { IEntity } from "../../models/entity";
import { DataReducerEntity } from "./data.reducer";
import { KeywordsEndpoints, UsersEndpoints } from "../../services/api-endpoints/endpoints";

const TABLE_ENTITY_URL_MAP: Record<DataReducerEntity, string> = {
    keywordsData: KeywordsEndpoints.GetAllKeywords,
    singleKeywordData: KeywordsEndpoints.GetSingleKeyword,
    usersData: UsersEndpoints.Users
}

@Injectable()
export class DataEffects {
    // Data
    fetch$ = createEffect(() => 
        this.actions$.pipe(
            ofType(fetch),
            mergeMap(action => {
                return this.dataService.
                fetch(action.endpoint)
                .pipe(
                    map(data => 
                        fetchSuccess({ collection: data as IEntity[]})
                    ),
                    catchError((error) => {
                        console.log('Data fetch error: ', error);
                        return of(fetchError({ error }));
                    })
                )
            })
        )
    );

    fetchById$ = createEffect(() => 
        this.actions$.pipe(
            ofType(fetchById),
            mergeMap(action => {
                return this.dataService
                .fetchById(action.endpoint, action.id)
                .pipe(
                    map(data => 
                        fetchByIdSuccess({ data: data as IEntity })
                    ),
                    catchError((error) => {
                        console.log('Data fetch by id error: ', error);
                        return of(fetchError({ error }));
                    })
                )
            })
        )
    );

    constructor(
        private actions$: Actions,
        private dataService: DataService
    ) {}
}