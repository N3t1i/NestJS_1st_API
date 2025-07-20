import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity() //декоратор, который указывает, что класс является сущностью базы данных.
export class User {
    @PrimaryGeneratedColumn() //автоматически генерируемый первичный ключ.
    id: number;

    @Column({ length: 100 }) //колонка в таблице базы данных.
    name: string;

    @Column({ unique: true })
    email: string;
    
    @Column()
    password: string;
}