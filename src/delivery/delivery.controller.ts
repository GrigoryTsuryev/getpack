import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CourierService } from 'src/courier/courier.service';
import { Delivery } from '../schemas/delivery';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDTO } from './dto/create-delivery-dto';


@Controller('deliveries')
export class DeliveryController {

    constructor(private readonly deliveryService: DeliveryService,
        private readonly courierService: CourierService){}


    @Post('/create')
    @UseGuards(JwtAuthGuard)
    async createDelivery(@Body() deliveryDto: CreateDeliveryDTO, @Req() req, @Res()  res): Promise<Delivery> {
        if (req.user.type == "Sender") {
            this.deliveryService.addDelivery(deliveryDto)
            return   res.status(HttpStatus.OK).json("Delivery created")
        } 
        return   res.status(HttpStatus.FORBIDDEN).json("Only Sender can create delivery")
      }
      
      @Get(':date')
      @UseGuards(JwtAuthGuard)
      async findDeliveryByDate(@Param() params: any, @Req() req, @Res()  res): Promise<Delivery[]> {

        let date = params.date

        let type = req.user.type
        if (type == 'Courier') {
            let username = req.user.type;
            const result = this.deliveryService.findAllCourierDeliveryByDate(date, type, username)
            return   res.status(HttpStatus.OK).json(result)
        } else if (type='Sender'){
            const result =  this.deliveryService.findAllSenderDeliveryByDate(date, type)
            return   res.status(HttpStatus.OK).json(result)
        }
        return  res.status(HttpStatus.NOT_FOUND).json("Deliveries are not found")
      }

      @Post('/assign/:couriername/:deliveryid/:revenue')
      @UseGuards(JwtAuthGuard)
      async assign(@Param() params: any, @Req() req, @Res()  res): Promise<Delivery[]> {

        if (req.user.type != "Sender") {
            return   res.status(HttpStatus.FORBIDDEN).json("Only sender can Assign deliveries")
        }
          const courier = await this.courierService.findByDate(params.couriername, new Date().toISOString())
          if (courier.counter == 5){
            return res.status(HttpStatus.CONTINUE).json("Cannot assign to courier")
          }
        const counter = courier.counter +1
        this.courierService.assign(courier, new Date().toISOString(), params.revenue, counter)
        this.deliveryService.assignDelivery(params.couriername, params.deliveryid)

        return   res.status(HttpStatus.FORBIDDEN).json("Delivery assigned")

    }
    
}
