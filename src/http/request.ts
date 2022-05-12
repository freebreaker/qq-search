import Axios, { AxiosRequestConfig } from 'axios';
import { API } from './api';

const client = Axios.create({
  baseURL: 'https://api.uomg.com'
})

let abort: ((arg0: string) => void) | null;

export const request = async (url: string, config?: AxiosRequestConfig) => {
  const response = await client.request({ url, ...config })
  const result = response.data
  return result
}

export function withCancelTokenRequest(req: typeof $get) {

  function run(data: any, config?: AxiosRequestConfig): ReturnType<typeof req> {
    cancel()
    const cancelToken = new Axios.CancelToken(cancel => (abort = cancel))
    return req(data, { ...config, cancelToken })
  }

  function cancel(message = 'abort') {
    if (abort) {
      abort(message)
      abort = null
    }
  }

  return {
    run,
    cancel
  }
}

export const $get = async <URL extends keyof API>(
  url: URL,
  config?: AxiosRequestConfig
): Promise<API[URL]['res']> => {
  // 经过了request 拦截了一层
  const res: API[URL]['res'] = await request(url, {
    method: 'get',
    ...config,
    // params: {
    //   qq: '1234'
    // }
  });
  return res;
};


export default request