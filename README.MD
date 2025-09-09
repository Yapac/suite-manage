# Suite Manage

<div align="center" style="margin: 30px;">
    <img alt="refine logo" src="./banner.png">
</div>
<br/>
Suite Manage is a modern internal tool for managing hotel operations.
This app provides a complete admin dashboard for handling rooms, bookings, staff, guests, and tasks efficiently.

---

## Features

- **Room Management** – Add, edit, and track hotel rooms, including room types and pricing.
- **Booking Management** – Create and manage guest bookings with automatic price estimation based on room and stay duration.
- **Guest Management** – Maintain guest records with document types, contact info, and booking history.
- **Staff Management** – Manage hotel staff roles, including admin, receptionist, housekeeping, and maintenance.
- **Task Management** – Assign tasks to staff, track status, and link tasks to rooms when necessary.
- **Access Control** – Role-based access: e.g., only admins and receptionists can manage bookings, while other roles have restricted access.
- **Notifications & Live Updates** – Real-time updates using GraphQL subscriptions.
- **Responsive Design** – Fully mobile-friendly interface.

---

## Tech Stack

- **Frontend:** React + [Refine](https://refine.dev) + Ant Design
- **Backend:** NestJS + GraphQL + Mongoose (MongoDB)
- **State & Data Management:** Refine hooks + GraphQL queries/mutations
- **Authentication:** Custom Auth Provider with role-based access control
- **Real-time:** GraphQL subscriptions with PubSub for live updates

---

## Learn More

⚠️ Disclaimer: Suite Manage is currently a proof-of-concept project.
For a full-fledged SaaS solution tailored to your needs, reach out to me at yassinelatlassi@gmail.com.
