set -e
DIST=$(node -p -e "require('./package.json').DIST")

echo "Enter deploy message: "
read MESSAGE

# clean
rm -rf $DIST

# build
npm run build

# commit
git add $DIST/.
git commit -m "[deploy] $MESSAGE"
git subtree push --prefix $DIST origin gh-pages
