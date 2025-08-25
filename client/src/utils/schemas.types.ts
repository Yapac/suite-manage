export type Role = "admin" | "manager" | "receptionist" | "housekeeping";

export interface Staff {
  id: string; // maps _id from Mongo
  name: string;
  email: string;
  role: Role;
  phone?: string;
  avatarUrl?: string;
  hireDate: DateTime;

  // metadata
  createdAt?: Date;
  updatedAt?: Date;
}
export type DateTime = string;

// Staff types
export interface StaffDTO {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  hireDate: DateTime;
  avatarUrl?: string;
}

export interface StaffInputDTO {
  name?: string;
  role?: string;
  email?: string;
  password?: string;
  phone?: string;
  hireDate?: DateTime;
  avatarUrl?: string;
}
