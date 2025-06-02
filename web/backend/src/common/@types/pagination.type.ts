import { ApiProperty } from "@nestjs/swagger";

import { RetType } from "./return.type";

export type PaginationType<T, K extends string = 'items'> = Record<K, T[]> & {
  totalItems: number;
  take: number;
};

export class PaginationRetType<T> extends RetType<Record<string, number | string | T[]>> {
  items: T[] = [];
  name: string;

  @ApiProperty({
    type: 'number'
  })
    take = 0;

  @ApiProperty({
    type: 'number'
  })
    totalItems = 0;

  /** new PaginationType<T>(name, items, totalItems, take) */
  constructor(
    name: string,
    items: T[],
    totalItems: number,
    take: number,
  ) {
    super();

    this.name = name !== '' ? name : 'items';
    this.items = items ?? [];
    this.totalItems = totalItems ?? 0;
    this.take = take ?? 10;

    this.data = this.getInner();
    this.cd = 200;
  }


  getInner(): Record<string, number | string | T[]> {
    return {
      totalItems: this.totalItems,
      take: this.take,
      [this.name]: this.items,
    };
  }
}