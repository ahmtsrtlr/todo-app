# Production Branch Setup

## Overview
This document describes the production branch strategy for the Todo App.

## Branch Structure

### Main Branch (`main`)
- Primary development branch
- All feature branches merge here
- Should always be in a deployable state

### Production Branch (`production`)
- Stable release branch
- Contains production-ready code
- Deployments to production environment are made from this branch

## Creating the Production Branch

### Option 1: Using GitHub Actions (Recommended)
1. Go to the "Actions" tab in the GitHub repository
2. Select "Create Production Branch" workflow
3. Click "Run workflow"
4. Select the base branch (default: `main`)
5. Click "Run workflow" button

The workflow will automatically create the production branch from the specified base branch.

### Option 2: Manual Creation
If you have appropriate permissions and need to create the branch manually:

```bash
# Fetch the latest changes
git fetch origin

# Create production branch from main
git checkout -b production origin/main

# Push production branch to remote
git push -u origin production
```

## Deployment Strategy

### Development Flow
1. Feature branches → `main` (via pull requests)
2. `main` → `production` (via release process)

### Release Process
When ready to deploy to production:
1. Ensure all tests pass on `main`
2. Create a pull request from `main` to `production`
3. After review and approval, merge to `production`
4. Tag the merge commit with a version number (e.g., `v1.0.0`)
5. Production deployment is triggered automatically

## Branch Protection

It's recommended to set up branch protection rules for the production branch:
- Require pull request reviews before merging
- Require status checks to pass
- Restrict who can push to the branch
- Require signed commits (optional)

## Hotfix Process

For urgent production fixes:
1. Create hotfix branch from `production`
2. Make necessary fixes
3. Create PR to `production`
4. After merging, merge `production` back to `main` to sync changes
