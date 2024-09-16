import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({database: 'NAODB', name: 'PROPERTY'})
export class Property {
    @PrimaryColumn()
    code: string;
    @Column({ unique: false })
    value: string;
    @Column({ unique: false })
    description: string;
}