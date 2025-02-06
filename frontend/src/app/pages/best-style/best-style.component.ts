import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { Title } from '@angular/platform-browser'; 
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
  title: string = 'Best Style';
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
    this.titleService.setTitle(this.title);
    const navigation = this.router.getCurrentNavigation();
    this.receivedData = navigation?.extras.state?.['data'] || null;
  }

  // Function to check if the product is for men
  isMenProduct(product: any): boolean {
    return product.category.includes('Men');
  }

  // Function to check if the product is for women
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
          product.isFavorite = false;  // Modify the state on the front end directly
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
          product.isFavorite = true; 
        },
        error: (error) => {
          console.error('Failed to add item to favorites:', error);
        },
      });
    }
  }
}
