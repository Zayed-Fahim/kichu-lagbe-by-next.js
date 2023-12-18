const generateJWT = async (payload) => {
  try {
    const res = await fetch("/api/v1/auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export default generateJWT;
