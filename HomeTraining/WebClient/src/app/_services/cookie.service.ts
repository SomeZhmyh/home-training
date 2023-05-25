import { Injectable } from '@angular/core';
import { KeyObsValueReset, ObsValueReset, OStore, OStoreStart } from '@fireflysemantics/slice';
import { Observable } from 'rxjs';
const USER_KEY = 'auth-user';
const THEME = 'theme';

interface ISTART extends KeyObsValueReset {
  theme: ObsValueReset
}

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor() { }

  START: OStoreStart = {
    theme: { value: this.getTheme() + '-theme' }
  }
  public OS: OStore<ISTART> = new OStore(this.START)
  public selectedTheme$: Observable<string> = this.OS.S.theme.obs


  clean(): void {
    window.sessionStorage.clear();
  }
  public saveTheme(theme: string) {

    window.sessionStorage.removeItem(THEME);
    window.sessionStorage.setItem(THEME, theme);
  }

  public getTheme(): any {
    const theme = window.sessionStorage.getItem(THEME);
    if (theme) {
      return theme;
    }
    return 'light';
  }


  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  public getUserToken(): string {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user)['token'];
    }
    return "";
  }
  public getUserId(): number {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user)['id'];
    }
    return 0;
  }
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
