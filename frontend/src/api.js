export const executeCode = async (languageId, sourceCode, input) => {
  try {
    console.log("Executing Code with:", { languageId, sourceCode, input }); // ✅ Debugging

    const response = await fetch("https://oce.onrender.com/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language_id: languageId,  // ✅ Check if it correctly sends 54 for C++
        source_code: sourceCode,
        stdin: input,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, Message: ${errorData.error || "Unknown error"}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Frontend API Error:", error);
    return { error: error.message };
  }
};
