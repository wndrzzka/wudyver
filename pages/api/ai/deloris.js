import crypto from "crypto";
import axios from "axios";
class DelorisAI {
  constructor(baseURL = "https://api.deloris-ai.com/api/v1") {
    this.baseURL = baseURL;
    this.token = null;
    this.headers = this.buildHeaders();
  }
  randomCryptoIP() {
    const bytes = crypto.randomBytes(4);
    return Array.from(bytes).map(b => b % 256).join(".");
  }
  randomID(length = 16) {
    return crypto.randomBytes(length).toString("hex");
  }
  buildHeaders(extra = {}) {
    const ip = this.randomCryptoIP();
    const headers = {
      accept: "*/*",
      "accept-language": "id-ID,id;q=0.9",
      origin: this.baseURL,
      referer: `${this.baseURL}/`,
      "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
      "sec-ch-ua": `"Chromium";v="131", "Not_A Brand";v="24", "Microsoft Edge Simulate";v="131", "Lemur";v="131"`,
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": `"Android"`,
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-forwarded-for": ip,
      "x-real-ip": ip,
      "x-request-id": this.randomID(8),
      ...extra
    };
    console.log("Headers dibangun:", headers);
    return headers;
  }
  async getToken() {
    try {
      console.log("Memulai proses pengambilan token...");
      const userId = crypto.randomUUID();
      const response = await axios.post(`${this.baseURL}/users/guest_auth`, {
        user_id: userId
      }, {
        headers: {
          ...this.headers,
          authorization: "Bearer"
        }
      });
      if (response.data && response.data.data && response.data.data.token) {
        this.token = response.data.data.token;
        console.log("Token berhasil diambil:", this.token, "dengan User ID:", userId);
        return this.token;
      } else {
        console.error("Gagal mengambil token: Respons tidak sesuai", response.data);
        throw new Error("Gagal mengambil token: Respons tidak sesuai");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil token:", error);
      throw error;
    }
  }
  async search({
    interested_in = "Female",
    style = "Anime",
    page = 1
  }) {
    try {
      if (!this.token) {
        await this.getToken();
      }
      console.log("Memulai pencarian...");
      const response = await axios.post(`${this.baseURL}/sys/pagination_personalization-bot-templates`, {
        page: page,
        encoded_uuids: [],
        interested_in: interested_in,
        style: style
      }, {
        headers: {
          ...this.headers,
          authorization: `Bearer ${this.token}`
        }
      });
      console.log("Pencarian berhasil:", response.data);
      return response.data;
    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan pencarian:", error);
      throw error;
    }
  }
  async chat({
    prompt = "say hello",
    char_id = "01969069-cd43-7bef-87e2-b8f3856ffef8",
    save_user = true
  }) {
    try {
      if (!this.token) {
        await this.getToken();
      }
      console.log("Memulai proses chat...");
      const response = await axios.post(`${this.baseURL}/chats/message`, {
        content: prompt,
        chat: char_id,
        save_user_message: save_user
      }, {
        headers: {
          ...this.headers,
          authorization: `Bearer ${this.token}`
        }
      });
      let result = "";
      if (response.data && typeof response.data === "string") {
        const chunks = response.data.split("\n").filter(line => line.startsWith("data: "));
        chunks.forEach(chunkLine => {
          try {
            const jsonData = JSON.parse(chunkLine.substring(6));
            if (jsonData.chunk !== undefined) {
              result += jsonData.chunk;
            }
            if (jsonData.status === "finished") {
              console.log("Chat selesai.");
            }
          } catch (error) {
            console.error("Gagal memparse chunk JSON:", error, chunkLine);
          }
        });
        console.log("Chat berhasil, hasil:", {
          result: result
        });
        return {
          result: result
        };
      } else {
        console.log("Respons chat:", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan chat:", error);
      throw error;
    }
  }
}
export default async function handler(req, res) {
  const {
    action,
    ...params
  } = req.method === "GET" ? req.query : req.body;
  if (!action) {
    return res.status(400).json({
      error: "Missing required field: action",
      required: {
        action: "chat | search"
      }
    });
  }
  const client = new DelorisAI();
  try {
    let result;
    switch (action) {
      case "chat":
        if (!params.prompt) {
          return res.status(400).json({
            error: `Missing required field: prompt (required for ${action})`
          });
        }
        result = await client[action](params);
        break;
      case "search":
        result = await client[action](params);
        break;
      default:
        return res.status(400).json({
          error: `Invalid action: ${action}. Allowed: chat | image`
        });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: `Processing error: ${error.message}`
    });
  }
}