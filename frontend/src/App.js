import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Progress } from './components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './components/ui/dialog';
import { Label } from './components/ui/label';
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  GitBranch, 
  Shield, 
  Bug, 
  Code, 
  Zap, 
  Trash2, 
  X,
  Brain,
  Server,
  Target,
  TrendingUp,
  Lock,
  Cpu,
  Database,
  TestTube,
  Layers,
  Activity,
  Wand2,
  GitPullRequest,
  Github,
  LogOut,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { useToast } from './hooks/use-toast';
import { Toaster } from './components/ui/toaster';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// GitHub Login Page Component
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGithubLogin = async () => {
    try {
      setLoading(true);
      // Force GitHub to show login page with credentials even if user is already logged in
      const response = await axios.get(`${API}/auth/github?force_login=true`);
      
      // Check if OAuth is configured
      if (response.data.error) {
        toast({
          title: 'GitHub OAuth Not Configured',
          description: response.data.message || 'Please configure GitHub OAuth in the backend .env file.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }
      
      const authUrl = response.data.auth_url;
      
      // Redirect to GitHub OAuth - will show GitHub login page with credentials
      window.location.href = authUrl;
    } catch (error) {
      console.error('Failed to initiate GitHub login:', error);
      setLoading(false);
      
      // Handle 503 Service Unavailable (OAuth not configured)
      if (error.response?.status === 503) {
        toast({
          title: 'GitHub OAuth Not Configured',
          description: error.response.data?.message || 'Please set up GitHub OAuth. See GITHUB_SETUP.md for instructions.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Login Failed',
          description: 'Could not connect to GitHub. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl shadow-2xl">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-3">
            CodeGuardian AI
          </h1>
          <p className="text-xl text-purple-200">
            Advanced Code Analysis Agent
          </p>
        </div>

        {/* Features */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start gap-3 text-white">
              <Shield className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold">Deep Security Scanning</div>
                <div className="text-sm text-purple-200">Comprehensive vulnerability detection</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-white">
              <Wand2 className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold">AI-Powered Auto-Fixing</div>
                <div className="text-sm text-purple-200">Intelligent code fixes with Gemini AI</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-white">
              <GitPullRequest className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold">Automated Pull Requests</div>
                <div className="text-sm text-purple-200">One-click PR creation with fixes</div>
              </div>
            </div>
            <div className="flex items-start gap-3 text-white">
              <Lock className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold">Private Repository Support</div>
                <div className="text-sm text-purple-200">Analyze private and public repos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login Button */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardContent className="pt-6">
            <Button
              onClick={handleGithubLogin}
              disabled={loading}
              className="w-full h-14 text-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xl"
            >
              {loading ? (
                <>
                  <Clock className="h-5 w-5 mr-3 animate-spin" />
                  Connecting to GitHub...
                </>
              ) : (
                <>
                  <Github className="h-5 w-5 mr-3" />
                  Sign in with GitHub
                </>
              )}
            </Button>
            <div className="mt-4 space-y-2">
              <p className="text-center text-sm text-purple-200">
                You'll be asked to enter your GitHub credentials
              </p>
              <p className="text-center text-xs text-purple-300">
                Required for accessing private repositories and creating PRs
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-sm text-purple-300">
            By signing in, you agree to access your GitHub repositories
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-purple-400">
            <Lock className="h-3 w-3" />
            <span>Secure OAuth 2.0 Authentication</span>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

const Home = () => {
  const [gitUrl, setGitUrl] = useState('');
  const [analysisDepth, setAnalysisDepth] = useState('comprehensive');
  const [analyses, setAnalyses] = useState([]);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fixingIssues, setFixingIssues] = useState(new Set()); // Track which issues are being fixed
  const { toast } = useToast();
  
  // GitHub authentication state
  const [githubToken, setGithubToken] = useState(localStorage.getItem('github_token') || '');
  const [githubUser, setGithubUser] = useState(null);
  const [showBranchDialog, setShowBranchDialog] = useState(false);
  const [branchName, setBranchName] = useState('codeguardian-ai-fixes');
  const [targetBranch, setTargetBranch] = useState('main');

  // Fetch GitHub user info on component mount
  useEffect(() => {
    const token = localStorage.getItem('github_token');
    if (token) {
      fetchGithubUserInfo(token);
    }
  }, []);
  
  const fetchGithubUserInfo = async (token) => {
    try {
      const response = await axios.get(`${API}/auth/github/user?token=${token}`);
      setGithubUser(response.data);
      setGithubToken(token);
    } catch (error) {
      console.error('Failed to fetch GitHub user info:', error);
      // Token might be invalid, clear it
      handleGithubLogout();
    }
  };
  
  const handleGithubLogout = () => {
    setGithubToken('');
    setGithubUser(null);
    localStorage.removeItem('github_token');
    
    toast({
      title: 'Logged Out',
      description: 'You have been logged out. Redirecting to login...',
    });
    
    // Redirect to login page after a short delay
    setTimeout(() => {
      window.location.href = '/login';
    }, 1500);
  };

  const applyAiFix = async (analysisId, issueIndex) => {
    const fixKey = `${analysisId}-${issueIndex}`;
    setFixingIssues(prev => new Set([...prev, fixKey]));
    
    try {
      const response = await axios.post(`${API}/analysis/${analysisId}/apply-ai-fix?issue_index=${issueIndex}`);
      console.log("response", response);
      toast({
        title: 'AI Fix Applied',
        description: 'The issue has been automatically fixed by AI',
      });
      
      // Refresh the current analysis to show the new fix
      const updatedAnalysis = await axios.get(`${API}/analysis/${analysisId}`);
      setCurrentAnalysis(updatedAnalysis.data);
      
      // Also refresh the analyses list
      fetchAnalyses();
      
    } catch (error) {
      console.error('Failed to apply AI fix:', error);
      toast({
        title: 'Fix Failed',
        description: 'Could not apply the AI fix. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setFixingIssues(prev => {
        const newSet = new Set(prev);
        newSet.delete(fixKey);
        return newSet;
      });
    }
  };

  const connectRepository = async (analysisId) => {
    if (!githubToken) {
      toast({
        title: 'GitHub Login Required',
        description: 'Please log in with GitHub to create pull requests',
        variant: 'destructive',
      });
      return;
    }
    
    setShowBranchDialog(true);
  };
  
  const createBranchAndPR = async () => {
    if (!currentAnalysis) return;
    
    try {
      setLoading(true);
      
      // Create branch
      const branchResponse = await axios.post(
        `${API}/github/create-branch?github_token=${githubToken}`,
        {
          analysis_id: currentAnalysis.id,
          branch_name: branchName,
          target_branch: targetBranch
        }
      );
      
      toast({
        title: 'Branch Created',
        description: `Branch "${branchName}" created successfully`,
      });
      
      // Commit fixes
      const commitResponse = await axios.post(
        `${API}/github/commit-fixes?analysis_id=${currentAnalysis.id}&branch_name=${branchName}&github_token=${githubToken}`
      );
      
      const filesModified = commitResponse.data.files_modified || [];
      const filesMessage = filesModified.length > 0 
        ? `Modified ${filesModified.length} file(s): ${filesModified.slice(0, 3).join(', ')}${filesModified.length > 3 ? '...' : ''}`
        : 'AI fixes committed successfully';
      
      toast({
        title: 'Fixes Committed to Source Files',
        description: filesMessage,
      });
      
      // Create pull request
      const prResponse = await axios.post(
        `${API}/github/create-pr?github_token=${githubToken}`,
        {
          analysis_id: currentAnalysis.id,
          branch_name: branchName,
          title: `CodeGuardian AI Fixes - ${currentAnalysis.repo_name}`,
          description: `Automated fixes for ${currentAnalysis.security_findings?.length || 0} security issues and ${currentAnalysis.code_quality_issues?.length || 0} quality issues.`,
          target_branch: targetBranch
        }
      );
      
      toast({
        title: 'Pull Request Created!',
        description: `PR #${prResponse.data.pr_number} created successfully`,
      });
      
      // Open PR in new tab
      if (prResponse.data.pr_url) {
        window.open(prResponse.data.pr_url, '_blank');
      }
      
      setShowBranchDialog(false);
      
    } catch (error) {
      console.error('Failed to create branch and PR:', error);
      toast({
        title: 'Failed to Create PR',
        description: error.response?.data?.detail || 'Could not create pull request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalyses = async () => {
    try {
      console.log('Fetching analyses from:', `${API}/analyses`);
      const response = await axios.get(`${API}/analyses`);
      console.log('Analyses fetched:', response.data);
      setAnalyses(response.data || []);
    } catch (error) {
      console.error('Failed to fetch analyses:', error);
      console.error('Error details:', error.response?.data);
      toast({
        title: 'Warning',
        description: 'Could not load analysis history. Check if backend is running.',
        variant: 'destructive',
      });
    }
  };

  const deleteAnalysis = async (analysisId, repoName) => {
    try {
      await axios.delete(`${API}/analysis/${analysisId}`);
      
      setAnalyses(prev => prev.filter(analysis => analysis.id !== analysisId));
      
      if (currentAnalysis && currentAnalysis.id === analysisId) {
        setCurrentAnalysis(null);
      }
      
      toast({
        title: 'Analysis Deleted',
        description: `Successfully deleted analysis for ${repoName}`,
      });
    } catch (error) {
      console.error('Failed to delete analysis:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete analysis. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const startAnalysis = async () => {
    if (!gitUrl.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a Git repository URL',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/analyze`, {
        git_url: gitUrl.trim(),
        analysis_depth: analysisDepth,
        github_token: githubToken || null  // Include GitHub token for private repos
      });
      
      setCurrentAnalysis(response.data);
      setGitUrl('');
      fetchAnalyses();
      
      toast({
        title: 'Advanced Analysis Started',
        description: 'AI-powered comprehensive analysis initiated. This may take several minutes.',
      });

      // Poll for updates
      pollAnalysis(response.data.id);
    } catch (error) {
      console.error('Failed to start analysis:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to start repository analysis. Please check the URL and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const pollAnalysis = async (analysisId) => {
    const maxAttempts = 60; // 10 minutes max
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await axios.get(`${API}/analysis/${analysisId}`);
        const analysis = response.data;
        
        setCurrentAnalysis(analysis);
        
        if (analysis.status === 'completed' || analysis.status === 'failed') {
          fetchAnalyses();
          return;
        }
        
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 10000); // Poll every 10 seconds
        }
      } catch (error) {
        console.error('Failed to poll analysis:', error);
      }
    };

    poll();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'analyzing': return <Brain className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRatingColor = (rating) => {
    switch (rating?.toUpperCase()) {
      case 'A': return 'text-green-600';
      case 'B': return 'text-blue-600';
      case 'C': return 'text-yellow-600';
      case 'D': return 'text-orange-600';
      case 'F': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getDeploymentReadinessColor = (readiness) => {
    switch (readiness) {
      case 'ready': return 'text-green-600 bg-green-100';
      case 'needs_work': return 'text-yellow-600 bg-yellow-100';
      case 'not_ready': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  useEffect(() => {
    fetchAnalyses();
    // Set up periodic refresh for analyses
    const intervalId = setInterval(() => {
      fetchAnalyses();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1"></div>
            <div className="inline-flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CodeGuardian AI Agent
              </h1>
            </div>
            <div className="flex-1 flex justify-end">
              {githubUser && (
                <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-md">
                  {githubUser.avatar_url && (
                    <img src={githubUser.avatar_url} alt="GitHub avatar" className="w-8 h-8 rounded-full" />
                  )}
                  <div className="text-left">
                    <div className="text-sm font-medium text-slate-800">{githubUser.login}</div>
                    <div className="text-xs text-slate-500">GitHub Connected</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleGithubLogout}
                    className="ml-2"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Advanced AI-powered code analysis agent with Docker sandbox execution, deep security scanning, 
            performance analysis, and intelligent auto-fixing capabilities.
          </p>
        </div>

        {/* Analysis Input */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm" data-testid="analysis-input-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Advanced Repository Analysis
            </CardTitle>
            <CardDescription>
              Enter a Git repository URL for comprehensive AI-powered analysis with Docker sandbox execution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="https://github.com/username/repository.git"
                value={gitUrl}
                onChange={(e) => setGitUrl(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && startAnalysis()}
                data-testid="git-url-input"
              />
              <Select value={analysisDepth} onValueChange={setAnalysisDepth}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Analysis</SelectItem>
                  <SelectItem value="standard">Standard Analysis</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={startAnalysis} 
                disabled={loading}
                className="px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                data-testid="analyze-button"
              >
                {loading ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Start AI Analysis
                  </>
                )}
              </Button>
            </div>
            
            {/* Analysis Depth Description */}
            <div className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
              <strong>Analysis Depths:</strong> 
              <ul className="mt-1 space-y-1">
                <li><strong>Basic:</strong> Code scanning, basic security checks</li>
                <li><strong>Standard:</strong> + Dependencies, build testing, performance analysis</li>
                <li><strong>Comprehensive:</strong> + AI architecture analysis, execution testing, advanced security</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Current Analysis */}
        {currentAnalysis && (
          <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm" data-testid="current-analysis">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(currentAnalysis.status)}
                  Current Analysis: {currentAnalysis.repo_name}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="capitalize">
                    {currentAnalysis.status}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {currentAnalysis.analysis_depth}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentAnalysis(null)}
                    className="h-6 w-6 p-0"
                    data-testid="close-current-analysis"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                {currentAnalysis.git_url}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentAnalysis.status === 'completed' ? (
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-7">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="quality">Quality</TabsTrigger>
                    <TabsTrigger value="ai-fixes">AI Fixes</TabsTrigger>
                    <TabsTrigger value="architecture">Architecture</TabsTrigger>
                    <TabsTrigger value="execution">Execution</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{currentAnalysis.total_files || 0}</div>
                        <div className="text-sm text-slate-600">Files Analyzed</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{currentAnalysis.lines_of_code || 0}</div>
                        <div className="text-sm text-slate-600">Lines of Code</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{currentAnalysis.security_findings?.length || 0}</div>
                        <div className="text-sm text-slate-600">Security Issues</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{currentAnalysis.ai_fixes_applied?.length || 0}</div>
                        <div className="text-sm text-slate-600">AI Fixes Applied</div>
                      </div>
                    </div>

                    {/* AI Ratings */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <Shield className="h-8 w-8 text-red-500" />
                            <div>
                              <div className="text-sm text-slate-600">Security Rating</div>
                              <div className={`text-2xl font-bold ${getRatingColor(currentAnalysis.security_rating)}`}>
                                {currentAnalysis.security_rating || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <Code className="h-8 w-8 text-blue-500" />
                            <div>
                              <div className="text-sm text-slate-600">Code Quality Rating</div>
                              <div className={`text-2xl font-bold ${getRatingColor(currentAnalysis.code_quality_rating)}`}>
                                {currentAnalysis.code_quality_rating || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <TrendingUp className="h-8 w-8 text-green-500" />
                            <div>
                              <div className="text-sm text-slate-600">Performance Rating</div>
                              <div className={`text-2xl font-bold ${getRatingColor(currentAnalysis.performance_rating)}`}>
                                {currentAnalysis.performance_rating || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Technologies & Deployment Readiness */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Layers className="h-5 w-5" />
                            Technologies Detected
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div>
                              <span className="font-medium">Languages: </span>
                              {currentAnalysis.languages_detected?.join(', ') || 'None detected'}
                            </div>
                            <div>
                              <span className="font-medium">Frameworks: </span>
                              {currentAnalysis.framework_detected?.join(', ') || 'None detected'}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Deployment & Repository
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Badge className={`text-sm px-3 py-1 mb-3 ${getDeploymentReadinessColor(currentAnalysis.deployment_readiness)}`}>
                            {currentAnalysis.deployment_readiness || 'Unknown'}
                          </Badge>
                          <div className="mt-2 text-sm text-slate-600 mb-3">
                            Analysis Duration: {currentAnalysis.analysis_duration ? `${currentAnalysis.analysis_duration.toFixed(1)}s` : 'N/A'}
                          </div>
                          
                          {/* Repository Connection Button */}
                          <Button
                            size="sm"
                            onClick={() => connectRepository(currentAnalysis.id)}
                            variant="outline"
                            className="w-full"
                            data-testid="connect-repo-button"
                          >
                            <GitPullRequest className="h-4 w-4 mr-2" />
                            Connect Repository
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="security" className="space-y-4">
                    {currentAnalysis.security_findings && currentAnalysis.security_findings.length > 0 ? (
                      currentAnalysis.security_findings.map((finding, idx) => {
                        const globalIndex = idx; // Security findings start at index 0
                        const fixKey = `${currentAnalysis.id}-${globalIndex}`;
                        const isFixing = fixingIssues.has(fixKey);
                        
                        return (
                          <Card key={idx} className="border-l-4 border-l-red-500">
                            <CardContent className="pt-6">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="font-medium text-slate-800">{finding.file_path}</div>
                                  {finding.line_number && (
                                    <div className="text-sm text-slate-500 mb-2">Line {finding.line_number}</div>
                                  )}
                                  <p className="text-sm text-slate-700 mb-2">{finding.description}</p>
                                  {finding.fix_suggestion && (
                                    <p className="text-sm text-blue-600 mb-3">{finding.fix_suggestion}</p>
                                  )}
                                  
                                  {/* AI Auto-Fix Button */}
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() => applyAiFix(currentAnalysis.id, globalIndex)}
                                      disabled={isFixing}
                                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                                      data-testid={`ai-fix-security-${globalIndex}`}
                                    >
                                      {isFixing ? (
                                        <>
                                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                                          Fixing...
                                        </>
                                      ) : (
                                        <>
                                          <Wand2 className="h-4 w-4 mr-2" />
                                          AI Auto-Fix
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </div>
                                <Badge className={`ml-2 ${finding.severity === 'critical' ? 'bg-red-600' : finding.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'} text-white`}>
                                  {finding.severity}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <Shield className="h-12 w-12 mx-auto mb-4 text-green-500" />
                        <p>No security vulnerabilities detected!</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="performance" className="space-y-4">
                    {currentAnalysis.performance_issues && currentAnalysis.performance_issues.length > 0 ? (
                      currentAnalysis.performance_issues.map((issue, idx) => (
                        <Card key={idx} className="border-l-4 border-l-yellow-500">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="font-medium text-slate-800">{issue.file_path}</div>
                                {issue.function_name && (
                                  <div className="text-sm text-slate-500 mb-2">Function: {issue.function_name}</div>
                                )}
                                <p className="text-sm text-slate-700 mb-2">{issue.issue}</p>
                                <p className="text-sm text-blue-600">{issue.optimization_suggestion}</p>
                                {issue.estimated_improvement && (
                                  <div className="text-sm text-green-600 mt-1">
                                    Estimated improvement: {issue.estimated_improvement}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <TrendingUp className="h-12 w-12 mx-auto mb-4 text-green-500" />
                        <p>No performance issues detected!</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="quality" className="space-y-4">
                    {currentAnalysis.code_quality_issues && currentAnalysis.code_quality_issues.length > 0 ? (
                      currentAnalysis.code_quality_issues.map((issue, idx) => {
                        const globalIndex = (currentAnalysis.security_findings?.length || 0) + idx; // Quality issues after security
                        const fixKey = `${currentAnalysis.id}-${globalIndex}`;
                        const isFixing = fixingIssues.has(fixKey);
                        
                        return (
                          <Card key={idx} className="border-l-4 border-l-blue-500">
                            <CardContent className="pt-6">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="font-medium text-slate-800">{issue.file_path}</div>
                                  {issue.line_number && (
                                    <div className="text-sm text-slate-500 mb-2">Line {issue.line_number}</div>
                                  )}
                                  <p className="text-sm text-slate-700 mb-2">{issue.issue}</p>
                                  <p className="text-sm text-blue-600 mb-3">{issue.suggestion}</p>
                                  
                                  {/* AI Auto-Fix Button for auto-fixable issues */}
                                  {issue.auto_fixable && (
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        onClick={() => applyAiFix(currentAnalysis.id, globalIndex)}
                                        disabled={isFixing}
                                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                                        data-testid={`ai-fix-quality-${globalIndex}`}
                                      >
                                        {isFixing ? (
                                          <>
                                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                                            Fixing...
                                          </>
                                        ) : (
                                          <>
                                            <Wand2 className="h-4 w-4 mr-2" />
                                            AI Auto-Fix
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-start gap-2 ml-4">
                                  <Badge className={`${issue.severity === 'high' ? 'bg-orange-500' : 'bg-blue-500'} text-white`}>
                                    {issue.severity}
                                  </Badge>
                                  {issue.auto_fixable && (
                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                      Auto-fixable
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <Code className="h-12 w-12 mx-auto mb-4 text-green-500" />
                        <p>No code quality issues detected!</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="ai-fixes" className="space-y-4">
                    {currentAnalysis.ai_fixes_applied && currentAnalysis.ai_fixes_applied.length > 0 ? (
                      currentAnalysis.ai_fixes_applied.map((fix, idx) => (
                        <Card key={idx} className="border-l-4 border-l-green-500">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="font-medium text-slate-800 mb-1">AI Fix Applied</div>
                                <div className="text-sm text-slate-500 mb-2">
                                  Confidence Score: {(fix.confidence_score * 100).toFixed(1)}%
                                </div>
                                <p className="text-sm text-slate-700 mb-2">{fix.explanation}</p>
                              </div>
                              <Badge className="ml-2 bg-green-500 text-white">
                                {fix.validated ? 'Validated' : 'Pending'}
                              </Badge>
                            </div>
                            
                            {fix.original_code && fix.fixed_code && (
                              <div className="space-y-3">
                                <Separator />
                                <div>
                                  <div className="text-sm font-medium text-red-600 mb-2">Before:</div>
                                  <div className="bg-red-50 border border-red-200 rounded p-3 max-h-60 overflow-y-auto">
                                    <code className="text-sm text-red-800 whitespace-pre-wrap break-words">
                                      {fix.original_code}
                                    </code>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-green-600 mb-2">After (AI Fixed):</div>
                                  <div className="bg-green-50 border border-green-200 rounded p-3 max-h-60 overflow-y-auto">
                                    <code className="text-sm text-green-800 whitespace-pre-wrap break-words">
                                      {fix.fixed_code}
                                    </code>
                                  </div>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <Wand2 className="h-12 w-12 mx-auto mb-4" />
                        <p>No AI fixes have been applied yet.</p>
                        <p className="text-sm mt-2">Use the "AI Auto-Fix" buttons in other tabs to generate fixes.</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="architecture" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Brain className="h-5 w-5" />
                          AI Architecture Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                          {currentAnalysis.architecture_analysis || 'AI architecture analysis is not available.'}
                        </p>
                      </CardContent>
                    </Card>

                    {currentAnalysis.recommendations && currentAnalysis.recommendations.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            AI Recommendations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {currentAnalysis.recommendations.map((rec, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-slate-700">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="execution" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Build Results
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            {currentAnalysis.build_successful ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            )}
                            <span className="font-medium">
                              {currentAnalysis.build_successful ? 'Build Successful' : 'Build Failed'}
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TestTube className="h-5 w-5" />
                            Test Execution
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-slate-600">
                            {currentAnalysis.test_results?.length > 0 ? (
                              <div>Tests executed: {currentAnalysis.test_results.length}</div>
                            ) : (
                              <div>No tests executed</div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {currentAnalysis.execution_logs && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Execution Logs</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <pre className="text-xs bg-slate-900 text-green-400 p-4 rounded overflow-auto max-h-60">
                            {currentAnalysis.execution_logs}
                          </pre>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              ) : currentAnalysis.status === 'analyzing' ? (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 mx-auto mb-4 text-purple-500 animate-pulse" />
                  <p className="text-slate-600 mb-2">AI Agent is analyzing your repository...</p>
                  <p className="text-sm text-slate-500">
                    Docker sandbox execution in progress. This may take several minutes.
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <p className="text-slate-600">Initializing analysis...</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Analysis History */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Analysis History</CardTitle>
            <CardDescription>Previous comprehensive repository analyses</CardDescription>
          </CardHeader>
          <CardContent>
            {analyses.length > 0 ? (
              <div className="space-y-4">
                {analyses.map((analysis) => (
                  <div key={analysis.id} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(analysis.status)}
                          <span className="font-medium">{analysis.repo_name}</span>
                          <Badge variant="secondary" className="capitalize text-xs">
                            {analysis.status}
                          </Badge>
                          <Badge variant="outline" className="capitalize text-xs">
                            {analysis.analysis_depth}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-500 mb-2">{analysis.git_url}</div>
                        {analysis.status === 'completed' && (
                          <div className="flex gap-4 text-sm">
                            <span className="text-slate-600">
                              {analysis.total_files} files
                            </span>
                            <span className="text-red-600">
                              {analysis.security_findings?.length || 0} security
                            </span>
                            <span className="text-blue-600">
                              {analysis.code_quality_issues?.length || 0} quality
                            </span>
                            <span className="text-green-600">
                              {analysis.ai_fixes_applied?.length || 0} fixes
                            </span>
                            {analysis.deployment_readiness && (
                              <Badge className={`text-xs ${getDeploymentReadinessColor(analysis.deployment_readiness)}`}>
                                {analysis.deployment_readiness}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentAnalysis(analysis)}
                          data-testid={`view-analysis-${analysis.id}`}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteAnalysis(analysis.id, analysis.repo_name)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          data-testid={`delete-analysis-${analysis.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <Brain className="h-12 w-12 mx-auto mb-4" />
                <p>No analyses yet. Start by analyzing your first repository!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Branch and PR Creation Dialog */}
        <Dialog open={showBranchDialog} onOpenChange={setShowBranchDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Create Pull Request
              </DialogTitle>
              <DialogDescription>
                Create a new branch and pull request with your AI fixes
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="branchName">Branch Name</Label>
                <Input
                  id="branchName"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  placeholder="codeguardian-ai-fixes"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetBranch">Target Branch (Base)</Label>
                <Select value={targetBranch} onValueChange={setTargetBranch}>
                  <SelectTrigger id="targetBranch">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">main</SelectItem>
                    <SelectItem value="master">master</SelectItem>
                    <SelectItem value="develop">develop</SelectItem>
                    <SelectItem value="dev">dev</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500">
                  The branch where you want to merge your changes
                </p>
              </div>
              
              {currentAnalysis && (
                <div className="bg-slate-50 p-3 rounded-lg space-y-1 text-sm">
                  <div><strong>Repository:</strong> {currentAnalysis.repo_name}</div>
                  <div><strong>Fixes to Apply:</strong> {currentAnalysis.ai_fixes_applied?.length || 0}</div>
                  <div><strong>Security Issues:</strong> {currentAnalysis.security_findings?.length || 0}</div>
                  <div><strong>Quality Issues:</strong> {currentAnalysis.code_quality_issues?.length || 0}</div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowBranchDialog(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={createBranchAndPR}
                disabled={loading || !branchName.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {loading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <GitPullRequest className="h-4 w-4 mr-2" />
                    Create PR
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Toaster />
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('github_token') || localStorage.getItem('github_token');
      
      if (token) {
        try {
          // Validate token with backend
          const response = await axios.get(`${API}/auth/github/user?token=${token}`);
          if (response.data.authenticated) {
            setIsAuthenticated(true);
            // Store token if from URL
            if (urlParams.get('github_token')) {
              localStorage.setItem('github_token', token);
              // Clean up URL
              window.history.replaceState({}, document.title, '/');
            }
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem('github_token');
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          setIsAuthenticated(false);
          localStorage.removeItem('github_token');
        }
      } else {
        setIsAuthenticated(false);
      }
      
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 mx-auto mb-4 text-purple-600 animate-pulse" />
          <p className="text-slate-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;