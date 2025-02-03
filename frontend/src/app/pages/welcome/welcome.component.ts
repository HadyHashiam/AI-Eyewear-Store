import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // تأكد من استيراد RouterModule
import { Title } from '@angular/platform-browser'; // استيراد Title

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  title: string = 'welcome '; // قم بتحديد العنوان الافتراضي هنا
  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title); // تعيين عنوان الصفحة
  }
}
