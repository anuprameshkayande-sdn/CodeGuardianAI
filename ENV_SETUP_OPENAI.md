# Environment Setup for OpenAI

## Quick Start

### 1. Create `.env` file in `backend/` directory

```bash
cd backend
touch .env
```

### 2. Add your OpenAI API key

Open `backend/.env` and add:

```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017/
DB_NAME=codemate

# OpenAI API Configuration (REQUIRED)
OPENAI_API_KEY=sk-proj-your_actual_api_key_here

# GitHub OAuth (Optional - only for private repos)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Server URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
CORS_ORIGINS=http://localhost:3000
```

### 3. Get Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Name it (e.g., "CodeMate")
4. Copy the key (starts with `sk-proj-...`)
5. Paste it in your `.env` file

**⚠️ Important:** 
- Keep your API key secret!
- Never commit `.env` to git
- The key starts with `sk-proj-` or `sk-`

### 4. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 5. Start the Backend

```bash
cd backend
python server.py
```

## Verification

If everything is set up correctly, you should see:

```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

## Troubleshooting

### "OPENAI_API_KEY not found"

**Problem:** The `.env` file doesn't exist or is in the wrong location.

**Solution:**
```bash
cd backend
ls -la .env  # Should show the file
```

If it doesn't exist, create it with the template above.

### "Invalid API key"

**Problem:** The API key is incorrect or expired.

**Solution:**
1. Get a new key from https://platform.openai.com/api-keys
2. Update `backend/.env`
3. Restart the server

### "Rate limit exceeded"

**Problem:** You've made too many requests to OpenAI.

**Solution:**
- Wait a few minutes
- Check your usage at https://platform.openai.com/usage
- Consider upgrading your OpenAI plan

## Cost Estimation

With **GPT-4o-mini**, costs are very low:

- **Input:** $0.15 per 1M tokens
- **Output:** $0.60 per 1M tokens

**Example:** Analyzing a 1000-line codebase:
- ~10,000 tokens input
- ~5,000 tokens output
- **Cost:** ~$0.004 (less than half a cent)

**Free tier:** $5 free credits when you sign up!

## Model Configuration

Default model: `gpt-4o-mini` (best balance of cost and quality)

To change the model, edit `backend/server.py`:

```python
# In AIAnalysisEngine class
self.model_name = "gpt-4o-mini"  # Change this line

# Options:
# "gpt-4o-mini"     - Recommended (cheap, fast, good quality)
# "gpt-3.5-turbo"   - Cheaper but less accurate
# "gpt-4o"          - More expensive but higher quality
# "gpt-4-turbo"     - Most expensive, best quality
```

## What Happened to Gemini?

We **migrated from Google Gemini to OpenAI** because:

1. ✅ **Better JSON responses** - More consistent structured output
2. ✅ **Proven reliability** - Industry standard for code analysis
3. ✅ **Better documentation** - Easier to maintain
4. ✅ **No "gpt-5-nano"** - User requested it, but it doesn't exist yet
5. ✅ **GPT-4o-mini** - Latest small model, perfect for this use case

All your existing data is preserved. No migration needed!

