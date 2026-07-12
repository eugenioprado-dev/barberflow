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

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
    )}`;
}