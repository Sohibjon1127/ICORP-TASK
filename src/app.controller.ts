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
    const code1 = await axios.post(dotenvConfig.TASK_URL, {
      msg: 'The task you assigned has been completed ✅',
      url: dotenvConfig.API_URL + `:${dotenvConfig.PORT}` + '/get_code_2',
    });

    this.code1 = code1.data.part1;
    this.fullCode = this.code1 + this.code2;
    return `The first code has been received. Press to proceed to the next step 👉 <a href="http://${dotenvConfig.API_URL}:${dotenvConfig.PORT}/finish">Finish</a>`;
  }

  @Post('get_code_2')
  getCode2(@Body() body: any) {
    this.code2 = body.part2;
    return { success: true };
  }

  @Get('finish')
  async finishMassage() {
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
