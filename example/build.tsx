
import { createElement, writeRouteHtml } from '../src'
import { DownloadPage } from './download'
import { IntroPage } from './intro'

function writeLang(rootDir: string){
  writeRouteHtml(rootDir, "/intro.html", <IntroPage />)
  writeRouteHtml(rootDir, "/download.html", <DownloadPage />)
}

function all(){
  let rootDir = './public'
  writeLang(rootDir)
}

all()
