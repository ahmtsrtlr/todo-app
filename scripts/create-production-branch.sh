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

# Check if production branch exists locally
if git show-ref --verify --quiet refs/heads/production; then
    echo "Production branch exists locally. Checking out..."
    git checkout production
else
    echo "Creating production branch from origin/$BASE_BRANCH..."
    git checkout -b production origin/$BASE_BRANCH
fi

# Push to remote
echo "Pushing production branch to remote..."
git push -u origin production

echo "✅ Production branch created and pushed successfully!"
echo ""
echo "Next steps:"
echo "1. Set up branch protection rules in GitHub repository settings"
echo "2. Configure CI/CD pipelines for production deployments"
echo "3. Create a release workflow for promoting changes from main to production"
