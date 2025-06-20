# Configuración de entorno (`.env`)

La configuración del entorno es sencilla. Las variables necesarias para la base de datos PostgreSQL ya están integradas en el backend, por lo que solo debes definirlas en tu archivo `.env`.

### Variables requeridas

* `POSTGRES_DB`
  Nombre de la base de datos que se utilizará.

* `POSTGRES_USER`
  Usuario para acceder a la base de datos.

* `POSTGRES_PASSWORD`
  Contraseña del usuario de la base de datos.

* `POSTGRES_HOST`
  **Obligatoriamente debe ser** `servicio-database` si estás utilizando Docker, ya que hace referencia al nombre del servicio definido en el `docker-compose.yml`. Por lo tanto, asegúrate de incluir lo siguiente en tu archivo `.env`:

  ```env
  POSTGRES_HOST=servicio-database
  ```

* `JWT_SECRET`
  Secreto utilizado para firmar y verificar los tokens JWT. Debe ser una cadena segura definida por ti. Por ejemplo:

  ```env
  JWT_SECRET=mi_clave_secreta_segura
  ```

* `PORT`
  Puerto en el que se ejecutará el servidor del backend. Por defecto es el **3000**, pero puedes modificarlo si es necesario:

  ```env
  PORT=3000
  ```

  > ⚠️ **Importante:** Si cambias este valor, también debes actualizar el puerto expuesto en el archivo `docker-compose.yml` para que coincida.