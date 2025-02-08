# IGlass — AI-Eyewear Store

An innovative eCommerce platform that leverages AI and deep learning to provide personalized eyewear recommendations. Users can upload photos to receive suggestions based on their face shape and style. The platform also offers a virtual try-on feature powered by Snapchat’s AR technology for an immersive shopping experience.

The AI model for face shape detection is built using **YOLOv8** and **OpenCV** to ensure accurate and personalized recommendations.

---

## 🚀 Features

- **AI-Based Recommendations:** Upload your photo, and the platform will suggest the best glasses for your face shape using YOLOv8 and OpenCV.
- **Virtual Try-On:** Experience real-time virtual try-on using Snapchat's AR technology.
- **E-commerce Functionality:**  
  - User registration, login, and profile management.
  - Browse a wide selection of glasses: men's, women's, kids', prescription, and sunglasses.
  - Add products to cart or favorites.
  - Secure payment integration via **Stripe**.
  - Automated order status updates via **Stripe Webhooks**.
- **Face Shape Classification:** The AI model classifies faces into five categories:
  - Heart, Oblong, Oval, Square, Round.
- **Session Management:** Keep track of user activities using **Express-Session** and **JWT** for secure authentication.

---

## 🔧 Tech Stack

### Frontend
- **Angular**
- **HTML**, **CSS**, **Bootstrap**

### Backend
- **Node.js**, **Express.js**, **MongoDB**
- **Bcrypt** for password hashing
- **JWT** for secure token-based authentication
- **Multer** for handling file uploads
- **Child_Process** for executing AI model scripts
- **Express-Validator** for input validation
- **Express-Session** & **Connect-Flash** for session management and user feedback
- **Nodemailer** for email notifications
- **Stripe** & **Webhooks** for secure payment processing

### Deep Learning & AI
- **YOLOv8** for face detection and classification
- **OpenCV** for image processing

### Virtual Try-On
- **Snapchat** AR technology for real-time virtual eyewear fitting

---

## 🔄 Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** >= 16.x
- **Python** >= 3.12.0 (64-bit)
- **MongoDB** (for local development)

---

## 🔄 Installation & Setup

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/yourusername/IGlass.git
   cd IGlass
   ```

2. **Backend Setup:**  
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and add the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     STRIPE_SECRET_KEY=your_stripe_secret_key
     SNAPCHAT_API_KEY=your_snapchat_api_key
     ```
   - Run the server:
     ```bash
     npm start
     ```

3. **Frontend Setup:**  
   - Navigate to the frontend folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the Angular app:
     ```bash
     ng serve
     ```

---

## 🔄 Usage

1. **Register/Login:** Create an account or log in.
2. **Browse Products:** Explore various eyewear categories (men’s, women’s, kids’, prescription, sunglasses).
3. **AI Recommendation:** Upload your photo to get personalized glasses recommendations.
4. **Virtual Try-On:** Use Snapchat’s AR to virtually try on glasses.
5. **Add to Cart & Checkout:** Secure payment through Stripe and track your orders.

---

## 🖼️ Screenshots



---

## 📅 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

1. Fork the repo.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

---

## 👥 Contact

For any inquiries or support:

**Hady Hashim Abd El-Azim**  
Junior Backend Developer  
Email: [Hadyhashim17@gmail.com]  
GitHub: [https://github.com/HadyHashiam](https://github.com/HadyHashiam)  
LinkedIn: [https://www.linkedin.com/in/hady-hashim-09a9a022a/](https://www.linkedin.com/in/hady-hashim-09a9a022a/)

---




