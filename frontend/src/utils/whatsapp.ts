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
        return "";
    }

    return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
        message
    )}`;
}

export function openWhatsapp(phone: string, message: string) {
    const url = createWhatsappUrl(phone, message);

    if (!url) {
        return false;
    }

    window.location.href = url;

    return true;
}