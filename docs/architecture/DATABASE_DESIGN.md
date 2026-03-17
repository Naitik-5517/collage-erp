# Database Design

## Overview

College ERP uses PostgreSQL as the primary database with Drizzle ORM for type-safe database access.

## Database Architecture

### Single Database vs. Database per Service

We use a **shared database** approach with:
- Separate schemas for each service
- Service-specific tables within schemas
- Shared reference tables

## Schemas

### auth_schema
- users
- sessions
- oauth_accounts
- password_resets

### student_schema
- students
- student_profiles
- enrollments
- documents

### academic_schema
- courses
- course_offerings
- class_schedules
- attendance
- departments
- programs

### exam_schema
- exams
- exam_schedules
- grades
- results

### finance_schema
- fee_structures
- payments
- invoices
- transactions

### library_schema
- books
- book_issues
- fines
- digital_resources

### lms_schema
- course_content
- assignments
- submissions
- discussions
- online_classes

## Key Tables

### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'ACTIVE',
  phone VARCHAR(20),
  avatar TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### students
```sql
CREATE TABLE students (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  student_id VARCHAR(20) UNIQUE NOT NULL,
  enrollment_number VARCHAR(30) UNIQUE NOT NULL,
  batch VARCHAR(10) NOT NULL,
  semester INTEGER NOT NULL,
  section VARCHAR(10),
  program_id UUID REFERENCES programs(id),
  department_id UUID REFERENCES departments(id),
  admission_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### courses
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  credits INTEGER NOT NULL,
  department_id UUID REFERENCES departments(id),
  semester INTEGER NOT NULL,
  is_elective BOOLEAN DEFAULT FALSE,
  prerequisites JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Indexes

Key indexes for performance:
- users: email, role, status
- students: student_id, enrollment_number, user_id
- courses: code, department_id
- enrollments: student_id, course_offering_id
- attendance: student_id, course_offering_id, date

## Migrations

Managed by Drizzle ORM:
```bash
npm run db:generate  # Generate migration
npm run db:migrate   # Run migrations
npm run db:seed      # Seed data
```

## Backup Strategy

- Daily automated backups
- Point-in-time recovery enabled
- Backup retention: 30 days
- Monthly archives

## Performance Optimization

- Connection pooling (pgBouncer)
- Query optimization
- Proper indexing
- Materialized views for reports
- Read replicas for heavy reads
