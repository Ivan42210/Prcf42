exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: "Hello from Netlify!",
      env: {
        supabase_url: process.env.SUPABASE_URL ? "OK" : "MISSING",
        supabase_key: process.env.SUPABASE_SERVICE_KEY ? "OK" : "MISSING",
        admin_password: process.env.ADMIN_PASSWORD ? "OK" : "MISSING"
      }
    })
  };
};
