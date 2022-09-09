const formatter = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});
const curruncyFormatter = (number) => {
  return formatter.format(number);
};

export default curruncyFormatter;
