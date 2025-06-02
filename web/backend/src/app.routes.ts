import type { Routes, RouteTree } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const UsersRouteTree: RouteTree = {
  path: '/users',
  module: UsersModule,
};

const AppRoutes: Routes = [
  UsersRouteTree,
  {
    path: '/auth',
    module: AuthModule,
  },
];

export default AppRoutes;
