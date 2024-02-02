
# TRUBL App

## Introduction 👋
The TRUBL App is a ticket management system featuring distinct portals for administrators, technicians, and employees. This versatile system streamlines the process of handling tickets, ensuring efficient management across different organizational roles.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)

## Installation
1. Clone the repository:
   ```
   git clone [repository URL]
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Set up your database using `database.sql` on your own Supabase database.
4. Create a `.env` file and add your Supabase key.
5. Turn on Realtime for the messages table on Supabase.

## Usage
The TRUBL App enhances maintenance management within organizations through a user-friendly ticketing system. It's designed with distinct portals for different user roles, improving the efficiency and effectiveness of handling maintenance requests.

- **Administrators**: Gain an overview of all maintenance activities, manage user roles and ticket assignments, and access analytical tools for insights into maintenance trends.
- **Technicians**: View and manage maintenance tickets, communicate with employees through a real-time chat feature, and update ticket statuses as they progress.
- **Employees**: Easily report maintenance issues by creating detailed tickets, include location-specific information, and track the progress of their submitted tickets.

## Features
- **Ticket Management**: Enables creation, viewing, updating, and deletion of tickets in an organized manner.
- **Role-Based Portals**: Custom portals for administrators, technicians, and employees, each tailored to their specific needs.
- **Real-Time Chat**: Facilitates direct communication between employees and technicians for efficient resolution of maintenance issues.
- **Location and Department Tagging**: Allows for precise categorization of tickets based on location and department.
- **Supabase Integration**: Leverages Supabase for advanced database management and real-time functionality.
- **User and Role Management**: Administrators can efficiently manage user roles and assign specific tasks and locations.


## Dependencies
- React (`react`)
- React Router DOM (`react-router-dom`)
- Supabase JS (`@supabase/supabase-js`)
- [Other dependencies as required in the project files]

## Configuration
The application requires a `.env` file for environment variables, particularly for Supabase integration. Ensure that your Supabase keys are correctly set up in this file.

## Documentation
The project's documentation is primarily in the form of code comments and README. Each component file (e.g., `App.jsx`, `Home.jsx`, `Contact.jsx`) contains specific details about its functionality.

## Examples
Examples of usage are depicted in various component files, demonstrating how different parts of the application interact with each other, such as ticket creation, user management, and real-time data handling with Supabase.

## Troubleshooting
- **Database Connectivity**: Ensure that the Supabase credentials are correctly set in the `.env` file.
- **Dependency Issues**: If there are issues with dependencies, re-run `npm install` to ensure all dependencies are correctly installed.

## Contributors
- Jesse Carter
- Colin Tolliver
- Noah Morrison
- Ryan Patino
