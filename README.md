# fspt18-team-2

To get started:

- In MySQL, create a database named `artimdb`
- In the root folder of this project, create a `.env` file containing the next information:

```
DB_HOST = localhost
DB_USER = root
DB_PASS = YOURPASSWORD
DB_NAME = artimdb
```
- Run `npm install` to install the server's required packages
- Run `npm run migrate` to create your DB tables
- Next, `cd artim-app` and `npm install` to install all client dependencies