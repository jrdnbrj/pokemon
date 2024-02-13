import { HttpAdapter } from '../interfaces/http-adapter.interface';
import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';


@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;

//   constructor() {
//     this.client = axios.create({
//       baseURL: 'https://pokeapi.co/api/v2',
//     });
//   }

  async get<T>(url: string): Promise<T> {
    // const response = await this.axios.get<T>(url);
    // return response.data;
    try {
        const { data } = await this.axios.get<T>(url);
        return data;
    } catch (error) {
        throw new Error(error);
    }
  }
}