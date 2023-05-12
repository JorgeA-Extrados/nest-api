import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @IsNumber()
    cantidad?: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    pagina?: number;
}