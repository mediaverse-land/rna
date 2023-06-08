export const removeZeroFromPhoneNumber = (phoneNumber: string) => {
    console.log(phoneNumber)
    if (phoneNumber.charAt(0) === '0') {
        phoneNumber = phoneNumber.slice(1);
        return phoneNumber
    }
    return phoneNumber
}