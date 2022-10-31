import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class User {  
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ 
        type: 'integer', 
        nullable: false 
    })
    role_id: number;

    @Column({ 
        type: 'varchar', 
        nullable: false 
    })
    role: string;
}