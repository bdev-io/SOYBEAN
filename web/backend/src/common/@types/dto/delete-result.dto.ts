import { ApiProperty } from "@nestjs/swagger";

export class DeleteResultDto {
  @ApiProperty()
  successCount: number;
  @ApiProperty()
  failedCount: number;
  failedItems: FailedItemDto[];
}

export class FailedItemDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  reason: string;
}