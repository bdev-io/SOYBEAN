#!/usr/bin/env bash
# NOTE: 현재는 사용하지 않음

PWD=$(echo $PWD)

if [ ! -d $PWD/prisma/ ]; then
  echo "[ERROR] Maybe You Are Not In The Project Root Directory"
  exit 1
else
  cat $(echo $PWD)/prisma/base.prisma > $(echo $PWD)/prisma/schema.prisma
  cat $(echo $PWD)/prisma/partial_models/*.model.prisma >> $(echo $PWD)/prisma/schema.prisma
  echo "[SUCCESS] Merge All Partial Prisma Schema Files Into One File"
  exit 0
fi
