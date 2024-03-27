# Documentación  - PEC1 
Autor: Francisco Escalada

```batch

```

***
#### 1. Creación del boilerplate

Antes de empezar con el desarrollo debemos crear nuestro _boilerplate_, es decir, la estructura de ficheros y conjunto de herramientas que nos servirá, a modo de plantilla, para desarrollar nuestras aplicaciones. Los pasos a seguir para ello se detallan a continuación 

###### Paso 1
El primer paso será acceder a nuestra carpeta de proyectos desde la terminal y una vez allí, crear la carpeta del proyecto actual e inicializarlo.

```bash
# Accedemos a la carpeta de la asignatura
$ cd ... /06 Tools HTML_CSS

# Creamos la carpeta de nuestro proyecto y accedemos a ella
$ mkdir PEC1
$ cd PEC1

```

###### Paso 2

En este punto crearemos nuestros repositorios, tanto local como remoto (creado desde GitHub), para empezar ya con el control de versiones desde el principio.

```bash
# Inicializamos el control de versiones
$ git init
Initialized empty Git repository in C:/Users/escal/OneDrive/Documentos/UOC/06 Tools HTML_CSS/PEC1/.git/

# Añadimos la URL de GitHub coom repositorio remoto
$ git remote add origin https://github.com/escaladafran/06_Tools_HTMLCSS_PEC1.git
```
también es interesante añadir el fichero  _.gitignore_ para indicar las carpetas a ignorar por el control de versiones.

```bash
# creación del fichero .gitignore
$ touch .gitignore
```

###### Paso 3
Una vez hecho esto, y teniendo instalado en nuestro equipo la última version de Node.js, procedemos a inicializar el proyecto con NPM lo que creará  el archivo ```package.json``` que contendrá toda la información del mismo.

```batch
# Versión de Node y NPM utilizada 
$ node -v
v20.11.1
$ npm -v
10.5.0
```






```batch
# Inicializamos el proyecto con NPM usando el parametro -y que omite el asistente interactivo

$ npm init -y
Wrote to C:\Users\escal\OneDrive\Documentos\UOC\06 Tools HTML & CSS\PEC1\package.json:

{
  "name": "pec1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

Se deberá borrar el campo  autogenerado ```main```  ya que interfiere con la configuración de Parcel.

###### Paso 4
Instalaremos Parcel en nuestro equipo

```batch
$ npm install --save-dev parcel
```

a continuación crearemos los archivos ```index.html``` , ```index.js``` y ```css.js```

```batch
$ mkdir -p src/{js,css}
$ cd src
$ touch src/index.html
$ touch src/js/index.js
$ touch src/css/style.css
```

###### Paso 5

Lanzamos el servidor de desarrollo inlcuido en Parcel, accesible através  de la URL http://localhost:1234. Desde aqúi todos los cambios que hagamos en nuestros archivos se verán reflejados inmediatamente el el servidor (_Hot reload_) 

```batch
$ npx parcel src/index.html
Server running at http://localhost:1234
✨ Built in 16ms

 *  History restored 
```


###### Paso 6

En lugar de  de ejecutar el comando anterior en la terminal cada vez que se quiere lanzar el servidor, se puede automatizar este paso creando los siguientes srcipts dentro del archivo ```package.json``` :

```json
 "scripts": {
    "start": "parcel",
    "build": "parcel build"
  },

```
Por un lado ```"start": "parcel"```  ejecutará el servidor de desarrollo de parcel con la web y ```"start": "parcel build"``` que compilará el proyecto cuando la aplicación este lista para producción.
 
Si lanzamos el comando ```npm run build``` observamos que se crea en el directorio de trabajo la carpeta _dist_ 

```batch
$ npm run build

> pec1@1.0.0 build
> parcel build

✨ Built in 1.35s

