import CryptoJS from "crypto-js";
const secretPass = "PIYUSHZALAAB";
//Encryption Funtion
const Encrypt = (text) => {
    const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        secretPass
    ).toString();
    return data
};
export default Encrypt