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
  title = 'Iglass'; // العنوان الافتراضي
  showNavbar = 'default'; // تحديد نوع الـ Navbar الافتراضي
  showFooter = true; // عرض الـ Footer في جميع الصفحات

  constructor(private router: Router, private titleService: Title) {
    this.setTitle();
    // تعيين العنوان عند تغيير المسار
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      this.setTitle();
      this.toggleNavbarFooter(); // تغيير الـ Navbar و الـ Footer بناءً على المسار
    });
  }

  private setTitle() {
    const currentRoute = this.router.routerState.root.firstChild; // استخدم routerState لجلب المسار الحالي
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
