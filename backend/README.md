# GitHub OAuth Backend

This is a simple Express.js backend server that handles GitHub OAuth authentication for the Portfolio Website Builder.

## Purpose

GitHub requires a client secret to exchange an OAuth code for an access token. Since client secrets cannot be exposed in the frontend, this backend server acts as a proxy to safely handle the token exchange.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory with your GitHub OAuth credentials:

```env
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
PORT=5000
```

### 3. Get GitHub OAuth Credentials

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: Portfolio Website Builder
   - **Homepage URL**: `http://localhost:5173` (or your frontend URL)
   - **Authorization callback URL**: `http://localhost:5173/auth/callback`
4. Click "Register application"
5. Copy the **Client ID** and **Client Secret** to your `.env` file

## Running the Server

### Development Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

### Production Mode

```bash
NODE_ENV=production npm start
```

## API Endpoints

### POST `/auth/github`

Exchanges a GitHub OAuth code for an access token.

**Request Body:**
```json
{
  "code": "github_oauth_code_here"
}
```

**Success Response:**
```json
{
  "access_token": "gho_xxxxxxxxxxxx",
  "token_type": "bearer",
  "scope": "repo,user"
}
```

**Error Response:**
```json
{
  "error": "error_type",
  "error_description": "Description of the error"
}
```

### GET `/`

Health check endpoint.

**Response:**
```
GitHub OAuth Backend Server - Running ✓
```

## Troubleshooting

### Issue: "Bad credentials" error (401)

**Possible causes:**
1. Client ID or Client Secret is incorrect
2. OAuth App is not configured properly on GitHub
3. The authorization callback URL doesn't match

**Solution:**
1. Check your `.env` file has the correct credentials (no spaces!)
2. Verify the OAuth App settings on GitHub
3. Ensure the callback URL matches exactly

### Issue: "Failed to obtain access token"

**Possible causes:**
1. The OAuth code has expired (they expire after ~10 minutes)
2. The code has already been used (they can only be used once)
3. Client ID/Secret mismatch

**Solution:**
1. Try the OAuth flow again to get a fresh code
2. Make sure you're using the correct Client ID and Secret

### Issue: Server not responding

**Check if server is running:**
```bash
curl http://localhost:5000/
```

You should see: `GitHub OAuth Backend Server - Running ✓`

**If not running:**
```bash
# Make sure you're in the backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

## Security Notes

 **Important:** Never commit the `.env` file to version control. It's already in `.gitignore`.

 **Production:** For production deployment, use environment variables provided by your hosting platform (Heroku, Vercel, etc.) instead of a `.env` file.

## CORS Configuration

The server is configured to accept requests from any origin using `cors()`. For production, you should restrict this:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

## Deployment

### Heroku

1. Create a Heroku app:
   ```bash
   heroku create your-app-name
   ```

2. Set environment variables:
   ```bash
   heroku config:set GITHUB_CLIENT_ID=your_client_id
   heroku config:set GITHUB_CLIENT_SECRET=your_client_secret
   ```

3. Deploy:
   ```bash
   git push heroku main
   ```

### Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel dashboard

### Railway

1. Connect your GitHub repo to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

## Frontend Configuration

After deploying the backend, update your frontend's `.env` file:

```env
VITE_BACKEND_GITHUB_URL=https://your-backend-url.com/auth/github
```

## Dependencies

- `express` - Web server framework
- `cors` - Enable CORS
- `dotenv` - Load environment variables
- `node-fetch` - Make HTTP requests to GitHub API

## License

MIT
