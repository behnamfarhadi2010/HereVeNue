# Online Venue Booking

HereVeNue is a comprehensive online venue platform connecting venue owners with people looking for the perfect space for their events. Whether it's a wedding, corporate meeting, or private party, HereVeNue makes it easy to discover, book, and manage venue listings.

## Features

### For Users (Clients)

- **Venue Discovery:** Browse venues with an interactive map view and detailed lists.
- **Advanced Filtering:** Filter venues by type, capacity, price, and amenities.
- **Direct Messaging:** Chat directly with venue hosts to ask questions and negotiate.
- **Booking System:** Request bookings for specific dates and times.
- **Favorites:** Save venues to your wishlist for later.

### For Venue Owners

- **Dashboard:** A dedicated dashboard to manage your venues and requests.
- **Listing Management:** Add, edit, and delete venue listings with ease.
- **Request Management:** View and respond to booking inquiries.
- **Messaging:** Communicate with potential clients in real-time.

### Core Functionality

- **User Authentication:** Secure login and registration for different user roles (Client, Venue Owner, Admin).
- **Interactive Maps:** Integrated with Leaflet for location-based venue search.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Email Notifications:** Automated email notifications for booking requests using EmailJS.

## 🛠️ Tech Stack

- **Frontend:** [React](https://reactjs.org/) (v18+)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Maps:** [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
- **Email Services:** [EmailJS](https://www.emailjs.com/) (for notifications)
- **State Management:** React Context API
- **Styling:** CSS3 (Custom styles)
- **Icons:** React Icons

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/ovp.git
    cd ovp
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

```
src/
├── components/         # Reusable UI components (Header, Footer, Cards, etc.)
├── contexts/           # React Context definitions (Auth, Message, Venue, etc.)
├── hooks/              # Custom React hooks (useMessages, etc.)
├── pages/              # Main page components (Home, Dashboard, Login, etc.)
├── styles/             # CSS stylesheets
├── utils/              # Utility functions (formatting, helpers)
├── App.jsx             # Main application component
└── main.jsx            # Entry point
```

## 📂 Login Information

As a user :

Username: **Admin**

Pass: **123**

As an Owner :

Username: **owner**

Pass: **owner123**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 Credits

My coach, **D.J. Rideout**, has been an incredible mentor throughout this development journey. His guidance was essential in helping me overcome complex challenges and his technical expertise provided clarity when I needed it most. Beyond teaching me valuable skills, he showed me how to persevere; celebrating successes together during our coding sessions and offering steady encouragement during difficult moments. I'm truly thankful for his support. This project wouldn't be what it is without his influence and guidance.
I also want to give a huge shoutout to GetBuilding for this amazing opportunity to join their awesome community! Massive thanks to the dynamic duo **sahand** and **Jan**. You've built an incredible community and I'm honored to be part of it.
