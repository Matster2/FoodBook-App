export const includeResizeQueryParameters = (url, width, height) => {
  var parameters = {};

  if (width) {    
    parameters.width = width;
  }

  if (height) {    
    parameters.height = height;
  }

  const parametersString = Object.entries(parameters)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
    
  if (url.includes("?")) {
    return `${url}&${parametersString}`;
  }

  return `${url}?${parametersString}`;
}