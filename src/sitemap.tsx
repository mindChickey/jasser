
import { createElement } from './tsx-runtime'
import { writeStaticFile } from './writeRoute'

function Site({loc, lastmod, changefreq, priority}:{loc: string, lastmod?: string, changefreq?: string, priority?: number}) {
  return <url>
    <loc>{loc}</loc>
    {lastmod && <lastmod>{lastmod}</lastmod>}
    {changefreq && <changefreq>{changefreq}</changefreq>}
    {priority && <priority>{priority}</priority>}
  </url>
}

export function Sitemap({routes}:{routes: string[]}) {
  let date = new Date().toISOString()
  let xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  let xhtml="http://www.w3.org/1999/xhtml"
  return <urlset xmlns={xmlns} xmlns:xhtml={xhtml}>
    {routes.map((route)=><Site loc={route} lastmod={date} />)}
  </urlset>
}

export function writeSitemap(rootDir: string, routes: string[]){
  let sitemap = <Sitemap routes={routes} />
  let doctype = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
  return writeStaticFile(rootDir + "/sitemap.xml", doctype + sitemap.outerHTML)
}