// delivery.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service'; // افترض وجود خدمة للتعامل مع السلة
import { OrderService } from '../../services/order.service'; // افترض وجود خدمة لإرسال الطلبات
import { AuthService } from '../../services/auth.service'; // افترض وجود خدمة للمصادقة

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
    // الحصول على بيانات السلة من الرابط
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
    // إضافة المنطق لإرسال بيانات الطلب والبيانات الأخرى للـ Backend
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
        // إعادة توجيه المستخدم إلى صفحة الدفع
        window.location.href = response.url;
      },
      (error) => {
        console.error(error);
      }
    );
    this.orderService.getSuccess(orderData).subscribe((response) => {
      console.log(response);
    });
  }
}
