// 전화번호 형식 변환 함수
export const handlePhoneNumberInput = (input: string) => {
  const cleaned = input.replace(/\D/g, "");
  let formatted = "";
  if (cleaned.length < 4) {
    return cleaned;
  } else if (cleaned.length < 8) {
    formatted += `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else {
    formatted += `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  }
  return formatted;
};

// 전화번호 마스킹 처리 함수
export const maskPhoneNumber = (number: string) => {
  const cleaned = number.replace(/\D/g, "");
  const masked = `${cleaned.slice(0, 3)}-****-${cleaned.slice(7)}`;
  return masked;
};
