# Job App Tracker 📋

Job App Tracker is a modern web application built with **Angular 16** to help users track their job applications efficiently. The project integrates **Firebase** for backend services, including authentication and a Firestore database. It is fully containerized with **Docker**, uses **Node.js 22**, and includes **Kubernetes manifests** for scalable deployments.  

📍 **Repository**: [Job App Tracker on GitHub](https://github.com/Job-App-Tracker-Efrei/angular)  

---

## ✨ Features

- **Job Tracking**: Add, update, and delete job applications.  
- **User Authentication**: Secure user login and registration via **Firebase Authentication**.  
- **Cloud Database**: Persistent storage and real-time updates using **Firestore**.  
- **Responsive UI**: Built with **TailwindCSS**, optimized for all screen sizes.  
- **Dockerized Deployment**: Simplified deployment with Docker, running on port `8080`.  
- **Kubernetes Ready**: Kubernetes manifests provided for cloud scalability.  

---

## 🛠️ Technologies Used

- **Frontend**: Angular 16  
- **Styling**: TailwindCSS  
- **Backend**: Firebase (Authentication and Firestore Database)  
- **Node.js**: v22  
- **Package Manager**: Yarn  
- **Containerization**: Docker (port `8080`)  
- **Orchestration**: Kubernetes  

---

## 📦 Installation and Setup

### Prerequisites

Ensure the following are installed on your system:  
- **Node.js** (v22+)  
- **Yarn** (v1.22+)  
- **Docker** (v24+)  
- **Kubernetes** (kubectl & Minikube or an active cluster)  

### Steps to Run Locally

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Job-App-Tracker-Efrei/angular.git
   cd angular
   ```

2. **Install Dependencies**  
   ```bash
   yarn install
   ```

3. **Run the Angular App**  
   ```bash
   yarn start
   ```
   The app will be accessible at `http://localhost:4200`.  

---

## 🐳 Running with Docker

1. **Build the Docker Image**  
   ```bash
   docker build -t job-app-tracker:latest .
   ```

2. **Run the Docker Container**  
   ```bash
   docker run -p 8080:80 job-app-tracker:latest
   ```
   The application will be available at `http://localhost:8080`.  

---

## ☸️ Deploying with Kubernetes

1. **Apply Kubernetes Manifests**  
   ```bash
   kubectl apply -f k8s/
   ```

2. **Access the Application**  
   Configure your Kubernetes service or ingress to expose the application, typically on port `8080` for Docker-based deployments.  

---

## 🤝 Contributors

This project is developed and maintained by:  
- **Nolan**  
- **Aymene**  
- **Chahine**  

---

Let me know if you need further refinements! 🚀