document.addEventListener('DOMContentLoaded', () => {

    // Iegūt elementus
    const Input = document.getElementById('text-input');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qrContainer = document.getElementById('styled-qr');
    const sizeInput = document.getElementById('qr-size');
    const colorInput = document.getElementById('qr-color');
    const dotStyleInput = document.getElementById('dot-style');

    // Izveido tukšu qrcode, lai vēlāk to varētu mainīt
    let qrCode = new QRCodeStyling({
        width: parseInt(sizeInput.value),
        height: parseInt(sizeInput.value),
        type: "canvas",
        data: "",
        dotsOptions: {
            color: colorInput.value,
            type: dotStyleInput.value
        },
        backgroundOptions: {
            color: "#FFFFFF"
        },
        cornersSquareOptions: {
            type: "extra-rounded"
        }
    });

    // qrcode tiek ievietots konteinerā uzreiz
    qrCode.append(qrContainer);

    // Visas izmaiņas un klikšķi maina izveidoto qrcode uz izvēlētajiem iestatījumiem
    function updateQRCode() {
        const text = Input.value.trim();
        if (!text) return;

        qrCode.update({
            width: parseInt(sizeInput.value),
            height: parseInt(sizeInput.value),
            data: text,
            dotsOptions: {
                color: colorInput.value,
                type: dotStyleInput.value
            },
            backgroundOptions: {
                color: "#FFFFFF"
            }
        });

        downloadBtn.disabled = false;
    }

    // sava veida qrcode radīšana
    generateBtn.addEventListener('click', updateQRCode);

    // dinamisms, visi elementi atjaunina savu izskatu uzreiz
    Input.addEventListener('input', updateQRCode);
    sizeInput.addEventListener('input', updateQRCode);
    colorInput.addEventListener('input', updateQRCode);
    dotStyleInput.addEventListener('change', updateQRCode);

    // lejupielādēt 
    downloadBtn.addEventListener('click', () => {
        qrCode.download({ name: "qr-kods", extension: "png" });
    });
});