dist\index.html            346 B    545ms
dist\index.ebe4bda0.css    130 B     42ms
dist\index.55780a22.js      61 B    110ms
```

Esta carpeta contendrá una versión optimizada de los archivos de nuestro proyecto para que ocupen menos espacio. En los archivos geenrados se habrán eliminado espacios en blanco, renombrado las variables a nombres mas cortos e incluso, en el caso de tener más de un archivo del mismo tipo, se fusionaran en uno solo.


###### Paso 7

Si se realiza alguna modificación y volvemos a lanzar el comando ```"start": "parcel build"``` Parcel genera una nueva versión de archivos listos para producción, pero no elimina los antiguos. Si no los vamos borrando, crecerían indefinidamente. Para solucionar esto ejecutamos el siguiente comando:

```batch
$ npm install --save-dev rimraf npm-run-all

added 144 packages, and audited 334 packages in 9s

155 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```
Lo que provoca que aparezca en el ```package.json``` las siguientes lineas:


```json
  "devDependencies": {
    "npm-run-all": "^4.1.5",
    "rimraf": "^5.0.5"
  }
```
El Paquete ```--save-dev rimraf```  servirá para limpiar directorios temporales del proyecto en fase de desarrollo. 
Por otro lado, el paquete ```npm-run -all```  permite ejecutar múltiples scripts npm de manera secuencial o simultanea.

Lo siguiente sería modificar en ```package.json``` el apartado scripts para dejarlo de esta manera:

```json
  "scripts": {
    "start": "npm-run-all clean parcel:dev",
    "build": "npm-run-all clean parcel:build",

    "parcel:dev":"parcel",
    "parcel:build": "parcel build",
    "clean": "rimraf dist .parcel-cache"

  },
```

El srcipt  ```clean": "rimraf dist .parcel-cache```   utiliza la herramienta ```rimraf``` para eliminar los directorios ```dist``` y ```.parcel-cache```. Esto es útil para limpiar los archivos generados previamente, como archivos compilados o cachés, antes de realizar una nueva compilación del proyecto.

Por lo tanto  ```"start": "npm-run-all clean parcel:dev"```  ejecutará el srcipt de limpieza en primer lugar y posteriormente iniciará Parcel en modo desarrollo (ejecutará las dos acciones de forma secuencial gracias a ```npm-run-all```). 

```"build": npm-run-all clean parcel:build"``` " hará lo propio pero construirá el proyecto para producción.


###### Paso 8

Una práctica habitual es indicar sobre qué versiones de navegadores debe ser compatible el código que procesan los preprocesadores por medio de los module bundlers. Esta funcionalidad se implementa utilizando [Browserslist](https://github.com/browserslist/browserslist). Lecturas recomendadas:
* [Declaring browser targets](https://parceljs.org/getting-started/webapp/#declaring-browser-targets)
* [listado completo de las posibles combinaciones](https://github.com/browserslist/browserslist#full-list)





#### 2. Gestión de dependencias. pre- o postprocesadores y dependencias adicionales.

Parcel instala por defecto el pre-procesador Babel y el post procesador PostCSS por lo que no es necesario instalar nada. Lecturas recomendadas:
*  [An Introduction to PostCSS](https://www.sitepoint.com/an-introduction-to-postcss/) 
*  [ Autoprefixer: A Postprocessor for Dealing with Vendor Prefixes in the Best Possible Way](https://css-tricks.com/autoprefixer/)



Instalamos postHTML 

```batch
$ npm i -D posthtml-include

added 5 packages, removed 3 packages, and audited 376 packages in 5s

158 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

```

a continuación creamos el archivo .posthtmlrc en el directorio raiz 

```batch
$ touch .posthtmlrc
```
con el siguiente contenido

```json
{
  "plugins": {
    "posthtml-doctype": { "doctype": "HTML 5" }
  }
}
```






#### 3. Creación del repositorio Git

```
…or create a new repository on the command line

git init
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/escaladafran/06_Tools_P1.git
git push -u origin main
```


luego añadir info del netlify


#### 4. Adecuación a la temática y estructura de la práctica
#### 5. Diseño responsive, complejidad y estética
#### 6. Semántica y accesibilidad
#### 7. Publicación a internet
