#!/bin/bash

# Script to create production branch
# This script provides an alternative to the GitHub Actions workflow

set -e

BASE_BRANCH="${1:-main}"

echo "Creating production branch from $BASE_BRANCH..."

# Fetch latest changes
git fetch origin

# Check if production branch already exists remotely
if git ls-remote --exit-code --heads origin production > /dev/null 2>&1; then
    echo "❌ Production branch already exists on remote"
    exit 1
fi

# If production branch exists locally but not on remote, delete it to avoid confusion
if git show-ref --verify --quiet refs/heads/production; then
    echo "⚠️  Local production branch exists but remote doesn't. Deleting local branch..."
    # Switch to base branch first if we're on production
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    if [ "$CURRENT_BRANCH" = "production" ]; then
        git checkout "$BASE_BRANCH"
    fi
    git branch -D production
fi

# Create production branch from origin base branch
echo "Creating production branch from origin/$BASE_BRANCH..."
git checkout -b production origin/$BASE_BRANCH

# Push to remote
echo "Pushing production branch to remote..."
git push -u origin production

echo "✅ Production branch created and pushed successfully!"
echo ""
echo "Next steps:"
echo "1. Set up branch protection rules in GitHub repository settings"
echo "2. Configure CI/CD pipelines for production deployments"
echo "3. Create a release workflow for promoting changes from main to production"
