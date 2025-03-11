import { IsString } from "class-validator";

export class FileUploadDto {
  @IsString()
  file: string;
}