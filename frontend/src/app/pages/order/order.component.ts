import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  title: string = 'order ';
  items: any[] = []; // Array to store cart items

  constructor(private titleService: Title, private orderService: OrderService) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.loadOrderItems(); // Load cart items on initialization
  }

  loadOrderItems(): void {
    this.orderService.getUserOrders().subscribe(
      (response: any) => {
        console.log(response);
        this.items = response.data; // Store the cart items in the items array
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  cancelOrder(orderId: string): void {
    this.orderService.cancelOrder(orderId).subscribe(
      (response: any) => {
        console.log('Order canceled:', response.message);
        this.loadOrderItems(); // Reload the cart after deletion
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }
}
