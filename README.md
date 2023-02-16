<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Deployed en Heroku
```
https://pokedex-ge.herokuapp.com/api/v2/pokemon
```
<br/>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm install
```

3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
Run docker-compose up -d
```

5. Clonar el archivo __.env.template__ y renombrar la copia a __.env__

6. llenar las variables de entorno definidas en el __.env__

7. Levantar la aplicación
```
npm run start:dev
```

8. Reconstruir la base de datos
```
http://localhost:3000/api/v2/seed
```
<br/>

## Stack utilizado
* NestJs
* MongoDB

<br/>

## Production Build
1. Crear el achivo ```.env.prod```
2. Llenar las variables de entorno de prod
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Notas

Heroku redeploy sin cambios
```
git commit --allow-emoty -m "Trigger Heroku deploy"

git push heroku <main|master>
```

