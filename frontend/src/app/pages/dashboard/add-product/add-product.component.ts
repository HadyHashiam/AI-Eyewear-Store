import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddProductService } from '../../../services/add-product.service';

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
  selectedFile: File | null = null;
  constructor(
    private router: Router,
    private addProductService: AddProductService
  ) {}
  ngOnInit() {
    this.currentPage = this.router.url.split('/')[1]; // get the current page
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // save the selected file to use it in the form submission
      this.previewImage = URL.createObjectURL(file); // display the image in the UI
      const input = event.target;
      const label = input.nextElementSibling;
      if (label) {
        label.innerText = file.name;
      }
    }
  }

  onSubmit(form: any) {
    if (form.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('code', form.value.code);
      formData.append('title', form.value.name);
      formData.append('price', form.value.price);
      formData.append('description', form.value.description);
      formData.append('category', form.value.category);
      formData.append('Quantity', form.value.Quantity);
      formData.append('face_shape', JSON.stringify(form.value.face_shape)); // convert the array to a string and append it to the form data object
      formData.append('image', this.selectedFile);

      const formDataObj: Record<string, any> = {};
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      console.log(formDataObj);
      this.addProductService.AddProduct(formData).subscribe({
        next: (response) => {
          console.log('Product added successfully:', response);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error adding product:', err);
        },
      });
    } else {
      alert('Please fill in all fields and select an image.');
    }
  }
}
