$repoUrl="https://${PAT}:x-oauth-basic@github.com/${user}/${repo}.git"
cd ./dist
echo $CNAME > ./CNAME

git init
git remote add origin $repoUrl
git add *
git commit -m "Deployment"
git push origin master -f

cd ../
echo "Deployment successful."