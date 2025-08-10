import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, tap} from 'rxjs';

export interface User {
  email: string,
  name: string,
  role?: string;
  image?: string
}

type AppState = {
  user: User | undefined;
  loading: boolean;
}

export const initialState: AppState = {
  user: undefined,
  loading: false
}

export const AppStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((
    store,
    snackbar = inject(MatSnackBar),
    router = inject(Router)) => ({
    login: () => {
      try {
        patchState(store, {loading: true})
        patchState(store, {user: {email: 'uHt8R@example.com', name: 'John Doe', role: 'admin', image: './avatar.png'}})
        snackbar.open('Login successful', 'Close', {duration: 3000})
        router.navigate(['/dashboard'])
      } catch (error) {
        snackbar.open('Login failed', 'Close', {duration: 3000})
      } finally {
        patchState(store, {loading: false})
      }
    },
    logout: () => {
      patchState(store, {user: undefined})
      router.navigate(['/login'])
    },
    startLoading: () => {
      patchState(store, {loading: true})
    },
    stopLoading: () => {
      patchState(store, {loading: false})
    },
    loaderOnNavigation: rxMethod<any>(pipe(
      tap((event) => {
        if (event instanceof NavigationStart) {
          patchState(store, {loading: true})
        }
        if (event instanceof NavigationEnd || event instanceof NavigationError) {
          patchState(store, {loading: false});
        }
      })
    ))
  })),
  withHooks((store, router = inject(Router)) => ({
    onInit() {
      store.loaderOnNavigation(router.events)
    }
  }))
);
