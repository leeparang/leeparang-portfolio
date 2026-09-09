import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const postsDir = path.join(root, "src", "content", "posts");
const imagesDir = path.join(root, "public", "study-assets");

const sessions = [
  ["flask-study", 1, "Flask Study · 1차시", "2025-09-01", "Flask basics and HTML rendering", "Flask, Web, Study"],
  ["flask-study-2", 2, "Flask Study · 2차시", "2025-09-02", "Dynamic HTML with Jinja2", "Flask, Web, Study"],
  ["c-language-study", 13, "IRIS - C Language Study · 1차시", "2026-04-01", "Functions in C", "C, Programming, IRIS, Study"],
  ["c-language-study-2", 14, "IRIS - C Language Study · 2차시", "2026-04-02", "Pointers in C", "C, Programming, IRIS, Study"],
  ["c-language-study-3", 17, "IRIS - C Language Study · 3차시", "2026-04-03", "Dynamic memory allocation in C", "C, Programming, IRIS, Study"],
  ["c-language-study-4", 18, "IRIS - C Language Study · 4차시", "2026-04-04", "Recursive functions in C", "C, Programming, IRIS, Study"],
  ["c-language-study-5", 19, "IRIS - C Language Study · 5차시", "2026-04-05", "Structures in C", "C, Programming, IRIS, Study"],
  ["iot-study", 21, "IRIS - IoT Study · 1차시", "2026-05-01", "Arduino fundamentals and practice", "IoT, Arduino, IRIS, Study"],
  ["iot-study-2", 22, "IRIS - IoT Study · 2차시", "2026-05-02", "Arduino practice session", "IoT, Arduino, IRIS, Study"],
  ["iot-study-3", 23, "IRIS - IoT Study · 3차시", "2026-05-03", "Arduino practice session", "IoT, Arduino, IRIS, Study"],
  ["python-study", 28, "IRIS - Python Study · 1차시", "2026-06-01", "Python review", "Python, Programming, IRIS, Study"],
  ["python-study-2", 25, "IRIS - Python Study · 2차시", "2026-06-02", "Lists, tuples, and dictionaries", "Python, Programming, IRIS, Study"],
  ["python-study-3", 27, "IRIS - Python Study · 3차시", "2026-06-03", "Object-oriented programming", "Python, Programming, IRIS, Study"],
  ["AI-study", 29, "IRIS - AI Study · 1차시", "2026-07-01", "Introduction to AI and deep learning", "AI, Deep Learning, IRIS, Study"],
  ["computer-vision-study", 30, "IRIS - Computer Vision Study · 1차시", "2026-08-01", "Computer vision fundamentals", "Computer Vision, AI, IRIS, Study"],
  ["computer-vision-study-2", 31, "IRIS - Computer Vision Study · 2차시", "2026-08-02", "Computer vision practice", "Computer Vision, AI, IRIS, Study"],
  ["data-analysis-study", 32, "IRIS - Data Analysis Study · 1차시", "2026-09-01", "Data analysis and visualization", "Data Analysis, Visualization, IRIS, Study"],
];

const decode = (value) => value
  .replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<")
  .replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'");
const text = (value) => decode(value.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "")).replace(/\n{3,}/g, "\n\n").trim();

await mkdir(imagesDir, { recursive: true });
for (const [slug, id, title, published, description, tagList] of sessions) {
  const sourceUrl = `https://leeparang10.tistory.com/${id}`;
  const html = await (await fetch(sourceUrl)).text();
  const match = html.match(/<div class="tt_article_useless_p_margin[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i);
  if (!match) throw new Error(`Could not find article body for ${sourceUrl}`);
  let body = match[1];
  // The article wrapper also contains Tistory's reaction/share script in a
  // few themes; it is not part of the learning note.
  body = body.replace(/<script\b[\s\S]*?<\/script>/gi, "");
  const images = [];
  body = body.replace(/<img[^>]+src="([^"]+)"[^>]*>/gi, (_, rawUrl) => {
    const imageUrl = decode(rawUrl);
    const extension = (imageUrl.match(/\.(png|jpe?g|gif|webp)(?:\?|$)/i)?.[1] || "jpg").replace("jpeg", "jpg");
    const fileName = `${slug}-${images.length + 1}.${extension}`;
    images.push([imageUrl, fileName]);
    return `\n\n![Study image](/study-assets/${fileName})\n\n`;
  });
  await Promise.all(images.map(async ([imageUrl, fileName]) => {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Could not download ${imageUrl}`);
    await writeFile(path.join(imagesDir, fileName), Buffer.from(await response.arrayBuffer()));
  }));
  body = body.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level, value) => `\n\n${"#".repeat(Number(level) + 1)} ${text(value)}\n\n`);
  body = body.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, value) => `\n- ${text(value)}`);
  body = body.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, value) => `\n\n${text(value)}\n\n`);
  body = text(body).replace(/\n {0,2}\n/g, "\n\n").replace(/\n?공유하기\s*$/u, "");
  const markdown = `---\ntitle: ${title}\npublished: ${published}\ndescription: ${description}\ntags: [${tagList}]\ncategory: Notes\n---\n\n${body}\n\n---\n\n[Original post on Tistory](${sourceUrl})\n`;
  await writeFile(path.join(postsDir, `${slug}.md`), markdown, "utf8");
  console.log(`Imported ${id}: ${images.length} image(s)`);
}
