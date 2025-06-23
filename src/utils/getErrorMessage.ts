const getErrorMessage = (error:any) => {
  return (
    error?.error ??
    error?.response?.data?.message ??
    error?.data?.message ??
    error?.message ??
    "Something went wrong"
  );
};

export default getErrorMessage;
