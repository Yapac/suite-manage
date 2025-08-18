export type Role =
  | "admin"
  | "manager"
  | "receptionist"
  | "housekeeping"
  | "guest";

export interface User {
  id: string; // Unique identifier
  name: string; // Login username
  email: string; // Contact email
  role: Role; // User role
  phoneNumber?: string; // Optional contact number
  avatarUrl?: string; // Optional profile picture

  // Hotel-specific properties
  assignedHotelId?: string; // Which hotel they belong to (for chains)
  shiftSchedule?: string[]; // e.g., ["Monday: 9-5", "Tuesday: 1-9"]

  // Access control
  permissions?: string[]; // Extra custom permissions
  isActive: boolean; // Account status
  lastLogin?: Date; // Last login timestamp

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}
