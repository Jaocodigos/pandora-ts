import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Credential {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    application: string;

    @Column()
    password: string;

}