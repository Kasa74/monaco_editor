export const mockApiRequest = async (language: string, code: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (language === "javascript" && code === "console.log('Hello World!')") {
    return {
      status: "success",
      output: `Hello World!`,
    };
  }

  return { status: "error", error: "Syntax Error" };
};
