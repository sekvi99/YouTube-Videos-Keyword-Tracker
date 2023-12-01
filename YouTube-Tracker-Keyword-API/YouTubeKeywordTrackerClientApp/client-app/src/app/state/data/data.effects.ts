import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, map, tap, mergeMap } from 'rxjs';
import { DataService } from "../../services/data.service";
import {
    fetch,
    fetchSuccess,
    fetchError
} from './data.actions';
import { IEntity } from "../../models/entity";

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

    constructor(
        private actions$: Actions,
        private dataService: DataService
    ) {}
}