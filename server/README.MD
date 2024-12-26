## API Endpoints

### Authentication Endpoints

Public Endpoints:

- POST /api/v1/auth/register : Register a new user
- POST /api/v1/auth/login : Login a user

Protected Endpoints:

- POST /api/v1/auth/logout : Logout a user
- GET /api/v1/auth/me : Get the current user

### Job Endpoints

Public Endpoints:

- GET /api/v1/jobs : Get all jobs
- GET /api/v1/jobs/{job_id} : Get a job by id

Protected Endpoints:

Roles Allowed: ['admin', 'employer']

- POST /api/v1/jobs : Create a new job
- PUT /api/v1/jobs/{job_id} : Update a job by id
- DELETE /api/v1/jobs/{job_id} : Delete a job by id
