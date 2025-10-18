# Frontend Developer / Test Assignment

Hello! We’re excited to see someone ready to showcase their technical skills and complete this test assignment at a high
level!

We hope you find it interesting and get a chance to demonstrate your full potential as a frontend developer.

We expect a completed solution within **one week**, which should take up to **20 hours** to complete.

Your efforts will be rewarded many times over with the joy of working with our amazing team! And trust us, our team is
really awesome!

> **Note:** This task is purely for testing purposes. Your goal is to demonstrate your technical skills. Pay attention
> to every detail—they will be carefully reviewed.

---

## Test Assignment: Online Cinema Booking Platform

### Goal

Develop a web application for booking cinema tickets, where users can:

* View the schedule of movie sessions
* Reserve seats in a cinema hall
* Manage their bookings

---

### Design

To make the task easier, we have prepared a **clickable prototype**. This will help you understand the requirements
clearly.
[Link to prototype]

---

### API

A backend for this test assignment is already developed and documented in **Swagger**. You can find the link, setup
instructions, and access details in the backend README.
[Backend repository link]

---

### Core Features

#### Menu

* Movies
* Cinemas
* My Tickets
* Login/Logout

#### Authorization & Registration

* **Registration fields:** username, password, password confirmation

* **Validation rules:**

    * `username`: minimum 8 characters
    * `password`: minimum 8 characters, at least 1 uppercase letter and 1 number
    * `password confirmation`: must match password

* Registration via `POST /register`

* After successful registration, users are redirected to **My Tickets** page

* **Login:** via username and password (`POST /login`)

* On successful login, users are redirected to **My Tickets**

* Login error message: “Incorrect username or password. Please check your credentials and try again.”

* **Logout:**

    * The “Login” menu item changes to “Logout” after authentication
    * Clicking “Logout” logs the user out and redirects to the **Movies** page

---

#### Browsing Movies & Cinemas

* **Movie grid:** brief info + poster

* Clicking **View Sessions** → navigates to movie details page with sessions in various cinemas

* API:

    * `GET /movies` – list of movies
    * `GET /movies/{movieId}/sessions` – sessions for a movie

* **Cinema list:**

* Clicking **View Sessions** → navigates to cinema page with upcoming sessions

* API:

    * `GET /cinemas` – list of cinemas
    * `GET /cinemas/{cinemaId}/sessions` – sessions for a cinema

---

#### Booking Tickets

* **For unauthenticated users:**

    * Can only view taken seats
    * Booking button redirects to registration/login

* **For authenticated users:**

    * Select available seats (rectangular hall layout with equal seats per row)
    * Clicking **Book** → redirects to **My Tickets** page
    * API:

        * `GET /movieSessions/{movieSessionId}` – session details (seat layout and booked seats)
        * `POST /movieSessions/{movieSessionId}` – booking

---

#### Managing Bookings (“My Tickets”)

* Page accessible **only for authenticated users**

* Redirect unauthenticated users to login page

* Tickets are grouped into **3 categories**:

    * Unpaid
    * Upcoming
    * Past

* API: `GET /me/bookings` – list all user tickets

* **Payment:**

    * Unpaid tickets have a countdown timer based on the `paymentTime` from `GET /settings`
    * If time expires, ticket is removed automatically
    * Clicking **Pay** → `POST /bookings/{bookingId}/payments`
    * After successful payment:

        * **Pay** button hides
        * Ticket moves to **Upcoming**

---

### Technical Requirements

* ✅ TypeScript
* ✅ Framework: Vue 3 / Nuxt 3 / React / Next.js
* ✅ Form validation (login, registration)
* ✅ Tests: basic tests for key components
* ✅ Design: simple, desktop-focused layout (no complex styling required)

---

### Submission

* Implement frontend in a **separate repository**
* Include **README** with project setup instructions
* Submit the **repository link** in your job application

---

### Evaluation Criteria

* Functional requirements implemented
* Clean, maintainable code
* Scalable and maintainable architecture
* Presence of tests
