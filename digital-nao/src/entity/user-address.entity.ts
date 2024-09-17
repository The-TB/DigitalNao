import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({database: 'NAODB', name: 'USER_ADDRESS'})
export class UserAddress {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    id_username: string;
    @Column({ unique: true, default: 1 })
    is_active: number;
    @Column({ unique: true })
    country_code: string;
    @Column({ unique: true })
    zipcode: number;
    @Column({ unique: true })
    address_1: string;
    @Column({ unique: false })
    address_2: string;
    @Column({ unique: true })
    receptor_name: string;
    @Column({ unique: true })
    phone_number: number;
    @Column({ unique: false })
    previous_id: number;
}