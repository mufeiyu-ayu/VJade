import { s as setResponseStatus } from '../nitro/nitro.mjs';

function useResponseSuccess(data) {
  return {
    code: 0,
    ...data,
    error: null,
    message: "ok"
  };
}
function useResponseError(message, error = null) {
  return {
    code: -1,
    data: null,
    error,
    message
  };
}
function unAuthorizedResponse(event) {
  setResponseStatus(event, 401);
  return useResponseError("Unauthorized Exception", { message: "Unauthorized Exception" });
}

export { useResponseSuccess as a, unAuthorizedResponse as b, useResponseError as u };
//# sourceMappingURL=response.mjs.map
