
const isQqNumber = (number: string) => {
  return /^[1-9]{1}[0-9]{4,14}$/.test(number)
}

export const CommonRegs = {
  isQqNumber
}