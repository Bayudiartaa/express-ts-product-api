# Description
A simple API Product with CRUD function and JWT auth.

# Features
This API developed with Node js, Typescript, Postgresql, Docker, Prisma, JWT
 
# Tech Used
 ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
      
# Getting Start:
Before you running the program, make sure you've run this command:
- `npm install`
-  create `.env` and add `DATABASE_URL="postgresql://postgres:password@localhost:5432/micro?schema=public" and JWT_SECRET=`
- `docker compose up -d`

### Database setup:
- Create your own database, and put the credential in env file
- Run the migration with `npx prisma migrate dev --name init`

### Run the program
`npm run dev`

The program will run on http://localhost:3000


### API Route List
| Method | URL | Description |
| ----------- | ----------- | ----------- | 
| POST | localhost:3000/api/register  | Register User |
| POST | localhost:3000/api/login  | Login User |
| POST | localhost:3000/api/logout  | Logout User |
| GET | localhost:3000/api/product  | Get All Product |
| POST | localhost:3000/api/product  | Create Product |
| POST | localhost:3000/api/product/{id}  | Update Product |
| GET | localhost:3000/api/product/{id}  | Get Detail a Product |
| DELETE | localhost:3000/api/product/{id}  | Delete a Product |
 

# Screenshots
 <img src="Screenshot 2023-07-01 at 23.40.33 23.43.25.png"> <img src="Screenshot 2023-07-01 at 23.15.34.png"> <img src="Screenshot 2023-07-01 at 23.19.27.png"> <img src="Screenshot 2023-07-01 at 23.16.43 23.43.25.png"> <img src="Screenshot 2023-07-01 at 23.16.32.png"> <img src="Screenshot 2023-07-01 at 23.17.25.png"> <img src="Screenshot 2023-07-01 at 23.17.51.png"> <img src="Screenshot 2023-07-01 at 23.19.08.png">
      
<!-- </> with 💛 by readMD (https://readmd.itsvg.in) -->
