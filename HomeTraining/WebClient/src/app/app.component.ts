import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from './_services/cookie.service';
import { DateAdapter } from '@angular/material/core';
import { CdTimerComponent } from 'angular-cd-timer';

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

  @ViewChild('basicTimer') timer: CdTimerComponent;

  constructor(private overlayContainer: OverlayContainer, public cookieService: CookieService, private dateAdapter: DateAdapter<Date>) {
    this.themeMap.set('light', 'light-theme');
    this.themeMap.set('dark', 'dark-theme');

    this.dateAdapter.setLocale('ru-RU'); //dd/MM/yyyy;
  }

  ngOnInit(): void {
    this.selectedTheme = this.cookieService.getTheme();
    this.removeThemeClasses();
  }

  removeThemeClasses(classPostfix: string = '-theme') {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes(classPostfix));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
  }


  timerGetValue() {

    let a = this.timer.get();
    let i = a.minutes + a.seconds / 60;
    alert(i.toFixed(2));
  }

  alala(event: any) {
    switch (event.value) {
      case 'start':
        this.timer.start();
        break;
      case 'stop':
        this.timer.stop();
        break;
      case 'resume':
        this.timer.resume();
        break;
     
    }
  }
}
