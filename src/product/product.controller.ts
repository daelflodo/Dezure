import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";

import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PaginationQueryDto } from "./dto/pagination-query.dto";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { PublicAccess } from "src/auth/decorators/public.decorator";

@ApiTags("Product")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  
  @Roles("EMPLOYEE")
  @ApiOperation({ summary: "Crear un producto" })
  @Post("create")
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  
  @PublicAccess()
  @Roles("EMPLOYEE")
  @ApiOperation({ summary: "Filtrar los productos" })
  @ApiQuery({ name: "limit", type: Number, required: false })
  @ApiQuery({ name: "page", type: Number, required: false })
  @ApiQuery({ name: "name", type: String, required: false })
  @Get("all")
  findAll(@Query() pagination: PaginationQueryDto) {
    console.log(pagination);
    return this.productService.findAll(pagination);
  }
  
  @Roles("EMPLOYEE")
  @ApiOperation({ summary: "Obtener un producto" })
  @Get(":productId")
  findOne(@Param("productId", ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }
  
  @Roles("EMPLOYEE")
  @ApiOperation({ summary: "Actualizar un producto" })
  @Put("edit/:productId")
  update(
    @Param("productId", ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }
  
  @Roles('ADMIN')
  @ApiOperation({ summary: "Eliminar un producto" })
  @Delete("delete/:productId")
  remove(@Param("productId", ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}
