Bienvenido a la documentación del proyecto. Aquí se detallan los pasos necesarios para ejecutar la aplicación.

MARKETPLACE DEMO
El proyecto consta de una aplicación web con una interfaz de usuario en la carpeta frontend y un servidor en la carpeta backend. Ambos se ejecutan juntos en contenedores Docker utilizando el archivo docker-compose.yaml.

Requisitos previos
Asegúrese de tener instalado Docker en su sistema. Si no lo tiene, descargue e instale Docker desde la página oficial: https://docs.docker.com/get-docker/.

Instalación

Clone el repositorio a su máquina local:
git clone https://github.com/your-username/project-name.git

Navegue a la carpeta frontend y ejecute el siguiente comando para instalar las dependencias:
npm install --legacy-peer-deps

Navegue a la carpeta backend y ejecute el siguiente comando para instalar las dependencias:
npm install

Ejecute el siguiente comando para construir los contenedores Docker:
docker-compose build

Ejecución
Una vez que se han completado los pasos de instalación, ejecute la aplicación utilizando el siguiente comando:
docker-compose up

Esto ejecutará tanto el frontend como el backend en contenedores Docker y estarán disponibles en su navegador web en la dirección http://localhost:5000/.

Notas adicionales
Este proyecto está destinado a ser utilizado en un ambiente de ejecución de prueba.
