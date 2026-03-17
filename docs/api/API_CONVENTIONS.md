# API Conventions

## Base URL

```
Development: http://localhost:8080/api/v1
Staging: https://staging-api.college-erp.com/api/v1
Production: https://api.college-erp.com/api/v1
```

## HTTP Methods

- `GET` - Retrieve resources
- `POST` - Create resources
- `PUT` - Update entire resource
- `PATCH` - Partial update
- `DELETE` - Delete resource

## Request Format

### Headers
```
Content-Type: application/json
Authorization: Bearer <token>
X-Request-ID: <uuid>
```

### Body
Use JSON for request payloads.

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "AUTH_1000",
    "message": "Invalid credentials",
    "details": {},
    "timestamp": "2026-03-17T10:00:00Z",
    "path": "/api/v1/auth/login"
  }
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Status Codes

- `200` OK - Successful GET, PUT, PATCH
- `201` Created - Successful POST
- `204` No Content - Successful DELETE
- `400` Bad Request - Invalid input
- `401` Unauthorized - Authentication required
- `403` Forbidden - Insufficient permissions
- `404` Not Found - Resource not found
- `409` Conflict - Resource conflict
- `422` Unprocessable Entity - Validation error
- `429` Too Many Requests - Rate limit exceeded
- `500` Internal Server Error - Server error
- `503` Service Unavailable - Service down

## Naming Conventions

### Endpoints
- Use plural nouns: `/users`, `/students`, `/courses`
- Use kebab-case: `/course-offerings`
- Nested resources: `/students/:id/enrollments`

### Query Parameters
- Use camelCase: `?sortBy=createdAt&sortOrder=desc`
- Pagination: `?page=1&limit=20`
- Filtering: `?status=active&role=student`
- Search: `?search=john`

## Authentication

### Bearer Token
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Refresh
```
POST /auth/refresh
{
  "refreshToken": "..."
}
```

## Rate Limiting

- Default: 100 requests per 15 minutes
- Headers returned:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

## Versioning

- URL-based versioning: `/api/v1/...`
- Breaking changes require new version

## Common Query Parameters

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `sortBy` - Sort field
- `sortOrder` - asc or desc
- `search` - Search query
- `fields` - Comma-separated fields to return
- `include` - Relations to include

## Error Codes

See [Error Codes](../api/ERROR_CODES.md) for complete list.

## Examples

### List Students
```
GET /api/v1/students?page=1&limit=20&sortBy=createdAt&sortOrder=desc
```

### Get Student
```
GET /api/v1/students/123e4567-e89b-12d3-a456-426614174000
```

### Create Student
```
POST /api/v1/students
{
  "email": "student@college.edu",
  "firstName": "John",
  "lastName": "Doe",
  "studentId": "STU123456",
  "program": "Computer Science"
}
```

### Update Student
```
PATCH /api/v1/students/123e4567-e89b-12d3-a456-426614174000
{
  "phone": "+91 98765 43210"
}
```

### Delete Student
```
DELETE /api/v1/students/123e4567-e89b-12d3-a456-426614174000
```
