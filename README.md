# ibabotanical-backend

## create a .env file

## run package manager installation

`npm install`

## run migration

you can specify the name of the migration by changing the name field
`npx prisma migrate dev --name init`

## populate database

Now, seed the database with the sample data
`npx prisma db seed`

## run the development

`npm run dev`

## generate schema

If the file is named differently, you can provide the --schema argument to the Prisma CLI with the path to the schema file, e.g.:
`prisma generate --schema ./database/myschema.prisma`
