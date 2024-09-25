const fillNumberLength = (input: string, inputLength: number) => {
  const cardNumber = input.replace(/\D/g, "");
  const cardNum = cardNumber.substring(0, inputLength);
  let output = "";
  if (cardNum.length < inputLength) {
    const numOfSpace = inputLength - cardNum.length;
    output = cardNum + "*".repeat(numOfSpace);
  } else {
    output = cardNum;
  }
  return output;
};

export default fillNumberLength;
