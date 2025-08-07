import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {Router} from '@angular/router';
import {inject} from '@angular/core';

export interface User {
  email: string,
  name: string,
  role?: string;
  image?: string
}

type AppState = {
  user: User | undefined;
}

export const initialState: AppState = {
  user: undefined
}

export const AppStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, router = inject(Router)) => ({
    login: () => {
      patchState(store, {user: {email: 'uHt8R@example.com', name: 'John Doe', role: 'admin', image: './avatar.png'}})
      router.navigate(['/dashboard'])
    },
    logout: () => {
      patchState(store, {user: undefined})
      router.navigate(['/login'])
    }
  }))
)
