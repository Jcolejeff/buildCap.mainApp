## How to add environment variables for deployment

 - The environment variable is added from github, as the production static files is built with github servers, ollow the follow steps to add a new `API_KEY` env. var.
 1. Add your environment variable as an action secret in github. you'll find it in settings>>secrets and variables>>actions>>new repository secrets, prefix the variable name with the branch you want it to.deploy. *e.g API_KEY for staging will be STAGING_API_KEY*
 2. Open the .github/workflows/staging.yml file, go to the *set environments* section, and add a new line
    ```echo VITE_API_KEY=${{ secrets.STAGING_API_KEY }} >> .env```
 
