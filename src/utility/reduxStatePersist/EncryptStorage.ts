import CryptoJS from "crypto-js";

const SECRET_KEY: string = process.env.REACT_APP_STATE_ENCRYPTION_SECRET_KEY!;

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (data: string) => {
  let bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
