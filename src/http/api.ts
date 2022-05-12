export interface API {
  '/api/qq.info': {
    params: {
      qq: string;
    };
    res: {
      msg?: string
      code: number
      name: string;
      qlogo: string;
      qq: string;
      lvzuan: { code: number, subcode: number, level: 1, vip: number, score: number, place: number, payway: 8, isyear: number, vendor: number }
    };
  };
}