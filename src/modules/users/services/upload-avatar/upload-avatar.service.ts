import { AwsService } from '@/modules/aws/services/aws.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';

@Injectable()
export class UploadAvatarService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly awsService: AwsService,
  ) {}

  async upload(
    file: any,
    originalname: string,
    _id: string,
  ): Promise<{ avatar: string }> {
    const user = await this.usersRepo.findById(_id);

    const { _id: userId } = user;

    if (!user) {
      throw new NotFoundException('user not found.');
    }

    const { avatar } = await this.awsService.uploadS3(
      file,
      originalname,
      userId,
    );

    await this.usersRepo.uploadFile(userId, avatar);

    return {
      avatar,
    };
  }
}
