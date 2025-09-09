# Suite Manage

<div align="center" style="margin: 30px;">
    <a href="https://refine.dev">
        <img alt="refine logo" src="https://refine.ams3.cdn.digitaloceanspaces.com/readme/refine-readme-banner.png">
    </a>
</div>

Suite Manage is a modern internal tool for managing hotel operations. Built with [Refine](https://github.com/refinedev/refine), this app provides a complete admin dashboard for handling rooms, bookings, staff, guests, and tasks efficiently.

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

## Getting Started

### Install dependencies

````bash
npm install

## Available Scripts

### Running the development server.

```bash
    npm run dev
````

### Building for production.

```bash
    npm run build
```

### Running the production server.

```bash
    npm run start
```

## Learn More

To learn more about **Refine**, please check out the [Documentation](https://refine.dev/docs)

- **NestJS Query Data Provider** [Docs](https://refine.dev/docs/data/packages/nestjs-query/)
- **Ant Design** [Docs](https://refine.dev/docs/ui-frameworks/antd/tutorial/)
- **React Router** [Docs](https://refine.dev/docs/core/providers/router-provider/)
- **Custom Auth Provider** [Docs](https://refine.dev/docs/core/providers/auth-provider/)

## License

MIT
