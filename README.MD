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
- **Availability Checks** – Rooms are automatically checked when creating bookings; rooms under maintenance or with overlapping bookings are disabled.
---

## Tech Stack

- **Frontend:** React + Refine + Ant Design
- **Backend:** NestJS + GraphQL + Mongoose (MongoDB)
- **State & Data Management:** Refine hooks + GraphQL queries/mutations
- **Authentication:** Custom Auth Provider with role-based access control
- **Real-time:** GraphQL subscriptions with PubSub for live updates

---

## Licensing Reminder

This repository is shared without an open-source license.  
Viewing the code is possible if you have access, but **no one has legal permission to copy, distribute, or use it beyond GitHub’s interface** without explicit written consent from the owner.

## Learn More

⚠️ Disclaimer: Suite Manage is currently a proof-of-concept project.
For a full-fledged SaaS solution tailored to your needs, reach out to me at [yassinelatlassi@gmail.com].

```
suite-manage
├─ banner.png
├─ client
│  ├─ .eslintrc.cjs
│  ├─ .npmrc
│  ├─ Dockerfile
│  ├─ index.html
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ hotel-bell.png
│  │  ├─ icons
│  │  │  ├─ double.png
│  │  │  ├─ family.png
│  │  │  ├─ single.png
│  │  │  └─ suite.png
│  │  └─ _redirects
│  ├─ src
│  │  ├─ App.tsx
│  │  ├─ components
│  │  │  ├─ accordion.tsx
│  │  │  ├─ custom-avatar.tsx
│  │  │  ├─ form
│  │  │  │  ├─ description.tsx
│  │  │  │  ├─ header.tsx
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ room.tsx
│  │  │  │  ├─ status.tsx
│  │  │  │  ├─ title.tsx
│  │  │  │  └─ users.tsx
│  │  │  ├─ home
│  │  │  │  ├─ deals-chart.tsx
│  │  │  │  ├─ ongoing-bookings.tsx
│  │  │  │  ├─ total-count-card.tsx
│  │  │  │  └─ upcoming-tasks.tsx
│  │  │  ├─ index.ts
│  │  │  ├─ layout
│  │  │  │  ├─ account-settings
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ current-user.tsx
│  │  │  │  ├─ header.tsx
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ layout.css
│  │  │  ├─ skeleton
│  │  │  │  ├─ accordion-header.tsx
│  │  │  │  ├─ kanban.tsx
│  │  │  │  ├─ latest-activities.tsx
│  │  │  │  ├─ project-card.tsx
│  │  │  │  └─ upcoming-tasks.tsx
│  │  │  ├─ tasks
│  │  │  │  └─ kanban
│  │  │  │     ├─ add-card-button.tsx
│  │  │  │     ├─ board.tsx
│  │  │  │     ├─ card.tsx
│  │  │  │     ├─ column.tsx
│  │  │  │     └─ item.tsx
│  │  │  ├─ text-icon.tsx
│  │  │  ├─ text.tsx
│  │  │  └─ user-tag.tsx
│  │  ├─ config
│  │  │  └─ resources.tsx
│  │  ├─ context
│  │  │  └─ AppContext.tsx
│  │  ├─ index.tsx
│  │  ├─ pages
│  │  │  ├─ booking
│  │  │  │  ├─ create.tsx
│  │  │  │  ├─ edit.tsx
│  │  │  │  └─ list.tsx
│  │  │  ├─ forgotPassword
│  │  │  │  └─ index.tsx
│  │  │  ├─ home
│  │  │  │  └─ index.tsx
│  │  │  ├─ index.ts
│  │  │  ├─ login
│  │  │  │  └─ index.tsx
│  │  │  ├─ notFound
│  │  │  │  └─ index.tsx
│  │  │  ├─ pastBookings
│  │  │  │  ├─ list.tsx
│  │  │  │  └─ show.tsx
│  │  │  ├─ register
│  │  │  │  └─ index.tsx
│  │  │  ├─ room
│  │  │  │  ├─ create.tsx
│  │  │  │  ├─ edit.tsx
│  │  │  │  └─ list.tsx
│  │  │  ├─ staff
│  │  │  │  ├─ create.tsx
│  │  │  │  ├─ edit.tsx
│  │  │  │  └─ list.tsx
│  │  │  └─ tasks
│  │  │     ├─ create.tsx
│  │  │     ├─ edit.tsx
│  │  │     └─ list.tsx
│  │  ├─ providers
│  │  │  ├─ auth.ts
│  │  │  ├─ data
│  │  │  │  ├─ fetch-wrapper.ts
│  │  │  │  └─ index.tsx
│  │  │  └─ index.ts
│  │  ├─ utils
│  │  │  ├─ constants.tsx
│  │  │  ├─ currency-number.ts
│  │  │  ├─ date
│  │  │  │  ├─ get-date-colors.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ get-name-initials.ts
│  │  │  ├─ get-random-color.ts
│  │  │  ├─ helpers.ts
│  │  │  ├─ queries.ts
│  │  │  └─ schemas.types.ts
│  │  └─ vite-env.d.ts
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  └─ vite.config.ts
├─ README.MD
├─ server
│  ├─ .prettierrc
│  ├─ eslint.config.mjs
│  ├─ nest-cli.json
│  ├─ package.json
│  ├─ README.md
│  ├─ src
│  │  ├─ app.controller.ts
│  │  ├─ app.module.ts
│  │  ├─ app.service.ts
│  │  ├─ auth
│  │  │  ├─ gql-auth.guard.ts
│  │  │  └─ jwt.strategy.ts
│  │  ├─ booking
│  │  │  ├─ booking.dto.ts
│  │  │  ├─ booking.module.ts
│  │  │  ├─ booking.resolver.ts
│  │  │  ├─ booking.schema.ts
│  │  │  └─ booking.service.ts
│  │  ├─ guest
│  │  │  ├─ guest.dto.ts
│  │  │  ├─ guest.module.ts
│  │  │  ├─ guest.resolver.ts
│  │  │  ├─ guest.schema.ts
│  │  │  └─ guest.service.ts
│  │  ├─ main.ts
│  │  ├─ pubsub.module.ts
│  │  ├─ room
│  │  │  ├─ room.dto.ts
│  │  │  ├─ room.module.ts
│  │  │  ├─ room.resolver.ts
│  │  │  ├─ room.schema.ts
│  │  │  └─ room.service.ts
│  │  ├─ schema.gql
│  │  ├─ staff
│  │  │  ├─ staff.dto.ts
│  │  │  ├─ staff.module.ts
│  │  │  ├─ staff.resolver.ts
│  │  │  ├─ staff.schema.ts
│  │  │  └─ staff.service.ts
│  │  └─ task
│  │     ├─ task.dto.ts
│  │     ├─ task.module.ts
│  │     ├─ task.resolver.ts
│  │     ├─ task.schema.ts
│  │     └─ task.service.ts
│  ├─ tsconfig.build.json
│  └─ tsconfig.json
└─ social.png

```