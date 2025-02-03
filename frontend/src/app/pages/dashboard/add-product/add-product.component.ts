import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  faceShapes = [
    { label: 'Oval', value: 'Oval' },
    { label: 'Round', value: 'Round' },
    { label: 'Square', value: 'Square' },
    { label: 'Oblong', value: 'Oblong' },
    { label: 'Heart', value: 'Heart' },
  ];
  previewImage: string | ArrayBuffer | null = null;
  currentPage: string = '';

  selectedFaceShapes: string[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.currentPage = this.router.url.split('/')[1]; // استخراج اسم الصفحة الحالية
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.previewImage = URL.createObjectURL(file);
      const input = event.target;
      const label = input.nextElementSibling;
      if (label) {
        label.innerText = file.name;
      }
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log(form.value);
      // هنا يمكنك إرسال البيانات إلى الخادم أو إضافة المنتج
    } else {
      alert('Please fill in all fields.');
    }
  }
}
