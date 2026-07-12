export function normalizeWhatsappNumber(value: string) {
    const onlyNumbers = value.replace(/\D/g, "");

    if (!onlyNumbers) {
        return "";
    }

    if (onlyNumbers.startsWith("55")) {
        return onlyNumbers;
    }

    return `55${onlyNumbers}`;
}

export function createWhatsappUrl(phone: string, message: string) {
    const whatsappNumber = normalizeWhatsappNumber(phone);

    if (!whatsappNumber) {
        return "#";
    }

    const encodedMessage = encodeURIComponent(message);

    return `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;
}