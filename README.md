# Workout Mate

A web application that allows users to create and manage workouts and exercises. Users can register, log in, and track their exercise routines with detailed instructions for each exercise.

## Table of Contents

- Overview
- Features
- Usage
- Technologies Used
- API Endpoints
- Future Enhancements

## Overview

Workout Mate is a full-stack web application designed to help users keep track of their workouts and exercises. It allows users to:

- Create and edit exercises with detailed instructions.
- Create and customize workout routines using pre-defined exercises.
- Track their workouts with notes for each session.
- Manage their profile, including viewing their workout history and exercise details.

## Features

- User Authentication: Users can sign up and log in using a secure authentication system with JWT.
- Exercise Management: Users can create, edit, and delete exercises. Each exercise includes a name, body part, category, and instructions.
- Workout Management: Users can create workouts using exercises they have defined. Workouts can include multiple exercises, each with custom sets and reps.
- Profile Management: Users can view their profile, which displays their saved exercises and workouts.
- Responsive UI: The application is styled for a clean and responsive design, ensuring it looks great on both desktop and mobile devices.

## Usage

1. Sign Up / Log In:

- New users can register by providing their email, password, and display name.
- Existing users can log in with their email and password.

2. Profile Management:

- Once logged in, users can access their profile to view their exercises and workouts.

3. Manage Exercises:

- Users can add new exercises, edit existing ones, and delete exercises they no longer need.
- Each exercise includes a name, targeted body part, category (e.g., barbell, dumbbell), and instructions.

4. Create and Edit Workouts:

- Users can create workouts by selecting exercises and defining sets and reps.
- Users can also edit existing workouts to update their routine.

## Technologies Used

- Frontend:
    - React
    - React Router
    - CSS Modules for styling
- Backend:
    - Node.js
    - Express
    - MongoDB with Mongoose
    - JWT for authentication
- Deployment:
    - Client: Netlify https://workoutmatecapstone.netlify.app/
    - Server: Render https://capstone-completion.onrender.com

## API Endpoints

### User

- POST /api/users/register - Register a new user.
- POST /api/users/login - Log in a user.
- GET /api/users/profile - Get user profile details.

### Exercises

- POST /api/exercises - Create a new exercise.
- GET /api/exercises - Get all exercises for the logged-in user.
- PUT /api/exercises/:id - Update an existing exercise.
- DELETE /api/exercises/:id - Delete an exercise.

### Workouts

- POST /api/workouts - Create a new workout.
- GET /api/workouts - Get all workouts for the logged-in user.
- PUT /api/workouts/:id - Update an existing workout.
- DELETE /api/workouts/:id - Delete a workout.

## Future Enhancements

1. Add Progress Tracking: Track user progress over time by logging workout sessions.
2. Social Features: Allow users to share their workout routines with friends.
3. Create a RESTful API. This would include detailed information such as exercise names, targeted body parts, categories, instructions, difficulty level and even media like images or GIFs for better guidance.
4. Advanced Filtering: Enable users to filter exercises by body part or difficulty level.