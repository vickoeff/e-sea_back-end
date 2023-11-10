import { PartialType } from '@nestjs/mapped-types';
import { CreateGalleryDTO } from './create-gallery.dto';

export class UpdateGalleryDto extends PartialType(CreateGalleryDTO) {}
