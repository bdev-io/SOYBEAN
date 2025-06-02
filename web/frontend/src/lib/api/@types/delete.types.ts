/**
 * 일괄 삭제 응답 타입
 */
export interface DeleteBulkResponse {
  successCount: number;
  failedCount: number;
  failedItems: {
    id: string;
    reason: string;
  }[];
}
