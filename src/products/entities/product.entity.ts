import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Products {  
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ 
        type: 'varchar', 
        nullable: false 
    })
    category: string;

    @Column({ 
        type: 'varchar', 
        nullable: false 
    })
    seller: string;

    @Column({ 
        type: 'varchar', 
        nullable: false 
    })
    price: number;
}