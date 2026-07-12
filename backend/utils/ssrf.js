const dns = require("dns").promises;
const net = require("net");

// Dải IPv4 nội bộ/đặc biệt mà SSRF hay nhắm tới.
const isPrivateIPv4 = (ip) => {
  const p = ip.split(".").map(Number);
  if (p.length !== 4 || p.some(Number.isNaN)) return true; // rác → coi là không an toàn
  const [a, b] = p;
  return (
    a === 0 || // 0.0.0.0/8
    a === 10 || // 10.0.0.0/8
    a === 127 || // loopback
    (a === 169 && b === 254) || // link-local — cloud metadata!
    (a === 172 && b >= 16 && b <= 31) || // 172.16.0.0/12
    (a === 192 && b === 168) || // 192.168.0.0/16
    (a === 100 && b >= 64 && b <= 127) // CGNAT 100.64.0.0/10
  );
};

const isPrivateIPv6 = (ip) => {
  const s = ip.toLowerCase();
  return (
    s === "::1" ||
    s === "::" ||
    s.startsWith("fc") ||
    s.startsWith("fd") ||
    s.startsWith("fe80")
  );
};

const isPrivateIP = (ip) => {
  if (net.isIPv4(ip)) return isPrivateIPv4(ip);
  if (net.isIPv6(ip)) {
    const mapped = ip.match(/::ffff:(\d+\.\d+\.\d+\.\d+)/i); // ::ffff:169.254.x
    if (mapped) return isPrivateIPv4(mapped[1]);
    return isPrivateIPv6(ip);
  }
  return true;
};

// Ném lỗi nếu URL không phải http(s).
const assertSafeUrl = async (rawUrl) => {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("invalid url");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:")
    throw new Error("only http(s) urls are allowed");
  if (url.username || url.password)
    throw new Error("credentials in url are not allowed");

  // Host là IP literal → kiểm trực tiếp
  if (net.isIP(url.hostname)) {
    if (isPrivateIP(url.hostname)) throw new Error("private address");
    return;
  }
  // Ngược lại: resolve DNS, chặn nếu BẤT KỲ record nào là nội bộ
  const records = await dns.lookup(url.hostname, { all: true });
  if (records.length === 0) throw new Error("cannot resolve host");
  for (const { address } of records)
    if (isPrivateIP(address)) throw new Error("resolves to private address");
};

module.exports = { assertSafeUrl, isPrivateIP };
