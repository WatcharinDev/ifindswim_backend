import { Injectable } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class UploadService {
  handleFileUpload(file: Express.Multer.File) {
    return { url: `/uploads/${file.filename}` };
  }
}
