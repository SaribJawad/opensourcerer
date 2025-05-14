export function parseUrlHeaders(header: string) {
  const links: Record<string, string> = {};

  const parts = header.split(", ");

  parts.forEach((part) => {
    const headerLinks = part.split(";");

    const link = headerLinks[0].trim().slice(1, -1);
    const rel = headerLinks[1].trim().split("=")[1].replace(/"/g, "");

    links[rel] = link;
  });

  return links;
}
