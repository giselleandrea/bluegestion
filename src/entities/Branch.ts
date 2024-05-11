import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";
import { Customer } from "./Customer";

@Entity()
export class Branch extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameBranch: string;

    @Column()
    phoneBranch: string;

    @Column()
    neighborhoodBranch: string;

    @Column()
    address: string;

    @Column()
    nameContact: string;

    @OneToMany(() => Customer, (customer) => customer.branch)
    customers: Customer[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
