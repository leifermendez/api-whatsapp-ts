const parseNumber = (phone: string) => {
  const parseFrom = phone.split("@").shift() || '';
  return parseFrom;
};

export default parseNumber;
