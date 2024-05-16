import { SetMetadata } from '@nestjs/common';

import { ADMIN_KEY } from 'src/common/constants/key-decorators';
import { ROLES } from 'src/common/constants/roles';


export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);