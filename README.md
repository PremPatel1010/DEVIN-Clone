# DEVIN-Clone

## Project Overview

DEVIN-Clone is an AI-powered real-time chat application designed to provide seamless communication between users. This project replicates the core functionalities of popular chat applications while introducing unique features like live code editing and execution. Users can view, edit, and run code snippets directly within the chat interface, offering an innovative and interactive experience.

## Features

- **Real-time Messaging**: Instant communication with live updates.
- **User Authentication**: Secure and reliable login and registration system.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.
- **AI-powered Code Generation**: Generate and execute code snippets directly in the chat.
- **In-chat Code Execution**: Run code in real-time using integrated WebContainer.

## Technologies Used

### Frontend:
- **React**: For building the dynamic user interface.
- **Redux**: For state management across the application.
- **CSS Modules**: For component-specific styling.
- **Socket.io-client**: For real-time, bidirectional communication.

### Backend:
- **Node.js**: For scalable server-side logic.
- **Express**: For creating RESTful APIs.
- **Socket.io**: For handling real-time communication.
- **MongoDB**: For database management.
- **Mongoose**: For object data modeling (ODM).

### Authentication:
- **JWT (JSON Web Tokens)**: For secure and stateless authentication.
- **bcrypt**: For password hashing to enhance security.

### AI Integration:
- **Google Gemini**: For AI-powered code generation and interaction.

### Code Execution:
- **WebContainer**: Enables real-time code execution within the chat application.

### Deployment:
- **MongoDB Atlas**: For cloud database storage and management.

## Getting Started

Follow these steps to get a local version up and running:

### Prerequisites
- Node.js installed on your system
- MongoDB instance running locally or on the cloud

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your-username/DEVIN-Clone.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env` file and add your environment variables
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application

1. Start the development server
   ```sh
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Prem Patel - [premrpatel2007@gmail.com](mailto:premrpatel2007@gmail.com)

Project Link: [https://github.com/PremPatel1010/DEVIN-Clone](https://github.com/PremPatel1010/DEVIN-Clone)
## AI Integration

This project integrates AI capabilities using Google Gemini. Users can interact with the AI by typing `@ai` in their messages. The AI can generate code snippets based on user input, which are displayed in the chat. Additionally, users can execute these code snippets directly within the chat application using WebContainer.

## Additional Technologies Used

- **AI Integration**:
  - **Google Gemini**: For AI-powered code generation.

- **Code Execution**:
  - **WebContainer**: For running code snippets directly in the chat.

## Package.json Overview

### Frontend `package.json`

```json
{
  "name": "devin-clone-frontend",
  "version": "1.0.0",
  "dependencies": {
    "@webcontainer/api": "^1.5.1-internal.5",
    "axios": "^1.7.9",
    "markdown-to-jsx": "^7.7.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.4.0",
    "react-router-dom": "^7.1.1",
    "react-syntax-highlighter": "^15.6.1",
    "socket.io-client": "^4.8.1"
  },
}
```

### Backend `package.json`

```json
{
  "name": "devin-clone-backend",
  "version": "1.0.0",
  "dependencies": {
    "@google/generative-ai": "^0.21.0",
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "express-validator": "^7.2.0",
    "ioredis": "^5.4.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.9.2",
    "morgan": "^1.10.0",
    "socket.io": "^4.8.1"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```