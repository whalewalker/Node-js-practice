export const createResponse = (data, count = 0, message = "successful") => {
  let dataCount;
  if (data) {
    dataCount = Array.isArray(data) ? data.length : [data].length;
  } else {
    dataCount = count;
  }
  return {
    message: message,
    data: data,
    count: dataCount,
  };
};
