import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  title: string = 'Cart';
  items: any[] = []; // Array to store cart items

  constructor(private titleService: Title, private cartService: CartService) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.loadCartItems(); // Load cart items on initialization
  }

  loadCartItems(): void {
    this.cartService.getUserCart().subscribe(
      (response: any) => {
        // console.log(response);
        this.items = response.data; // Store the cart items in the items array
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }
  saveItem(cartId: string, amount: number): void {
    if (!cartId || !amount || amount <= 0) {
      console.error('Invalid cartId or amount');
      return;
    }
    // console.log('Saving cart item:', { cartId, amount });
    this.cartService.saveCartItem(cartId, amount).subscribe(
      (response: any) => {
        console.log('Item updated:', response.message);
        this.loadCartItems(); // تحديث العناصر في الصفحة
      },
      (error) => {
        console.error('Error saving item:', error);
      }
    );
  }

// verifyOrder(cartId: string): void {
//   this.cartService.getDeliveryDetails(cartId).subscribe(
//     (response: any) => {
//       console.log('Delivery Details:', response);
//       window.location.href = `/deliveryDetails?order=${cartId}`;
//     },
//     (error) => {
//       console.error('Error fetching delivery details:', error);
//     }
//   );
// }


  deleteItem(cartId: string): void {
    this.cartService.deleteCartItem(cartId).subscribe(
      (response: any) => {
        console.log('Item deleted:', response.message);
        this.loadCartItems(); // Reload the cart after deletion
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }
}
