import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { map } from "rxjs/operators";
import { displaySuccess, displayWarning, displayError } from "../action/notification.action";

@Injectable()
export class NotificationEffects {
    displaySuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(displaySuccess),
                map(action => {
                    this.toastr.success(action.description, action.title);
                })
            ),
        { dispatch: false }
    );

    displayWarning$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(displayWarning),
                map(action => {
                    this.toastr.warning(action.description, action.title);
                })
            ),
        { dispatch: false }
    );

    displayError$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(displayError),
                map(action => {
                    this.toastr.error(action.description, action.title);
                })
            ),
        { dispatch: false }
    );

    constructor(private actions$: Actions, private toastr: ToastrService) { }
}