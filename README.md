# Next.js Firebase CRUD Application

This is a simple Next.js application with Firebase authentication (email/password sign-in and sign-up) and Firestore-based product CRUD operations. The application also includes real-time updates using Firebase Firestore.

## Features:
- User Authentication with Firebase (Sign-up, Sign-in, and Log-out)
- Firebase Firestore for product CRUD operations
- Real-time updates for product data
- TailwindCSS for styling
- Realtime data updates when products are added, edited, or deleted

## Setup and Installation

Follow these steps to run the project locally:

### Prerequisites:
Make sure you have the following installed:
- Node.js (v14 or higher)
- npm (or yarn)
- Firebase account

### 1. Clone the Repository
Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/nextjs-firebase-crud.git
cd nextjs-firebase-crud
```
### 2. Install Dependencies
Install the necessary dependencies for the project:

```bash
npm install
   or 
yarn install
```
### 3. Firebase Setup
1. Go to Firebase Console.
2. Create a new Firebase project.
3. Set up Firestore Database by clicking Create Database under the Firestore Database section.
4. Add Authentication methods under the Authentication tab.
5. Enable Email/Password Authentication.

### 4. Start the server
After setting up Firebase and adding your configuration, you can start the Next.js development

```
npm run dev 
   or
yarn dev
```


## How it works:
### Authentication:
- **Sign Up**: The user can sign up with their email and password.
- **Sign In**: The user can sign in with their registered email and password.
- **Log Out**: The user can log out to clear the session

### Product CRUD Operations:

- **Create Product**: The user can add new products by providing details such as name, description, and price.
- **Read Product**: The user can view all the products in a list.
- **Update Product**: The user can edit an existing product's details.
- **Delete Product**: The user can delete a product.

### Real-time Updates
- The product data is stored in Firestore, and any changes made to the products (add, update, delete) are reflected in real-time across all clients connected to the application. 
