## Paths

* `/` home page that allows users to either register or login
* `/admin/` shows all of the options as an admin
* `/admin/users` shows all of the users signed up
* `/admin/createrace` creates a race
* `/admin/createrunninggroup` creates a running group
* `/race/` shows all of the races 
* `/race/{id}` shows the details of a race
* `/user/{id}` shows the details of a person
* `/user/register` allows a user to register for the site
* `/running_group` shows all running groups
* `/running_group/{id}` shows the details of the running group
  
## Run Code:
Make sure to use: `node v11.10.0 (npm v6.7.0)`. To get it, use: `nvm install stable`
```
*  npm install
*  nvm install stable
*  knex migrate:latest --env development
*  knex seed:run --env development
*  npm start
```