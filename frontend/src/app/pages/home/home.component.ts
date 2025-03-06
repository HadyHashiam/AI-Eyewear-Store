import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser'; // استيراد Title
import { HomeService } from '../../services/home.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites.service';
// import swiper

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  homeData: any = {};
  products: any[] = [];
  totalCartPrice: number = 0;
  itemsInCart: any[] = [];
  itemsInFav: any[] = [];
  categories = [
    { name: 'Men Eye Glasses' },
    { name: 'Men Sun Glasses' },
    { name: 'Women Eye Glasses' },
    { name: 'Women Sun Glasses' },
    { name: 'Kids Glasses' },
  ];
  title: string = 'Home ';
  constructor(
    private titleService: Title,
    private homeService: HomeService,
    private cartService: CartService,
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private router: Router // Use Router for routing
  ) {
    this.titleService.setTitle(this.title); // set title
  }
  ngOnInit(): void {
    this.loadHomeData();
  }

  loadHomeData(): void {
    this.homeService.getHomeData().subscribe(
      (data) => {
        this.homeData = data;
        this.products = data.products;
        this.totalCartPrice = data.totaCartlPrice;
        this.itemsInCart = data.itemsInCart;
        this.itemsInFav = data.itemsInFav;
      },
      (error) => {
        console.error('Error fetching home data:', error);
      }
    );
  }

  addToCart(product: any): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); // Direct user to login page
      return;
    }

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
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); // Direct user to login page
      return;
    }
    if (product.isFavorite) {
      this.favoritesService.deleteFavItem(product._id).subscribe({
        next: (response) => {
          console.log('Item removed from favorites successfully');
          product.isFavorite = false; // update favorites status on front end immediately
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
          product.isFavorite = true; // Modify the state on the front end directly
        },
        error: (error) => {
          console.error('Failed to add item to favorites:', error);
        },
      });
    }
  }

  getProductsByCategory(categoryName: string): any[] {
    return this.products.filter((product) => product.category === categoryName);
  }
}
