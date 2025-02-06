# **IGlass** 👓✨

**IGlass** is an innovative AI-driven platform that offers **personalized eyewear recommendations** based on users' face shapes and styles. By utilizing **deep learning** models and **virtual try-on** technology via **Snapchat**, users can upload their photos, get suggestions, and even try on glasses virtually for a seamless and interactive shopping experience.

---

## **🚀 Features**

- **AI-Based Recommendations:** Upload your photo, and the platform will suggest the best glasses for your face shape using **YOLOv8** and **OpenCV**.
- **Virtual Try-On:** Experience real-time virtual try-on using **Snapchat's** AR technology.
- **E-commerce Functionality:** 
  - User registration, login, and profile management.
  - Add products to **cart** or **favorites**.
  - Secure **Stripe payment integration**.
  - Automated order status updates via **Stripe Webhooks**.
- **Face Shape Classification:** The system classifies faces into five categories:
  - **Heart**, **Oblong**, **Oval**, **Square**, **Round**.
- **Session Management:** Keep track of user activities with **Express-Session** and **JWT**.

---

## **🛠️ Tech Stack**

### **Frontend:**
- **Angular** | **HTML** | **CSS** | **Bootstrap**

### **Backend:**
- **Node.js** | **Express.js** | **MongoDB**
- **Body-Parser** | **Bcrypt** | **JWT** | **Multer**
- **Child_Process** for integrating Python AI models
- **Express-Validator** | **Express-Session** | **Connect-Flash**
- **Nodemailer** for email notifications
- **Stripe** for payment processing and **Stripe Webhook** for real-time updates

### **Deep Learning & AI:**
- **YOLOv8** (for face detection & classification)
- **OpenCV** (image processing)
- Python (version **3.12.0 64-bit** required for AI model execution)

### **Virtual Try-On:**
- **Snapchat Lens Studio** for augmented reality experiences

---
### Prerequisites

- Node.js >= 16.x
- Python >= 3.12.0 (64-bit)
- MongoDB (for local development)
---

## **📂 Project Structure**
Iglass/
├── frontend/           # Angular frontend
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js       # Main backend server file
│   └── config/
├── ai-model/           # YOLOv8 and Python scripts for face shape detection
├── public/             # Static files
└── README.md

---

## **⚙️ Installation & Setup**

### **Prerequisites:**
- **Node.js** (v16+)
- **MongoDB** (running locally or via MongoDB Atlas)
- **Python 3.12.0 64-bit** (for AI model integration)
---
### **1. Clone the Repository:**

```bash
git clone https://github.com/your-username/Iglass.git
cd Iglass
```
---
# Install backend dependencies
npm install
---
# Navigate to frontend and install dependencies
cd frontend
npm install
---

## **Configure Environment Variables**

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
---
## **Run the Applications**

# Start the backend server
npm run start:dev
---
# In another terminal, navigate to the frontend folder
cd frontend
ng serve
---
## ** AI Model Integration**
The AI model for face shape detection is built using YOLOv8 and OpenCV.
---
Running the AI Model:
1-Ensure Python 3.12.0 64-bit is installed.
2-Install the required Python libraries:


