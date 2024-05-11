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
import { Category } from "./Category";
import { Order } from "./Order";
import { OrderProduct } from "./OrderProduct";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameProduct: string;

    @Column()
    referenceProduct: string;

    @Column()
    amountProduct: number;

    @Column()
    description: string;

    @Column()
    stock: number;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
    orderProducts: OrderProduct[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}