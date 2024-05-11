import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class TypeUser extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    typeUser: string;

    @OneToMany(() => User, (user) => user.typeUser)
    users: User[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}