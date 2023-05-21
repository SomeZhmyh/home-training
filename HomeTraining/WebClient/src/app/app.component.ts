import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { StorageService } from './_services/storage.service';
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
  constructor(private overlayContainer: OverlayContainer, public storageService: StorageService, private dateAdapter: DateAdapter<Date>) {
    this.themeMap.set('light', 'light-theme');
    this.themeMap.set('dark', 'dark-theme');

    this.dateAdapter.setLocale('ru-RU'); //dd/MM/yyyy;
  }

  ngOnInit(): void {
    this.selectedTheme = this.storageService.getTheme();
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
    const themeClass: string = this.storageService.OS.snapshot(this.storageService.OS.S.theme)
    this.overlayContainer.getContainerElement().classList.add(themeClass)
  }
  changeTheme() {
    if (this.selectedTheme == 'light')
      this.selectedTheme = 'dark'
    else
      this.selectedTheme = 'light';
    this.storageService.saveTheme(this.selectedTheme);

    const theme: string | undefined = this.themeMap.get(this.selectedTheme);
    this.storageService.OS.put(this.storageService.OS.S.theme, theme);
    this.removeThemeClasses();
    this.addThemeClass();
  }
}
