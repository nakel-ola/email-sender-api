import { Column, Entity, ObjectIdColumn,BaseEntity } from "typeorm";

@Entity()
export default class APIKeyEntity extends BaseEntity {
  @ObjectIdColumn()
  id!: string;

  @Column()
  key!: string;

  @Column()
  plan!: string;

  @Column()
  remainingCalls!: number;

  @Column()
  totalCalls!: number;
}