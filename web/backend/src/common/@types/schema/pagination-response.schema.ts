import { getSchemaPath } from "@nestjs/swagger";
import type { ReferenceObject, SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

import { PaginationRetType } from "@type/pagination.type";

export function PaginationResponseSchema(itemSchema: Partial<ReferenceObject> & SchemaObject, name?: string): Partial<ReferenceObject> & SchemaObject {
  return {
    allOf: [
      {
        $ref: getSchemaPath(PaginationRetType)
      },
      {
        properties: {
          [name ?? 'items']: {
            type: 'array',
            items: itemSchema
          }
        }
      }
    ]
  }
}