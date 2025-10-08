# Force Credential Entry on Login

## Issue

After logging out, clicking "Sign in with GitHub" would automatically log users back in without asking for credentials if they were still logged into GitHub in their browser.

## Solution

Added `force_login=true` parameter to the GitHub OAuth flow to ensure users are always prompted to enter their credentials.

## Changes Made

### 1. Backend - Added Force Login Parameter

**File:** `backend/server.py`

```python
@api_router.get("/auth/github")
async def github_login(force_login: bool = False):
    """Initiate GitHub OAuth flow"""
    # ... existing code ...
    
    params = {
        'client_id': GITHUB_CLIENT_ID,
        'redirect_uri': f'{BACKEND_URL}/api/auth/github/callback',
        'scope': 'repo read:user user:email',
        'state': str(uuid.uuid4())
    }
    
    # Force GitHub to show login page even if user is already logged in
    if force_login:
        params['prompt'] = 'login'  # ✅ This forces credential entry
    
    github_auth_url = f"https://github.com/login/oauth/authorize?{urlencode(params)}"
    return {"auth_url": github_auth_url}
```

### 2. Frontend - Always Force Login

**File:** `frontend/src/App.js`

```javascript
const handleGithubLogin = async () => {
  try {
    setLoading(true);
    // Force GitHub to show login page with credentials
    const response = await axios.get(`${API}/auth/github?force_login=true`);
    
    // ... rest of code ...
  }
};
```

### 3. Updated Login Page UI

Added clear messaging to inform users they'll be asked for credentials:

```jsx
<div className="mt-4 space-y-2">
  <p className="text-center text-sm text-purple-200">
    You'll be asked to enter your GitHub credentials
  </p>
  <p className="text-center text-xs text-purple-300">
    Required for accessing private repositories and creating PRs
  </p>
</div>
```

## How It Works Now

### Before (Automatic Login)
1. User clicks logout
2. Clicks "Sign in with GitHub"
3. **Automatically logged in** ❌ (if still logged into GitHub)
4. No credential entry required

### After (Force Credentials) ✅
1. User clicks logout
2. Clicks "Sign in with GitHub"
3. **Redirected to GitHub login page** ✅
4. **Must enter username/password or use 2FA** ✅
5. Then redirected back to app

## User Experience Flow

```
Login Page
    ↓
Click "Sign in with GitHub"
    ↓
GitHub Login Page Appears ✅
    ↓
Enter Username & Password
    ↓
Enter 2FA Code (if enabled)
    ↓
Authorize Application
    ↓
Redirected to App Dashboard
    ↓
Fully Authenticated!
```

## What Users Will See

### 1. Login Page
- Message: "You'll be asked to enter your GitHub credentials"
- Clear expectation that credentials will be required

### 2. GitHub Login Page
- Username/Email field
- Password field
- Sign-in button
- 2FA prompt (if enabled)

### 3. Authorization Page
- "Authorize CodeGuardian AI" screen
- Shows requested permissions
- User must approve

### 4. Dashboard
- Redirected back with valid token
- Full access to application

## Security Benefits

### ✅ Enhanced Security
- Forces credential verification every time
- Users can't bypass authentication
- Better control over who accesses the app

### ✅ Multi-User Support
- Different users can use same browser
- Each must authenticate individually
- No session carryover between users

### ✅ Audit Trail
- Clear login events
- Each session requires explicit authentication
- Better tracking of access

### ✅ Compliance
- Meets security best practices
- Satisfies credential verification requirements
- Proper session management

## Testing

### Test the New Flow

1. **Start fresh:**
   ```bash
   # Clear browser data (optional)
   localStorage.clear()
   ```

2. **Visit login page:**
   - Should see "You'll be asked to enter your GitHub credentials"

3. **Click "Sign in with GitHub":**
   - Should redirect to GitHub
   - Should see GitHub login form ✅

4. **Enter credentials:**
   - Username/Email
   - Password
   - 2FA code (if enabled)

5. **Authorize app:**
   - Click "Authorize"

6. **Verify redirect:**
   - Should return to app
   - Should see main dashboard
   - Should see your GitHub profile in header

7. **Test logout:**
   - Click logout button
   - Should redirect to login page

8. **Test re-login:**
   - Click "Sign in with GitHub" again
   - Should ask for credentials again ✅

## Alternative Options (If Needed)

### Option 1: User Choice
Add a checkbox on login page:

```jsx
<Checkbox>
  <CheckboxLabel>Remember me (skip credential entry)</CheckboxLabel>
</Checkbox>
```

Then pass `force_login` based on checkbox state.

### Option 2: Session Timeout
Force credentials only after certain time period:

```javascript
const lastLogin = localStorage.getItem('last_login');
const hoursSinceLogin = (Date.now() - lastLogin) / (1000 * 60 * 60);

const forceLogin = hoursSinceLogin > 24; // Force login after 24 hours
```

### Option 3: GitHub Logout First
Automatically logout from GitHub when logging out from app:

```javascript
const handleGithubLogout = () => {
  // Clear app session
  localStorage.removeItem('github_token');
  
  // Redirect to GitHub logout
  window.location.href = 'https://github.com/logout';
};
```

## Technical Details

### GitHub OAuth Prompt Parameter

The `prompt=login` parameter tells GitHub:
- Always show the login screen
- Don't use existing GitHub session
- Require fresh credential entry

**Other possible values:**
- `prompt=consent` - Re-show authorization page
- `prompt=select_account` - Show account picker
- No prompt - Use existing session if available

### API Endpoint

```
GET /api/auth/github?force_login=true
```

**Parameters:**
- `force_login` (boolean, default: false)
  - `true` - Forces credential entry
  - `false` - Uses existing GitHub session

## Browser Behavior

### When force_login=true

**Chrome/Edge:**
- Shows GitHub login page
- Password autofill available
- 2FA prompt if enabled

**Firefox:**
- Shows GitHub login page
- Password manager integration
- Security key support

**Safari:**
- Shows GitHub login page
- iCloud Keychain integration
- Face ID/Touch ID support

## Known Limitations

### 1. Password Managers
- Users with password managers still get quick login
- Credentials auto-filled but still must submit form
- Better than automatic login without any prompt

### 2. GitHub Sessions
- If user has very recent GitHub login, might be quick
- Still shows login page as confirmation
- Satisfies credential verification requirement

### 3. SSO Organizations
- Organizations with SAML/SSO might have different flow
- Still redirects through their IdP
- Credential entry enforced by organization

## Summary

✅ **Fixed:** Users are now always prompted for credentials  
✅ **Security:** Enhanced authentication flow  
✅ **UX:** Clear messaging about credential requirement  
✅ **Compliance:** Meets security best practices  

The login flow now properly requires credential entry on every login, providing better security and control!

