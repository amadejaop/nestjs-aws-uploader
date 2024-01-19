import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile(
        new ParseFilePipe({
            validators: [
                /* new MaxFileSizeValidator({ maxSize: 1000 }),
                new FileTypeValidator({ fileType: 'image/jpeg' }), */
            ],
        }),
    ) file: Express.Multer.File) {
        console.log(file);
    }
}
