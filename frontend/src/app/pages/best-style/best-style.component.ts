import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser'; // استيراد Title
import { HomeService } from '../../services/home.service';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-best-style',
  templateUrl: './best-style.component.html',
  styleUrl: './best-style.component.css',
})
export class BestStyleComponent {
  receivedData: any;
  title: string = 'Best Style'; // قم بتحديد العنوان الافتراضي هنا
  categories = [
    { name: 'Men Eye Glasses' },
    { name: 'Men Sun Glasses' },
    { name: 'Women Eye Glasses' },
    { name: 'Women Sun Glasses' },
  ];

  constructor(
    private router: Router,
    private titleService: Title,
    private homeService: HomeService,
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) {
    this.titleService.setTitle(this.title); // تعيين عنوان الصفحة
    const navigation = this.router.getCurrentNavigation();
    this.receivedData = navigation?.extras.state?.['data'] || null;
  }

  // دالة للتحقق إذا كان المنتج خاصًا بالرجال
  // دالة للتحقق إذا كان المنتج خاصًا بالرجال بناءً على الفئة
  isMenProduct(product: any): boolean {
    return product.category.includes('Men');
  }

  // دالة للتحقق إذا كان المنتج خاصًا بالنساء بناءً على الفئة
  isWomenProduct(product: any): boolean {
    return product.category.includes('Women');
  }

  addToCart(product: any): void {
    if (product.isInCart) return;
    this.cartService
    .addToCart({
      name: product.title,
      price: product.price,
      image: product.image,
      productId: product._id,
    })
    .subscribe({
      next: (result) => {
        product.isInCart = true;
        console.log('Product added to cart successfully:', result);
      },
      error: (error) => {
        console.error('Error adding item to cart:', error);
      },
    });
  }

  toggleFavorite(product: any): void {
    if (product.isFavorite) {
      this.favoritesService.deleteFavItem(product._id).subscribe({
        next: (response) => {
          console.log('Item removed from favorites successfully');
          product.isFavorite = false; // تعديل الحالة على الواجهة الأمامية مباشرة
        },
        error: (error) => {
          console.error('Failed to remove item from favorites:', error);
        },
      });
    } else {
      this.favoritesService
      .addToFavorites({
        name: product.title,
        price: product.price,
        image: product.image,
        productId: product._id,
      })
      .subscribe({
        next: (response) => {
          console.log('Item added to favorites successfully');
          product.isFavorite = true; // تعديل الحالة على الواجهة الأمامية مباشرة
        },
        error: (error) => {
          console.error('Failed to add item to favorites:', error);
        },
      });
    }
  }
}
