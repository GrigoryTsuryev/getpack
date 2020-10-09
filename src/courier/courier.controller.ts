import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Courier } from 'src/schemas/couriers';
import { CourierService } from './courier.service';
import { CreateCourierDTO } from './dto/create-courier-dto';

@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createCourier(@Body() courierDto: CreateCourierDTO): Promise<Courier> {
    return this.courierService.create(courierDto);
  }

  @Get('/:username')
  @UseGuards(JwtAuthGuard)
  async findCourier(username: string): Promise<Courier> {
    return this.courierService.findOne(username);
  }

  @Get('/:username/:dateFrom/:dateTo')
  @UseGuards(JwtAuthGuard)
  async getRevenue(
    @Param() params: any,
    @Req() req,
    @Res() res,
  ): Promise<Number> {
    if (params.dateTo && params.dateTo < params.dateFrom) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json('Future date is more then today or from date');
    }
    return this.courierService.getRevenueByUsername(
      params.username,
      params.dateFrom,
      params.dateTo,
    );
  }
}
