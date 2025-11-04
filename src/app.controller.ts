import { Body, Controller, Get, Post } from '@nestjs/common';
import axios from 'axios';
import { dotenvConfig } from './config';

@Controller()
export class AppController {
  private code1: string;
  private code2: string;
  private fullCode: string;

  @Get('start')
  async getCode1() {
    console.log(`${dotenvConfig.API_URL + '/get_code_2'}`);
    const code1 = await axios.post(dotenvConfig.TASK_URL, {
      msg: 'The task you assigned has been completed ✅',
      url: dotenvConfig.API_URL + '/get_code_2',
    });

    this.code1 = code1.data.part1;
    this.fullCode = this.code1 + this.code2;
    return 'Code 1 received ✅';
  }

  @Post('get_code_2')
  getCode2(@Body() body: any) {
    this.code2 = body.part2;
    return { success: true };
  }

  @Get('finish')
  async finishMassage() {
    console.log(
      `Code1: ${this.code1}\nCode2: ${this.code2}\nFullCode: ${this.fullCode}`,
    );
    const finishRespose = await axios.get(
      dotenvConfig.TASK_URL + `?code=${this.fullCode}`,
    );

    return {
      originData: finishRespose.data,
      code_1: this.code1,
      code_2: this.code2,
      fullCode: this.fullCode,
    };
  }
}
