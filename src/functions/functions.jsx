
export const FormatDecimal = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(number);
}


export const formattedDate = (Date) => {
    return Date.substring(0, 10)
};
