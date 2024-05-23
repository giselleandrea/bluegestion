import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import routes, { 
    branchRoutes,
    customerRoutes,
    orderRoutes,
    productRoutes,
    userRoutes, 
    } 
from "./routes/index";
import AppDataSource from "./database/db";
import { graphqlHTTP } from "express-graphql";
import schema from "./database/schema";
import resolvers  from "./database/resolvers";
import path from "path";
import session from 'express-session';

const app = express();

//middleware req.body a json
app.use(express.json()); 
//middleware
app.use(morgan("dev"));
app.use(cors());
//Archivos estaticos
app.use(express.static(path.join(__dirname, "../public")));

app.use(routes);
app.use(userRoutes);
app.use(productRoutes);
app.use(branchRoutes);
app.use(customerRoutes);
app.use(orderRoutes);

app.use(session({
    secret: 'BLU3g35t10NuC3NtL4L',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // secure: true si es HTTPS
}));

async function main() {
    try {
        //database typeORM
        await AppDataSource.initialize();
        console.log('Database connected! ');

        // Configuración de GraphQL
        app.use(
            '/graphql',
            graphqlHTTP({
                schema,
                rootValue: resolvers, 
                graphiql: true,
            })
        );

        //Puerto de ejecucion
        const port = 3000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        });         
    } catch (error) {
        console.log('Error:', error);    
    }
}
main();  


