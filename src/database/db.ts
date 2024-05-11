import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Category } from "../entities/Category";
import { Customer } from "../entities/Customer";
import { Order } from "../entities/Order";
import { Branch } from "../entities/Branch";
import { TypeUser } from "../entities/TypeUser";
import { OrderProduct } from "../entities/OrderProduct";

const AppDataSource = new DataSource ({
    type: 'postgres',
    host: 'localhost', // 'bluegestion.c14o26ykwjxr.us-east-1.rds.amazonaws.com',
    port: 5434, //5432,
    username: 'postgres',
    password: 'R00tG4t0',
    database: 'bluegestion',
    entities: [
        User,
        Category,
        Product,
        Customer,
        Order,
        Branch,
        TypeUser,    
        OrderProduct    
    ],
    logging: true,
    synchronize: true
    
});

export default AppDataSource;