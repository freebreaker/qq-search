import { AxiosRequestConfig } from "axios"
import { $get } from "../http/request"

export const queryQQUser = (qq: string, config?: AxiosRequestConfig) => {
  return $get(`/api/qq.info`, {
    params: {
      qq
    },
    ...config
  })
}