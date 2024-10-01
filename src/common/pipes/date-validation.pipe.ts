import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class DateValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(`${metadata.data} is not specified.`);
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new BadRequestException(`${value} is not a valid date.`);
    }
    return date;
  }
}