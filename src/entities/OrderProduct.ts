import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity()
export class OrderProduct extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cant: number;

    @Column()
    dateOrder: Date;

    @ManyToOne(() => Product, (product) => product.orderProducts)
    product: Product;

    @ManyToOne(() => Order, (order) => order.orderProducts)
    order: Order;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

