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
import { User } from "./User";
import { OrderProduct } from "./OrderProduct";
import { Customer } from "./Customer";

@Entity()
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    referenceOrder: string;

    @Column()
    statusOrder: string;

    @Column()
    totalAmount: number;

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts: OrderProduct[];

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}