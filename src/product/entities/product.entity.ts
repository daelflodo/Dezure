import { Column, Entity } from "typeorm";

import { IProduct } from "../../common/interfaces/product.interface";
import { BaseEntity } from "../../config/base.entity";

@Entity({ name: 'product' })
export class Product extends BaseEntity implements IProduct{
    @Column({ nullable: false })
    name: string;
    
    @Column({ nullable: false })
    description: string;
    
    @Column({ nullable: true })
    image: string;
    
    @Column({ nullable: false })
    price: number;
}
