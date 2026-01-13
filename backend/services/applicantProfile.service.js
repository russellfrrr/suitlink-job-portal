import ApplicantProfile from "../models/ApplicantProfile.js";

/* 
ENDPOINTS (/api/v1/applicant/)
  MAIN 
    POST /profile - create profile
    GET /profile - get own profile
    PATCH /profile - update some of the fields 
    PUT /profile/avatar - replacing the avatar entirely with a picture
  
  EDUCATION (subdocument)
    POST /education 
    PATCH /education/:educationId
    DELETE /educattion/:educationId

  EXPERIENCE (subdocument)
    POST /experience
    PATCH /experience/:experienceId
    DELETE /experience/:experienceId
  
  RESUME (cloudinary)
    POST /resume
    DELETE /resume/:resumeId    
*/