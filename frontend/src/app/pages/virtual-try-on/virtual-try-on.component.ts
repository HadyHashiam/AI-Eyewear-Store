import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VirtualTryOnService } from '../../services/virtual-try-on.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-virtual-try-on',
  templateUrl: './virtual-try-on.component.html',
  styleUrl: './virtual-try-on.component.css',
})
export class VirtualTryOnComponent {
  title: string = 'Virtual-Try-On';

  constructor(
    private titleService: Title,
    private virtualTryOnService: VirtualTryOnService,
    private router: Router
  ) {
    this.titleService.setTitle(this.title);
  }
  // listen to postRunDetection function in virtualTryOnService and after response Redirect to beststyle with the data in the response
  postRunDetection(): void {
    this.virtualTryOnService.postRunDetection().subscribe(
      (response) => {
        console.log('Response:', response);

        // ✅ بعد وصول الريسبونس، انتقل إلى صفحة bestStyle مع تمرير البيانات
        this.router.navigate(['/bestStyle'], { state: { data: response } });
      },
      (error) => {
        console.error('Error running detection:', error);
      }
    );
  }
}
