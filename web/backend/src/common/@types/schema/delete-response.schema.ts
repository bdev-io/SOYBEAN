import { getSchemaPath } from "@nestjs/swagger";
import type { ReferenceObject, SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

import { DeleteResultDto, FailedItemDto } from "@type/dto/delete-result.dto";

export const DeleteResponseSchema: Partial<ReferenceObject> & SchemaObject = {
  allOf: [
    {
      $ref: getSchemaPath(DeleteResultDto)
    },
    {
      properties: {
        failedItems: {
          type: 'array',
          items: {
            $ref: getSchemaPath(FailedItemDto)
          }
        }
      }
    }
  ]
};