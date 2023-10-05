# fspt18-team-2

To get started:

- In MySQL, create a database named `artimdb`
- In the root folder of this project, create a `.env` file containing the next information:

```
DB_HOST =localhost
DB_USER =root
DB_PASS =YOURPASSWORD
DB_NAME =artimdb
JWT_SECRET=yoursecretlongkey
```
- Run `npm install` to install the server's required packages
- Run `npm run migrate` to create your DB tables
- Next, `cd artim-app` and `npm install` to install all client dependencies

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