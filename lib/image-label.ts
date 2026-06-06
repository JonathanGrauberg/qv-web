export function imageLabel(path: string) {
  const file = path.split("/").pop() || "";

  return file
    .replace(/\.(png|jpg|jpeg|webp)$/i, "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}