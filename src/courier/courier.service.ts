import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Courier, CourierDocument } from 'src/schemas/couriers';
import { CreateCourierDTO } from './dto/create-courier-dto';

@Injectable()
export class CourierService {
  constructor(
    @InjectModel('couriers')
    private readonly courierModule: Model<CourierDocument>,
  ) {}

  async create(courierDto: CreateCourierDTO): Promise<Courier> {
    const createCourier = new this.courierModule(courierDto);
    return createCourier.save();
  }

  async findOne(username: string): Promise<Courier> {
    return this.courierModule.findOne({ username });
  }

  async assign(
    courierDto: CreateCourierDTO,
    date: string,
    addedRevenue: number,
    counter: number,
  ): Promise<Courier> {
    return this.courierModule.updateOne(
      { username: courierDto.name },
      {
        ...courierDto,
        counter,
        date,
        revenue: addedRevenue + courierDto.revenue,
      },
    );
  }

  async findByDate(username: string, data: string): Promise<Courier> {
    return this.courierModule.findOne({ username, data });
  }

  async getRevenueByUsername(
    username: string,
    dataFrom: string,
    dataTo: string,
  ): Promise<Number> {
    const documents = await this.courierModule.find({ username });
    return documents
      .filter(document => document.date < dataFrom)
      .filter(document => document.date > dataFrom)
      .map(document => document.revenue)
      .reduce((a, b) => a + b, 0);
  }
}
