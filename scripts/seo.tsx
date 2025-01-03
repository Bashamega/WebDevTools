const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

// Define paths relative to the script folder
const toolsFilePath = path.join(__dirname, "../src/db/tools.json");
const sitemapFilePath = path.join(__dirname, "../src/app/sitemap.xml");

// Read and parse JSON file
interface Tool {
  link: string;
}

const toolsData: Tool[] = JSON.parse(fs.readFileSync(toolsFilePath, "utf-8"));

const toolsLinks: string[] = toolsData.map(
  (tool: Tool) => `https://wdt.adambashaahmednaji.com${tool.link}`,
);

// Read and parse the sitemap XML file
const sitemapXml = fs.readFileSync(sitemapFilePath, "utf-8");
const parser = new xml2js.Parser();

interface Url {
  loc: string[];
  lastmod?: string[];
  priority?: string[];
}

interface UrlSet {
  urlset: {
    url: Url[];
  };
}

parser.parseString(sitemapXml, (err: Error | null, result: UrlSet) => {
  if (err) throw err;

  // Extract existing links from the sitemap
  const existingLinks: string[] = result.urlset.url.map(
    (url: Url) => url.loc[0],
  );

  // Find tools that are not in the sitemap
  const newTools: string[] = toolsLinks.filter(
    (toolLink: string) => !existingLinks.includes(toolLink),
  );

  // If there are new tools, add them to the sitemap
  if (newTools.length > 0) {
    newTools.forEach((newTool: string) => {
      result.urlset.url.push({
        loc: [newTool],
        lastmod: [new Date().toISOString()],
        priority: ["0.80"],
      });
    });

    // Convert the updated sitemap back to XML
    const builder = new xml2js.Builder();
    const updatedSitemapXml: string = builder.buildObject(result);

    // Write the updated sitemap back to the file
    fs.writeFileSync(sitemapFilePath, updatedSitemapXml);
    console.log(`Added ${newTools.length} new tools to the sitemap.`);
  } else {
    console.log("All tools are already present in the sitemap.");
  }
});
