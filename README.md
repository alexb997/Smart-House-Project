# Smart Home Automation System

## Project Overview

The _Smart Home Automation System_ is a web application that simulates a smart home environment. The project features a React-based frontend and a Java (Spring Boot) backend. The system allows users to monitor and control smart devices such as lights, air conditioners, and security cameras through a central hub. The frontend communicates with the backend via RESTful APIs to manage device states and handle asynchronous device operations using multithreading.

## Key Features

### Frontend (React)

- **Device Control Dashboard**: Displays all smart devices and their statuses, providing control options for each device.
- **REST API Integration**: Communicates with the backend using HTTP requests (GET, POST, PUT) to fetch device status and control them.
- **Real-Time Status Updates** (Optional): Implements real-time updates using WebSockets for devices like security cameras or motion detectors.
- **Error Handling**: Gracefully handles errors, displaying messages if the device fails to respond or if there’s a problem with the backend connection.

### Backend (Spring Boot)

- **REST API Design**: Exposes APIs to manage devices. Allows the frontend to control devices, monitor their status, and receive updates.
- **Device Management**: Manages devices using multithreading to simulate real-world asynchronous behavior.
- **Database Integration** (Optional): Uses a database (e.g., MySQL or PostgreSQL) to persist device states.

## Tech Stack

### Frontend

- **React.js**
- **Axios** (for HTTP requests)
- **Material-UI** or **Bootstrap** (for UI components)
- **WebSockets** (optional for real-time communication)

### Backend

- **Spring Boot** (REST APIs)
- **Multithreading** for device simulations
- **Hibernate/JPA** (optional for database integration)
- **Spring Security** (optional for authentication)

### Database (Optional)

- **MySQL** or **PostgreSQL** (for device state persistence)

## Getting Started

### Frontend

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/smart-home-frontend.git
   cd smart-home-frontend

   ```

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/todo_list.git
   cd todo_list
   ```

## Project Structure

- **/smarthome-frontend**: Contains the Spring Boot backend with RESTful APIs for managing smart devices.
- **/smarthouse-backend**: Contains the React frontend with components for displaying and controlling smart devices.

## Project Design
- https://www.figma.com/design/6uKS1tDQjdEM01S2CkBI9o/Smart-House

## Usage

### Access the Frontend

Visit [http://localhost:3000](http://localhost:3000) to access the frontend.

### API Endpoints

- **GET /api/devices**: Fetch all devices in the smart home system.
- **GET /api/devices/{deviceId}**: Fetch a single device by its ID.
- **POST /api/devices/{deviceId}/control**: Turn a device on or off.
