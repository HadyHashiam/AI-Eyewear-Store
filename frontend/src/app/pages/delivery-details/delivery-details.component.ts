import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service'; 

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.css'],
})
export class DeliveryDetailsComponent implements OnInit {
  deliveryData = {
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
    email: '',
    image: '',
    productId: '',
  };
  cartId: string = '';
  price: number = 0;
  productName: string = '';
  amount: number = 0;
  productId: string = '';
  image: string = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    // Get basket data from link
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.cartId = params['cartId'];
      this.price = params['price'];
      this.productName = params['name'];
      this.amount = params['amount'];
      this.productId = params['productId'];
      this.image = params['image'];
    });
  }

  submitDeliveryDetails(): void {
// Add logic to send request data and other data to the backend
    const orderData = {
      cartId: this.cartId,
      price: this.price,
      title: this.productName,
      amount: this.amount,
      image: this.image,
      productId: this.productId,
      address: this.deliveryData.address,
      username: this.deliveryData.name,
      phone: this.deliveryData.phone,
      email: this.deliveryData.email,
      city: this.deliveryData.city,
      state: this.deliveryData.state,
      zip: this.deliveryData.zip,
      country: this.deliveryData.country,
    };

    this.orderService.checkout(orderData).subscribe(
      (response) => {
        console.log(response);
        // Redirect user to payment page
        window.location.href = response.url;
      },
      (error) => {
        console.error(error);
      }
    );
    console.log('the function is ts that call the API End from angular');
  }
}


