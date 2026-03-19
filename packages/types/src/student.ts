export interface Student {
  id: string;
  userId: string;
  studentId: string;
  enrollmentNumber: string;
  batch: string;
  semester: number;
  section: string;
  program: string;
  department: string;
  admissionDate: Date;
  status: StudentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum StudentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  GRADUATED = 'GRADUATED',
  DROPPED = 'DROPPED',
  SUSPENDED = 'SUSPENDED',
}

export interface StudentProfile extends Student {
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
  contactInfo: ContactInfo;
}

export interface PersonalInfo {
  dateOfBirth: Date;
  gender: string;
  bloodGroup?: string;
  nationality: string;
  religion?: string;
  category?: string;
}

export interface AcademicInfo {
  previousEducation: Education[];
  currentCGPA?: number;
  totalCredits?: number;
}

export interface Education {
  level: string;
  institution: string;
  board: string;
  yearOfPassing: number;
  percentage: number;
}

export interface ContactInfo {
  permanentAddress: Address;
  currentAddress: Address;
  emergencyContact?: EmergencyContact;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
  email?: string;
}
