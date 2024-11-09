# BeautyBook System 

## Tech Stack

- **Frontend**: ReactJS
- **Backend**: ExpressJS
- **Deployment**: Docker
- **ORM**: Prisma
- **Database**: MySQL
- **File Uploads**: Multer
- **Authentication**: JWT
- **State Management**: Redux

## Description

**BeautyBook** is an advanced system for managing beauty services. It allows users to book appointments with service providers in areas such as:

- **Hair Specialist**
- **Makeup Artist**
- **Skincare Specialist**
- **Beauty Therapist**

### Main Features:

- **For Users**: 
  - **Book appointments** with service providers.
  - **Choose services** (e.g., hair styling, makeup, skincare).
  - **View booking status** in the user profile page after booking.

- **For Service Providers**:
  - **Add appointments and services**.
  - **View a list of customers** who have booked appointments.

### Technologies Used:
- **Multer**: For handling file uploads (e.g., images of service providers).
- **JWT**: For managing authentication and securing access.
- **Redux**: For managing the state of the application on the frontend.

---

## Features

### Frontend (ReactJS)
- **Main Pages**: User profile page and service provider page.
- **Appointment and Service Booking**: Allows users to book appointments with service providers.
- **Booking Status**: Displays the booking status on the user profile page after an appointment is made.
- **State Management with Redux**: Redux is used for managing state throughout the application, ensuring smooth data flow between components.
- **Performance Optimization**: The application is optimized to handle large datasets and provide a seamless user experience.

### Backend (ExpressJS)
- **Appointment and Service Management**:
  - Add, update, and delete appointments and services.
  - View a list of services and appointments.
- **Authentication**:
  - **JWT** is used for authentication and ensuring secure access to data.
- **Data Management with Prisma**: Efficient interaction with the MySQL database using Prisma.
- **Appointment Management**: Allows service providers to add and manage appointments.
- **PDF Reports**: Generates PDF reports for all appointments.

### Docker
- **Docker Containers**: Both the frontend and backend applications are containerized using Docker to simplify deployment and ensure environment consistency across systems.

---
