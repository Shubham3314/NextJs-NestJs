import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private  usersRepository: Repository<User>,
  ) {}

  async createUser(data:any): Promise <User>
  {
    try {
      return this.usersRepository.save(data)
      
    } catch (error) {
      return error
    }
    
    
  }

  async findOne(condition:any): Promise <User>
  {
    
    return this.usersRepository.findOne( {where: condition,})
  }

  async UpdateUser(data:any): Promise<User>
  {
    console.log(data);
    
    const user = await this.usersRepository.findOne({where:{id : data.id}})
    console.log("user",user);
    
    if (!user) {
      throw new Error('User not found');
    }

    user.email = data.email
    user.username = data.username
    user.profieimg = data.fileName
    // const [id,...result] = data
 
    const updatedUser = await this.usersRepository.save(user);
    return updatedUser;
  }

  
}
