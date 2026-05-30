import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator'

export class CreateWorkLogDto {
   @ApiProperty({ 
    example: 1, 
    description: 'ID сотрудника' 
  })
  @IsNotEmpty({ message: 'employeeId обязателен' })
  @IsNumber({}, { message: 'employeeId должен быть числом' })
  @IsPositive({ message: 'employeeId должен быть положительным числом' })
  @Min(1, { message: 'employeeId не может быть меньше 1' })
  employeeId!: number

   @ApiProperty({ 
    example: 2, 
    description: 'ID вида работы' 
  })
  @IsNotEmpty({ message: 'workTypeId обязателен' })
  @IsNumber({}, { message: 'workTypeId должен быть числом' })
  @IsPositive({ message: 'workTypeId должен быть положительным числом' })
  @Min(1, { message: 'workTypeId не может быть меньше 1' })
  workTypeId!: number

  @ApiProperty({ 
    example: 8.5, 
    description: 'Объем выполненной работы' 
  })
  @IsNotEmpty({ message: 'amount обязателен' })
  @IsNumber({}, { message: 'amount должен быть числом' })
  @Min(0.1, { message: 'amount должен быть больше 0' })
  amount!: number

  @ApiProperty({ 
    example: '2026-05-31', 
    description: 'Дата выполнения работ' 
  })
  @IsNotEmpty({ message: 'performedAt обязателен' })
  @IsString({ message: 'performedAt должен быть строкой' })
  @IsDateString({}, { message: 'performedAt должен быть валидной датой в формате ISO (YYYY-MM-DD)' })
  performedAt!: string
}
