import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { CookieService } from './_services/cookie.service';
import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'EJH WebClient';
  themes: string[] = ['light', 'dark'];
  selectedTheme: string = 'light';
  themeMap: Map<string, string> = new Map();
  constructor(private overlayContainer: OverlayContainer, public cookieService: CookieService, private dateAdapter: DateAdapter<Date>) {
    this.themeMap.set('light', 'light-theme');
    this.themeMap.set('dark', 'dark-theme');

    this.dateAdapter.setLocale('ru-RU'); //dd/MM/yyyy;
  }

  ngOnInit(): void {
    this.selectedTheme = this.cookieService.getTheme();
    this.removeThemeClasses();
    this.addThemeClass();
  }

  removeThemeClasses(classPostfix: string = '-theme') {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes(classPostfix));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
  }

  addThemeClass() {
    const themeClass: string = this.cookieService.OS.snapshot(this.cookieService.OS.S.theme)
    this.overlayContainer.getContainerElement().classList.add(themeClass)
  }
  changeTheme() {
    if (this.selectedTheme == 'light')
      this.selectedTheme = 'dark'
    else
      this.selectedTheme = 'light';
    this.cookieService.saveTheme(this.selectedTheme);

    const theme: string | undefined = this.themeMap.get(this.selectedTheme);
    this.cookieService.OS.put(this.cookieService.OS.S.theme, theme);
    this.removeThemeClasses();
    this.addThemeClass();
  }
}
