import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/auth/github", async (req, res) => {
  const { code } = req.body;

  console.log("Received OAuth code:", code);
  console.log("Client ID:", process.env.GITHUB_CLIENT_ID);

  if (!code) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const data = await response.json();
    console.log("GitHub OAuth response:", data);

    if (data.error) {
      console.error("GitHub OAuth error:", data.error_description);
      return res.status(400).json({ 
        error: data.error, 
        error_description: data.error_description 
      });
    }

    if (!data.access_token) {
      console.error("No access token in response:", data);
      return res.status(400).json({ error: "Failed to obtain access token" });
    }

    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "GitHub OAuth failed", details: err.message });
  }
});

app.get("/auth/github/url", (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.GITHUB_REDIRECT_URI || 'http://localhost:5173/auth/callback',
    scope: 'repo user',
    state: Math.random().toString(36).substring(7)
  });
  
  res.json({ url: `https://github.com/login/oauth/authorize?${params.toString()}` });
});

app.get("/", (req, res) => {
    res.send("GitHub OAuth Backend Server - Running ✓")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
