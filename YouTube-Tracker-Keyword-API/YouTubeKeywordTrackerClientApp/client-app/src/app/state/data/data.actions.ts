import { createAction, props } from "@ngrx/store";
import { IEntity } from '../../models/entity';
import { FormGroup } from "@angular/forms";

export enum DataActionTypes {
    // Data fetch
    DataFetch = '[Data] Data fetch request',
    DataFetchById = '[Data] Data fetch by id',
    DataFetchByIdSuccess = '[Data] Data fetch by id success',
    DataFetchSuccess = '[Data] fetch success',
    DataFetchError = '[Data] fetch error',
    DataUpload = '[Data] Data upload request',
    DataUploadSuccess = '[Data] Data upload success',
    DataUploadError = '[Data] Data upload error',
    DataEdit = '[Data] Data edit request',
    DataEditSuccess = '[Data] Data edit success',
    DataEditError = '[Data] Data edit error',
    Delete = '[Data] Delete data request',
    DeleteSuccess = '[Data] Delete data success',
    DeleteError = '[Data] Delete data error'
}

// Data actions
export const fetch = createAction(
    DataActionTypes.DataFetch,
    props<{ endpoint: string }>()
);

export const fetchById = createAction(
    DataActionTypes.DataFetchById,
    props<{ endpoint: string, id: number }>()
)

export const fetchSuccess = createAction(
    DataActionTypes.DataFetchSuccess,
    props<{ collection: IEntity[] }>()
);

export const fetchByIdSuccess = createAction(
    DataActionTypes.DataFetchByIdSuccess,
    props<{ data: IEntity }>()
);

export const fetchError = createAction(
    DataActionTypes.DataFetchError,
    props<{ error: string }>()
);

// Data post actions
export const upload = createAction(
    DataActionTypes.DataUpload,
    props<{ formData: FormGroup, endpoint: string }>()
);

export const uploadSuccess = createAction(
    DataActionTypes.DataUploadSuccess,
    props<{ successMessage: string }>()
);

export const uploadError = createAction(
    DataActionTypes.DataUploadError,
    props<{ errorMessage: string }>()
);
// Data edit actions
export const edit = createAction(
    DataActionTypes.DataEdit,
    props<{ formData: FormGroup, endpoint: string }>()
);

export const editSuccess = createAction(
    DataActionTypes.DataEditSuccess,
    props<{ successMessage: string }>()
);

export const editError = createAction(
    DataActionTypes.DataEditError,
    props<{ errorMessage: string }>()
);
// Data delete actions
export const deleteData = createAction(
    DataActionTypes.Delete,
    props<{ endpoint: string, entity: IEntity }>()
);

export const deleteSuccess = createAction(
    DataActionTypes.DeleteSuccess,
    props<{ successMessage: string }>()
)

export const deleteError = createAction(
    DataActionTypes.DeleteError,
    props<{  errorMessage: string }>()
)