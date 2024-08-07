import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Employee } from "@migrations/employee/entities/employee.entity";
import { Contact } from "@migrations/contact/entities/contact.entity";
import { UserRole, UserStatus } from "@common/enums";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'userID' })
  id!: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  username!: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'boolean', default: false })
  isVerified!: boolean;

  @OneToOne(() => Employee, { cascade: true, eager: true })
  @JoinColumn({ name: 'employeeID' })
  employee!: Employee;

  @OneToOne(() => Contact, { cascade: true, eager: true })
  @JoinColumn({ name: 'contactID' })
  contact!: Contact;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role!: UserRole;

  @CreateDateColumn({ type: 'timestamp', update: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ nullable: false, update: false, length: 255, type: 'varchar', default: 'system' })
  createdBy!: string;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @Column({ nullable: true, length: 255, type: 'varchar', default: 'system' })
  updatedBy!: string;
}
