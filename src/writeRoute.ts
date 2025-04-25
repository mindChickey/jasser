
import path from 'path'
import fs from 'fs'
import { createElement } from './tsx-runtime'

export async function writeRouteHtml(rootDir: string, routePath: string, dom: HTMLElement) {
  try {
    let filePath = rootDir + routePath
    let dirname = path.dirname(filePath);
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

export function InlineStyle({dirname, relpath}:{dirname: string, relpath: string}){
  let absolutePath = `${dirname}/${relpath}`
  let cssContent = fs.readFileSync(absolutePath, 'utf-8')
  let styleElement = createElement('style')
  styleElement.textContent = cssContent
  return styleElement
}