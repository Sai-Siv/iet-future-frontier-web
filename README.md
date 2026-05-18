# IET Hyderabad Local network Future Frontier Web

## Environment Setup

### Backend Setup (.env)
Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD_HERE@cluster0.p1pxurw.mongodb.net/your_database_name?retryWrites=true&w=majority
CORS_ORIGIN=http://localhost:8080
```

Replace `YOUR_PASSWORD_HERE` with your actual MongoDB password.

## Installation

### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server

## Project Structure

```
IET Hyderabad Local network-future-frontier-web/
├── src/                    # Frontend source files
│   ├── components/        # React components
│   ├── pages/            # Page components
│   └── ...
├── backend/               # Backend source files
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── config/           # Configuration files
│   └── server.js         # Express server setup
├── .env                  # Environment variables (frontend)
└── backend/.env          # Environment variables (backend)
```

## Environment Variables

### Backend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Port number for the backend server | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb+srv://... |
| CORS_ORIGIN | Allowed origin for CORS | http://localhost:8080 |

## API Endpoints

### Registration
- **POST** `/api/register`
  - Register a new participant
  - Body:
    ```json
    {
      "title": "string",
      "fullName": "string",
      "category": "string",
      "department": "string",
      "instituteName": "string",
      "isIETMember": "boolean",
      "mobileNumber": "string",
      "emailAddress": "string",
      "zoneVenue": "string",
      "youtubeLink": "string"
    }
    ```

## Security Notes
- Never commit `.env` files to version control
- Keep your MongoDB password secure
- Use environment variables for all sensitive information
