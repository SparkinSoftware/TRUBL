
# Truble App

## Introduction
The Truble App is a ticket management system featuring distinct portals for administrators, technicians, and employees. This versatile system streamlines the process of handling tickets, ensuring efficient management across different organizational roles.

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

## Usage
The Truble App allows users to efficiently add and delete tickets within the system. It's designed to cater to different user roles, including administrators, technicians, and employees, each with their dedicated portal for specific functionalities.

## Features
- **Ticket Management**: Create, view, update, and delete tickets.
- **Role-Based Access**: Different portals for administrators, technicians, and employees.
- **Real-Time Updates**: Live updates for ticket statuses and changes.
- **Supabase Integration**: Leveraging Supabase for database management and real-time functionality.

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
- Noah Morrison
- Colin Tolliver
- Jesse Carter
- Ryan Patino
