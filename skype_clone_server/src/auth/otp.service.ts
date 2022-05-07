import moment from 'moment';
import otpGenerater from 'otp-generator';

export class OTPGenerateService {
    public static generateOTP(duration: number): Promise<any> {
        return new Promise((resolve) => {
            const otp = otpGenerater.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
            const expireTime = moment().add(duration, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            resolve({OTP: otp, ExpireTime: expireTime});
        });
    }
}
