import { image as imageQr } from "qr-image";

const generateImage = (base64: string) => {
  const path = `${process.cwd()}/tmp`;
  let qr_svg = imageQr(base64, { type: "svg", margin: 4 });
  qr_svg.pipe(require("fs").createWriteStream(`${path}/qr.svg`));
  console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
  console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
};

export default generateImage;
