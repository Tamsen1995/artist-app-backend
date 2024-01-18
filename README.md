# Music Artist and Album Management API

This server-side application provides a RESTful API for managing music artists and albums. It is built with Express.js and uses SQLite for data storage.

## Features

- REST API for artists and albums management
- SQLite database integration for persistent data storage
- Error handling and validation for API requests

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   git clone
2. install packages:
   npm install
3. run:
   npm run dev

API Endpoints

List all Artists
GET /artists

Create a new Artist
POST /artists

List all Albums for a given Artist
GET /artists/:artistId/albums

Create a new Album
POST /albums
