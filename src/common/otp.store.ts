interface OtpData {
  otp: string;   
  expire: number;   
}

export const otpStore: Map<string, OtpData> = new Map();