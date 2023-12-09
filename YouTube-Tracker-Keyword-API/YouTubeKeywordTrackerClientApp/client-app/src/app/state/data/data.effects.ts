import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, map, tap, mergeMap } from 'rxjs';
import { DataService } from "../../services/data.service";
import {
    fetch,
    fetchSuccess,
    fetchError,
    fetchById,
    fetchByIdSuccess,
    upload,
    uploadSuccess,
    uploadError,
    edit,
    editSuccess,
    editError,
    deleteData,
    deleteSuccess,
    deleteError
} from './data.actions';
import { IEntity } from "../../models/entity";
import { DataReducerEntity } from "./data.reducer";
import { KeywordsEndpoints, UsersEndpoints } from "../../services/api-endpoints/endpoints";
import { ToastService } from "../../services/toast.service";
import { DataActionMessages } from "../../models/toast/toast-messages";

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

    upload$ = createEffect(() => 
        this.actions$.pipe(
            ofType(upload),
            mergeMap(action => {
                return this.dataService
                .upload(action.endpoint, action.formData)
                .pipe(
                    map(data => uploadSuccess({ successMessage: 'Successfully uploaded data' })),
                    catchError(() => of(uploadError({ errorMessage: 'Error occured while uploading data' })))
                )
            })
        )
    );

    uploadSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(uploadSuccess),
            tap(() => {
                this.toastService.success(DataActionMessages.AddSuccess);
            })
        ),
        { dispatch: false }
    );

    uploadError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(uploadError),
            tap(() => {
                this.toastService.error(DataActionMessages.AddError);
            })
        )
    );

    edit$ = createEffect(() => 
        this.actions$.pipe(
            ofType(edit),
            mergeMap(action => {
                return this.dataService
                .edit(action.endpoint, action.formData)
                .pipe(
                    map(() => editSuccess({ successMessage: 'Successfully edited data' })),
                    catchError(() => of(editError({ errorMessage: 'Error occured while editing data' })))
                )
            })
        )
    );

    editSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(editSuccess),
            tap(() => {
                this.toastService.success(DataActionMessages.EditSuccess);
            })
        ),
        { dispatch: false }
    );

    editError$ = createEffect(() => 
        this.actions$.pipe(
            ofType(editError),
            tap(() => {
                this.toastService.error(DataActionMessages.EditError);
            })
        ),
        { dispatch: false }
    );

    delete$ = createEffect(() => 
        this.actions$.pipe(
            ofType(deleteData),
            mergeMap(action => {
                return this.dataService
                .delete(action.endpoint, action.entity)
                .pipe(
                    map(() => deleteSuccess({ successMessage: 'Successfully deleted data' })),
                    catchError(() => of(deleteError({ errorMessage: 'Error occured while deleting data' })))
                )
            })
        )
    );

    deleteSuccess$ = createEffect(() => 
        this.actions$.pipe(
            ofType(deleteSuccess),
            tap(()=> this.toastService.success(DataActionMessages.DeleteSuccess))
        ),
        { dispatch: false }
    );

    deleteError$ = createEffect(() => 
        this.actions$.pipe(
            ofType(deleteError),
            tap(() => this.toastService.error(DataActionMessages.DeleteError))
        ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private toastService: ToastService
    ) {}
}