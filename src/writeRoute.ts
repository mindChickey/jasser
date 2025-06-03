
import path from 'path'
import fs from 'fs'

export async function writeStaticFile(filePath: string, content: string): Promise<void> {
  try {
    let dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    await fs.promises.writeFile(filePath, content, 'utf-8');
    console.log(`write file success: ${filePath}`);
  } catch (error: any) {
    console.error(`write file failed: ${error.message}`);
    throw error;
  }
}

export async function writeRouteHtml(rootDir: string, routePath: string, dom: HTMLElement): Promise<string> {
  let filePath = rootDir + routePath
  let content = "<!DOCTYPE html>" + dom.outerHTML
  await writeStaticFile(filePath, content)
  return routePath
}
