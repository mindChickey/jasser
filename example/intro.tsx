
import { createElement, readContent } from "../src"

export function IntroPage(){
  return <html>
    <body>
      <div>
        <script defer>{readContent(__dirname, "./intro.js")}</script>
        <div>intro</div>
        <a href="/download">download</a>
      </div>
    </body>
  </html>
}
