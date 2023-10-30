import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Res,
  Req,
  UnauthorizedException,
  UseInterceptors,
  UploadedFile,
  Patch,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { profile } from 'console';
import { File } from 'buffer';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { storage } from './storage.config';
import { multerOptions } from './upload.module';
import { openAsBlob } from 'fs';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Res() response: Response,
    @Body('Username') username: string,
    @Body('Email') email: string,
    @Body('Password') password: string,
  ) {
    // console.log(username,email,password);

    const hashedPassword = await bcrypt.hash(password, 12);
    // let user:any
    try {
      const user = this.appService.createUser({
        username,
        email,
        password: hashedPassword,
      });

      delete (await user).password;
      response.status(201).json(user);
    } catch (error) {
      response.status(401).json(error.message);
    }
  }

  @Post('login')
  async login(
    @Body('Email') email: string,
    @Body('Password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    // console.log(email,password);

    const user = await this.appService.findOne({ email: email });
    // console.log(user.id);

    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException(
        'Invalid Credentials Password Does not match',
      );
    }

    const jwt = await this.jwtService.signAsync(
      { id: user.id },
      { secret: 'mysecretwooo' },
    );
    console.log(jwt);

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'success',
      id: user.id,
      // jwt: jwt,
    };
  }

  @Get('user')
  async user(@Req() request: Request, @Res() response: Response) {
    // console.log(request.cookies);
    try {
      // console.log(request);

      const cookie = request.cookies.jwt;
      // const id = request.body.id

      const data = this.jwtService
        .verifyAsync(cookie, { secret: 'mysecretwooo' })
        .then(async (result) => {
          const id = result.id;
          const user = await this.appService.findOne({ id: result.id });
          console.log(user);

          const { password, ...result1 } = user;

          response.json(result1);
          // console.log(id);
        });
      // console.log(data[0]);

      if (!data) {
        throw new UnauthorizedException();
      }

      // return result;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Get('user/image')
  async GetUserImage(@Req() request: Request, @Res() response: Response) {
    const cookie = request.cookies.jwt;

    const data = this.jwtService.verifyAsync(cookie, {
      secret: 'mysecretwooo',
    });
    console.log(data);

    if (!data) {
      throw new UnauthorizedException();
    }
    const user = await this.appService.findOne({ id: data['id'] });

    const profileImgPath = '/destination/' + user.profieimg;
    response.sendFile(profileImgPath, { root: './' });
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }

  @Patch('update')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async upload(
    @UploadedFile() file,
    @Body('Username') username: string,
    @Body('Email') email: string,
    @Body('id') id: string,
  ) {
    console.log(username, email, id, file);

    if (file) {
      const fileName = file.filename;

      const updatedUserInfo = await this.appService.UpdateUser({
        id,
        email,
        username,
        fileName,
      });
      return updatedUserInfo;
    } else {
      const updatedUserInfo = await this.appService.UpdateUser({
        id,
        email,
        username,
      });
      return updatedUserInfo;
    }
  }
}
