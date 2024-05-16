import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl } from "class-validator";

export class CreateProductDto {
  @ApiProperty({ description: "Nombre del produto", example: "Laptop hp" })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  
  @ApiProperty({ description: "Descripcion del produto", example: "Laptop hp 8gb de Ram 500 gb SSD" })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  
  @ApiProperty({ description: "Imagen del produto", example: "http://image.jpg" })
  @IsOptional()
  @IsUrl()
  readonly image: string;
  
  @ApiProperty({ description: "Precio del produto", example: 600 })
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly price: number;

}
