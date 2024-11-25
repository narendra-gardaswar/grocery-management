import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderBody, CreateOrderResponse } from './dto/create-order.dto';
import { GetUser } from '@core/decorators/user.decorator';
import { LoggedInUser } from '@core/auth/jwt/jwt-strategy';
import { Roles } from '@core/decorators';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { USER_ROLE } from '@users/entities/users.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  @Roles(USER_ROLE.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createOrder(
    @Body() body: CreateOrderBody,
    @GetUser() user: LoggedInUser,
  ): Promise<CreateOrderResponse> {
    return await this.ordersService.createOrder(body, user.id);
  }
}
