import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({database: 'AUTH', name: 'USER'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}