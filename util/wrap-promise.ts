/* eslint-disable @typescript-eslint/no-explicit-any */
// promise를 감싸서 suspense에게 전달 하는 함수
export const wrapPromise = (promise: Promise<any>) => {
  let status = "pending";
  let result: any;
  const suspender = promise.then(
    async (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );

  return {
    get() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
};
