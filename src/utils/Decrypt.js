import CryptoJS from "crypto-js";
const secretPass = "PIYUSHZALAAB";
// Decrypt Function
const decrypt = (text) => {
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data
};
export default decrypt