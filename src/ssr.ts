
import express from 'express'
import path from 'path'
import fs from 'fs'

type HtmlRoute = {
  abspath: string
  routePath: string
  getElem: () => Promise<HTMLElement>
}

function makeRouteHtml(dirPath: string, filePath: string, routePath: string, func: (p:()=>HTMLElement)=>HTMLElement): HtmlRoute {
  let abspath = path.join(dirPath, filePath)
  async function getElem(){
    let nonce = Date.now();
    let p = await import(abspath + '?jasser_nonce=' + nonce)
    return func(p.default)
  }
  return {abspath, routePath, getElem}
}

function addHtmlRoute(app: express.Express, route: HtmlRoute){
  app.get(route.routePath, async (req, res) => {
    let elem = await route.getElem()
    let content = "<!DOCTYPE html>" + elem.outerHTML
    res.send(content)
  })
}

async function writeRoute(rootDir: string, route: HtmlRoute) {
  try {
    let filePath = rootDir + route.routePath + '.html'
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    let elem = await route.getElem()
    let content = "<!DOCTYPE html>" + elem.outerHTML
    await fs.promises.writeFile(filePath, content, 'utf-8');
    console.log(`write html success: ${filePath}`);
  } catch (error: any) {
    console.error(`write html failed: ${error.message}`);
    throw error;
  }
}

export class JasserAPI {
  public routes: HtmlRoute[] = []
  public app = express()
  
  public constructor(public rootDir: string){
  }

  public addRouteHtml(dirPath: string, filePath: string, routePath: string, func: (p:()=>HTMLElement)=>HTMLElement) {
    let r = makeRouteHtml(dirPath, filePath, routePath, func)
    this.routes.push(r)
  }

  public server(port: number){
    this.app.use(express.static(this.rootDir))
    this.routes.forEach((route)=> addHtmlRoute(this.app, route))
  
    this.app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`)
    })
  }

  public async dump() {
    this.routes.map((route) => writeRoute(this.rootDir, route))
  }
}
