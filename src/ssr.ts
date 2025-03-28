
import path from 'path'
import fs from 'fs'

async function writeRoute(filePath: string, dom: HTMLElement) {
  try {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    let content = "<!DOCTYPE html>" + dom.outerHTML
    await fs.promises.writeFile(filePath, content, 'utf-8');
    console.log(`write html success: ${filePath}`);
  } catch (error: any) {
    console.error(`write html failed: ${error.message}`);
    throw error;
  }
}

export function writeRouteHtml(rootDir: string, routePath: string, dom: HTMLElement) {
  let filePath = rootDir + routePath + '.html'
  return writeRoute(filePath, dom)
}