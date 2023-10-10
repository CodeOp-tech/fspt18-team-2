# fspt18-team-2

# Artim: 

Creative hub & artist community

Re-imagining art!

Sharing resources, tips, events about fine arts & audio visual work and artists all over the world.

Post about your ideas, your work, your inspirations and inspire the world!


## Configuration
### Dependencies

To get started:

- In MySQL, create a database named `artimdb`:
    - `mysql -u root -p` to enter MySQL in a separate terminal
    - `create database artimdb;`
- In the root folder of this project, create a `.env` file containing the next information:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=YOURPASSWORD
DB_NAME=artimdb
JWT_SECRET=yoursecretlongkey (after adding JWT re-start the app)
```
- Run `node model/database.js` or `npm install` to install the server's required packages
- Run `npm run migrate` to create your DB tables
![schema](./drawSQL-remotogether-export-2023-08-19.png)
- Next, `cd artim-app` and `npm install` to install all client dependencies

### Run development servers

- Run `npm start` in project's folder to start Express server in port en el puerto 5001
- Do `cd artim-app` and run `npm run dev` to start client server in dev mode with *hot reloading in port 3001.
- You can check client's app at `http://localhost:3001`
- You can check API at `http://localhost:5001/nameoftable`

## How is the app

### 1. Backend

#### Tecnologies

    - ckeditor
    - axios
    - bcrypt
    - cors
    - dotenv
    - express
    - jsonwebtoken
    - morgan
    - mysql
    - nodemon
    - sequelize
    - tailwindcss
    - nextui
    - autoprefixer
    - eslint
    - framer-motion
    - next
    - postcss
    - react
    - react-dom
    - react-hook-form
    - react-hot-toast
    - react-icons
    - typeface-inter

#### Routes

Posts:

- [x] GET `http://localhost:5001/posts` get all posts.
- [x] GET `http://localhost:5001/posts/:id` get 1 post.
- [x] POST `http://localhost:5001/posts` create a post.
- [x] PUT `http://localhost:5001/posts:id` modify a post.
- [x] DELETE `http://localhost:5001/posts:id` delete a post.

users:
auth:
categories:
public_search:
user_search

### 2. Front end

#### Tecnologies

- Next js
- Styles with Tailwind `https://tailwindcss.com`.
- Navbar & buttons with NextUi `https://nextui.org`.
- Alert messages with Hot toast `https://react-hot-toast.com/`
- WYGIWYS Editor: CKEditor `https://ckeditor.com/`


#### Arquitectura

Navbar: 

- [x] Add new user `/registration`.
- [x] Log In `/login`.
- [x] Log Out when you're logged in `/login`.
- [x] Create a blog post `/creationpost`.
- [x] Explore posts `/search`.
- [x] Back to home with home button.

Homepage:

- [x] Public view of blog posts `/`.
- [x] See 1 post by clicking on the image `/post/id`.

CreationPost `/creationpost`:

- [x] Show a form to create new blog post.
- [x] Once created redirect to `/post/id`.

SignUp `/registration`:

- [x] Show a form to add a new user.

Log In `/login`:

- [x] Show a form to log in.

Explore `/search`:

- [x] Show a form to search something in posts.

# Work with GIT:
1- Siempre antes de empezar a trabajar, es importante verificar que estén en su rama o branch.
2- Si quieren actualizar la rama en la que están trabajando para que incluya los cambios que hay en la rama main  (pasos a-f), o hacer un pull request para incluir los cambios de su rama en la rama main (pasos a-g), pueden seguir los siguientes pasos:

```
`git checkout main` para volver a la rama main *
`git pull`  para traer los últimos cambios de main
`git checkout nombredenuestrabranch`  para volver a nuestra rama
`git merge main` para traer los cambios de main a nuestra rama
```
- Dependiendo de los archivos que hayamos editado, es posible que haya conflictos al hacer el merge. VSCode nos va a señalar los archivos con conflictos en color rojo y con un signo de excamación (!) a la derecha del nombre del archivo. Para solucionar los conflictos, podemos clicar en cada archivo y usar el botón de Resolve in Merge Editor. Les mostrará una interfaz de usuario adonde podrán seleccionar qué versión del código quieren conservar o descartar para cada conflicto, y una vez resueltos pueden completar el merge dándole al botón Complete Merge.

- Una vez solucionados los conflictos, podrán hacer un commit para subir los cambios de su rama actualizada a GitHub.

- Desde GitHub, hacer un pull request a main para incluir los cambios de nuestra rama en main. De este modo, no tendremos conflictos que solucionar en GitHub.

*Nota: Este comando dará un error si tienes cambios en tu rama que no hayas agregado a git todavía. Si es algo que todavía no está listo para hacer un commit, no te preocupes, puedes seguir estos pasos para guardar los cambios momentáneamente y seguir trabajando luego:

- usa el comando git stash  para guardar tus últimos cambios
- una vez hechos todos los pasos del punto 2, verifica que estés en tu rama y usa el comando git stash pop para recuperar tus cambios guardados