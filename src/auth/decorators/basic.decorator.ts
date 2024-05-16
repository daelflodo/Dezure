import { SetMetadata } from '@nestjs/common';

import { BASIC_KEY } from 'src/common/constants/key-decorators';
import { ROLES } from 'src/common/constants/roles';


export const LesseeAccess = () => SetMetadata(BASIC_KEY, ROLES.BASIC);