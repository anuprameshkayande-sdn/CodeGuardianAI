# CodeGuardian AI Agent - Advanced Code Analysis Platform

## Overview

CodeGuardian AI Agent is an advanced AI-powered code analysis platform that combines deep security scanning, performance analysis, code quality checks, and intelligent auto-fixing capabilities. The platform now includes full GitHub integration for seamless collaboration and automated pull request creation.

## ✨ Key Features

### Core Analysis Capabilities
- **AI-Powered Analysis**: Deep code analysis using OpenAI GPT-4o-mini
- **Security Scanning**: Comprehensive security vulnerability detection
- **Performance Analysis**: Identify and optimize performance bottlenecks
- **Code Quality Assessment**: Automated code quality and style checks
- **Docker Sandbox**: Secure execution environment for code analysis
- **Multi-Language Support**: Python, JavaScript, TypeScript, Java, Go, and more

### 🆕 New GitHub Integration Features

#### 1. **GitHub OAuth Authentication**
- Secure login with GitHub account
- Access to private repositories
- Persistent authentication with token management

#### 2. **Private Repository Support**
- Analyze private repositories you have access to
- Automatic authentication using OAuth tokens
- Secure repository cloning and analysis

#### 3. **Automated Pull Request Creation**
- Create branches directly from the UI
- Commit AI-generated fixes automatically
- Generate detailed pull requests with fix summaries
- Select target branch (main, master, develop, etc.)
- One-click PR creation workflow

#### 4. **Branch Management**
- Create custom branch names
- Specify base branch for merging
- Automatic branch creation from latest commit
- Support for existing branch workflows

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 16+
- MongoDB
- Docker (optional, for sandbox execution)
- GitHub account (for OAuth features)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file with the following variables:
   ```env
   # MongoDB
   MONGO_URL=mongodb://localhost:27017/
   DB_NAME=codemate

   # OpenAI API (Get from https://platform.openai.com/api-keys)
   OPENAI_API_KEY=sk-proj-your_actual_api_key_here

   # GitHub OAuth (See GITHUB_SETUP.md for details)
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret

   # URLs
   FRONTEND_URL=http://localhost:3000
   BACKEND_URL=http://localhost:8000
   CORS_ORIGINS=http://localhost:3000
   ```

4. Start the backend server:
   ```bash
   python server.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8000
   ```

4. Start the frontend:
   ```bash
   npm start
   ```

### GitHub OAuth Setup

For detailed instructions on setting up GitHub OAuth, see [GITHUB_SETUP.md](GITHUB_SETUP.md).

Quick steps:
1. Create a GitHub OAuth App at https://github.com/settings/developers
2. Set callback URL to: `http://localhost:8000/api/auth/github/callback`
3. Add Client ID and Secret to backend `.env` file
4. Restart the backend server

## 📖 Usage Guide

### Basic Analysis

1. **Open the application** at `http://localhost:3000`

2. **Login with GitHub** (optional, but required for private repos and PR creation)
   - Click "Login with GitHub" in the top-right corner
   - Authorize the application
   - You'll be redirected back to the app

3. **Enter Repository URL**
   - Paste your GitHub repository URL
   - Select analysis depth (Basic, Standard, or Comprehensive)
   - Click "Start AI Analysis"

4. **Review Results**
   - Security findings with severity levels
   - Code quality issues with auto-fix options
   - Performance optimization suggestions
   - AI-generated architecture analysis

### Creating Pull Requests with AI Fixes

1. **Complete an analysis** of a repository

2. **Apply AI fixes** (optional)
   - Navigate to Security, Quality, or Performance tabs
   - Click "AI Auto-Fix" on individual issues
   - Review fixes in the "AI Fixes" tab

3. **Create Pull Request**
   - Click "Connect Repository" button
   - Configure PR settings:
     - Branch name (default: `codeguardian-ai-fixes`)
     - Target branch (main, master, develop, etc.)
   - Click "Create PR"

4. **Review and Merge**
   - PR opens in new tab on GitHub
   - Review the AI-generated fixes
   - Merge when ready

## 🔧 API Endpoints

### Analysis Endpoints
- `POST /api/analyze` - Start code analysis
- `GET /api/analysis/{id}` - Get analysis results
- `GET /api/analyses` - List all analyses
- `DELETE /api/analysis/{id}` - Delete analysis

### GitHub OAuth Endpoints
- `GET /api/auth/github` - Initiate GitHub login
- `GET /api/auth/github/callback` - OAuth callback handler
- `GET /api/auth/github/user` - Get authenticated user info

### GitHub Repository Management
- `POST /api/github/create-branch` - Create new branch
- `POST /api/github/commit-fixes` - Commit AI fixes
- `POST /api/github/create-pr` - Create pull request

### AI Fix Endpoints
- `POST /api/analysis/{id}/apply-ai-fix` - Apply AI fix to issue
- `POST /api/analysis/{id}/connect-repo` - Get repository connection info

## 🔐 Security & Privacy

- **OAuth Tokens**: Stored securely in browser localStorage
- **Private Repos**: Only accessible with valid GitHub authentication
- **Token Scope**: Requests minimum required permissions (`repo`, `read:user`, `user:email`)
- **Data Privacy**: Analysis data stored in your MongoDB instance
- **No Code Storage**: Repository code is analyzed in temporary directories and deleted

## 🛠 Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** - Database for analysis storage
- **OpenAI GPT-4o-mini** - Advanced code analysis
- **GitPython** - Git repository management
- **GitHub API** - OAuth and repository operations
- **Docker** - Secure sandbox execution

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📊 Analysis Depth Levels

### Basic
- Code scanning
- Basic security checks
- Language detection

### Standard
- Everything in Basic
- Dependency analysis
- Build testing
- Performance analysis

### Comprehensive
- Everything in Standard
- AI architecture analysis
- Execution testing
- Advanced security scanning
- Automated fix generation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### GitHub OAuth Issues
- Ensure callback URL matches exactly
- Check that CLIENT_ID and CLIENT_SECRET are set
- Verify backend and frontend URLs are correct

### Private Repository Access
- Confirm you're logged in with correct GitHub account
- Check repository permissions on GitHub
- Verify OAuth token has `repo` scope

### Analysis Failures
- Check MongoDB connection
- Verify OpenAI API key is valid (get from https://platform.openai.com/api-keys)
- Ensure repository URL is accessible

## 📞 Support

For issues and questions:
- Check [GITHUB_SETUP.md](GITHUB_SETUP.md) for OAuth setup
- Review error messages in browser console
- Check backend logs for detailed errors

## 🎯 Roadmap

- [ ] Support for GitLab and Bitbucket
- [ ] Real-time collaboration features
- [ ] Advanced AI fix customization
- [ ] Integration with CI/CD pipelines
- [ ] Custom security rule definitions
