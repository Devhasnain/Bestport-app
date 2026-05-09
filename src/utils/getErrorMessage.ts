const getErrorMessage = (error:any) => {
  return (
    error?.response?.data?.message ??
    error?.error ??
    error?.data?.message ??
    error?.message ??
    "Something went wrong"
  );
};

export default getErrorMessage;
