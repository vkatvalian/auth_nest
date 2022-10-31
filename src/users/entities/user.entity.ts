import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ 
        type: 'string', 
        nullable: false 
    })
    role_id: string;
    
    @Column({ 
        type: 'varchar',
        unique: true, 
        nullable: false
    })
    email: string;
     
    @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    password: string;

    @BeforeInsert()  async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

}