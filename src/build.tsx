
import { createElement } from "./tsx-runtime"
import { JasserAPI } from './ssr'

function writeLang(jaapi: JasserAPI){
  jaapi.addRouteHtml(__dirname, './index', "/index", createElement)
  jaapi.addRouteHtml(__dirname, './download', "/download", createElement)
}

function all(){
  let jaapi = new JasserAPI('./public')
  writeLang(jaapi)
  jaapi.server(8290)
}

all()
