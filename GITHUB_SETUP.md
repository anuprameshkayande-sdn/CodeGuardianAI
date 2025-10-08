# GitHub OAuth Setup Guide

This guide will help you set up GitHub OAuth for the CodeGuardian AI application to enable:
- Authentication with GitHub
- Access to private repositories
- Creation of branches and pull requests with AI fixes

## Prerequisites

- A GitHub account
- Admin access to configure OAuth apps

## Step 1: Create a GitHub OAuth App

1. Go to your GitHub Settings: https://github.com/settings/developers

2. Click on "OAuth Apps" in the left sidebar

3. Click "New OAuth App" button

4. Fill in the application details:
   - **Application name**: `CodeGuardian AI` (or your preferred name)
   - **Homepage URL**: `http://localhost:3000` (for local development) or your production URL
   - **Application description**: `AI-powered code analysis and auto-fixing tool`
   - **Authorization callback URL**: `http://localhost:8000/api/auth/github/callback` (for local) or `https://your-domain.com/api/auth/github/callback` (for production)

5. Click "Register application"

6. You will see your **Client ID** on the next page

7. Click "Generate a new client secret" to get your **Client Secret**

8. **Important**: Copy both the Client ID and Client Secret immediately - the secret will only be shown once!

## Step 2: Configure Environment Variables

### Backend Configuration

1. Navigate to the `backend` folder

2. Create a `.env` file (copy from `.env.example` if available):
   ```bash
   cp .env.example .env
   ```

3. Add your GitHub OAuth credentials:
   ```env
   # GitHub OAuth Configuration
   GITHUB_CLIENT_ID=your_client_id_here
   GITHUB_CLIENT_SECRET=your_client_secret_here
   
   # URLs (adjust for your environment)
   FRONTEND_URL=http://localhost:3000
   BACKEND_URL=http://localhost:8000
   ```

### Frontend Configuration

1. Navigate to the `frontend` folder

2. Create a `.env` file (copy from `.env.example` if available):
   ```bash
   cp .env.example .env
   ```

3. Set the backend URL:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8000
   ```

## Step 3: Test the Integration

1. Start the backend server:
   ```bash
   cd backend
   python server.py
   ```

2. Start the frontend application:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser to `http://localhost:3000`

4. Click the "Login with GitHub" button

5. You should be redirected to GitHub's authorization page

6. Authorize the application

7. You should be redirected back to the app with your GitHub profile visible

## Features Enabled by GitHub OAuth

### 1. Private Repository Support

Once logged in, you can analyze private repositories that your GitHub account has access to. The system will use your OAuth token to:
- Download private repository archives
- Access repository contents
- Read repository metadata

### 2. Branch and Pull Request Creation

For repositories where you have write access, you can:
- Create a new branch with AI fixes
- Commit AI-generated fixes to the branch
- Create a pull request automatically

#### How to Create a PR with AI Fixes:

1. Analyze a repository (public or private)
2. Wait for the analysis to complete
3. Review the AI fixes in the "AI Fixes" tab
4. Click "Connect Repository" button
5. In the dialog:
   - Enter a branch name (default: `codeguardian-ai-fixes`)
   - Select the target branch (main, master, develop, etc.)
   - Click "Create PR"
6. The system will:
   - Create a new branch from the target branch
   - Commit a summary of AI fixes to the new branch
   - Create a pull request with detailed information
   - Open the PR in a new browser tab

### 3. OAuth Scopes

The application requests the following GitHub scopes:
- `repo` - Full access to private and public repositories
- `read:user` - Read user profile information
- `user:email` - Access user email addresses

## Security Considerations

1. **Keep Secrets Safe**: Never commit your `.env` files or expose your Client Secret
2. **Token Storage**: OAuth tokens are stored in the browser's localStorage - clear them if using a shared computer
3. **Token Expiration**: GitHub tokens don't expire by default, but can be revoked at https://github.com/settings/applications
4. **Repository Access**: The app can only access repositories that your GitHub account has permission for

## Troubleshooting

### "GitHub OAuth not configured" error

- Make sure `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are set in your backend `.env` file
- Restart the backend server after updating environment variables

### OAuth redirect fails

- Verify that the callback URL in your GitHub OAuth app matches exactly: `http://localhost:8000/api/auth/github/callback`
- Check that `BACKEND_URL` in your backend `.env` is correct
- Make sure both frontend and backend are running

### "Invalid GitHub token" error

- Try logging out and logging back in
- Clear your browser's localStorage
- Revoke and re-authorize the app at https://github.com/settings/applications

### Cannot access private repositories

- Ensure you've authorized the OAuth app with the `repo` scope
- Verify you have access to the repository on GitHub
- Check that you're logged in with the correct GitHub account

## Production Deployment

When deploying to production:

1. Update your GitHub OAuth app with production URLs:
   - Homepage URL: `https://your-domain.com`
   - Callback URL: `https://your-backend-domain.com/api/auth/github/callback`

2. Update environment variables:
   ```env
   FRONTEND_URL=https://your-domain.com
   BACKEND_URL=https://your-backend-domain.com
   CORS_ORIGINS=https://your-domain.com
   ```

3. Use HTTPS for all URLs in production

4. Consider using environment variable management services (AWS Secrets Manager, Google Secret Manager, etc.)

## Support

For issues or questions:
- Check the main README.md for general setup instructions
- Review GitHub's OAuth documentation: https://docs.github.com/en/developers/apps/building-oauth-apps
- Open an issue in the repository

