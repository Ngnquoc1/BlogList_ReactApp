const { assertSafeUrl } = require("./ssrf");

const fetchLinkPreview = async (url) => {
  if (process.env.NODE_ENV === "test") return null;
  try {
    await assertSafeUrl(url);
    const ogs = (await import("open-graph-scraper")).default;
    const { result } = await ogs({
      url,
      timeout: 5000,
      fetchOptions: { headers: { "user-agent": "BloglistBot/1.0" } },
    });

    if (!result.success) return null;

    const image = Array.isArray(result.ogImage)
      ? result.ogImage[0]?.url
      : result.ogImage?.url;

    return {
      title: result.ogTitle || null,
      description: result.ogDescription || null,
      image: image || null,
      siteName: result.ogSiteName || null,
    };
  } catch {
    return null;
  }
};

module.exports = { fetchLinkPreview };
