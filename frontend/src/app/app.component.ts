import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser'; // استيراد Title
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Iglass'; // default title
  showNavbar = 'default'; 
  showFooter = true; 

  constructor(private router: Router, private titleService: Title) {
    this.setTitle();
    // change title to default when navigation changes
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      this.setTitle();
      this.toggleNavbarFooter(); // change navbar and footer when navigation changes
    });
  }

  private setTitle() {
    const currentRoute = this.router.routerState.root.firstChild; // use  routerState to get current route
    const title = currentRoute?.snapshot.data['title'] || this.title; 
    
    this.titleService.setTitle(title); 
  }

  private toggleNavbarFooter() {
    const currentRoute = this.router.url;
 
    
    if (currentRoute.includes('welcome')) {
      this.showNavbar = 'welcome'; 
      this.showFooter = true; 
    } else if (currentRoute.includes('home')) {
      this.showNavbar = 'home'; 
      this.showFooter = true; 
    } else if (currentRoute.includes('contactUs')) {
      this.showNavbar = 'contactUs'; 
      this.showFooter = true; 
    } else if (currentRoute.includes('logout')) {
      this.showNavbar = "false";
      this.showFooter = false; 
    } else if (currentRoute.includes('dashboard')) {
      this.showNavbar = "home";
      this.showFooter = false; 
    } else {
      this.showNavbar = 'default'; 
      this.showFooter = true ;
    }
  }
}
