import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ApiOperation, ApiConsumes, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { FileUploadDto } from 'src/dto/upload/create-upload.dto';



@Controller('upload')
@ApiTags('Upload')
export class UploadController {
  @Post('image')
  @ApiOperation({ summary: 'อัปโหลดไฟล์ภาพ' })
  @ApiConsumes('multipart/form-data') // แจ้งว่า API นี้รับข้อมูลประเภท multipart/form-data
  @ApiBody({
    description: 'อัปโหลดไฟล์ภาพ',
    type: FileUploadDto, // ระบุว่า DTO นี้ใช้สำหรับการรับไฟล์
    required: true, // กำหนดว่าเป็นข้อมูลที่ต้องส่ง
  })
  @ApiResponse({
    status: 200,
    description: 'อัปโหลดไฟล์สำเร็จ',
    schema: {
      example: {
        url: '/uploads/123e4567-e89b-12d3-a456-426614174000-image.jpg',
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // กำหนดที่เก็บไฟล์
        filename: (req, file, callback) => {
          const filename = `${uuidv4()}.${file.originalname.split(".")[1]}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { url: `/uploads/${file.filename}` }; // ส่ง URL ของไฟล์กลับ
  }
}
