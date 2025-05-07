import axios from "axios";
import * as cheerio from "cheerio";
class ParcelTrack {
  constructor() {
    this.baseUrl = "https://parcelsapp.com/id/tracking/";
    this.proxyUrl = `https://${process.env.DOMAIN_URL}/api/tools/web/html/v8?url=`;
  }
  async getTrackingInfo(resi) {
    try {
      const targetUrl = `${this.baseUrl}${resi}`;
      const requestUrl = `${this.proxyUrl}${encodeURIComponent(targetUrl)}`;
      const {
        data: html
      } = await axios.get(requestUrl);
      const $ = cheerio.load(html);
      return $("section#tracking-info ul.events li.event").map((i, el) => ({
        tanggal: $(el).find(".event-time strong").text().trim() || "-",
        waktu: $(el).find(".event-time span").text().trim() || "-",
        status: $(el).find(".event-content strong").text().trim() || "-",
        lokasi: $(el).find(".event-content span.location").text().trim() || "-"
      })).get();
    } catch (error) {
      console.error("Gagal mengambil atau memproses data:", error.message);
      return [];
    }
  }
  async cekResi({
    resi = "SPXID050017667543"
  }) {
    try {
      return await this.getTrackingInfo(resi);
    } catch (error) {
      console.error("Gagal dalam fungsi cekResi:", error.message);
      return [];
    }
  }
}
export default async function handler(req, res) {
  const params = req.method === "GET" ? req.query : req.body;
  if (!params.prompt) {
    return res.status(400).json({
      error: "Prompt are required"
    });
  }
  try {
    const pelacak = new ParcelTrack();
    const result = await pelacak.cekResi(params);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Internal Server Error"
    });
  }
}