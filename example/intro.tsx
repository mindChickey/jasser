
import { createElement, readContent } from "../src"

function Content({title}:{title: string}){
  return <div>
    <div>{title}</div>
    <a href="/download.html">download</a>
  </div>
}

export function IntroPage(){
  return <html>
    <body>
      <script defer>{readContent(__dirname, "./intro-script.js")}</script>
      <Content title="intro" />
    </body>
  </html>
}
