export const response = (message, data, status = true, code) => {
  return {
    message: message,
    data: data,
    status: status,
    code: code,
  };
};

export const reject = (message, status = false, code) => {
  return {
    message: message,
    status: status,
    code: code,
  };
};
