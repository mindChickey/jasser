
import { createElement, Jasser } from '../src'

function writeLang(jasser: Jasser){
  jasser.addRouteHtml(__dirname, './intro', "/intro", createElement)
  jasser.addRouteHtml(__dirname, './download', "/download", createElement)
}

function all(){
  let jasser = new Jasser('./public')
  writeLang(jasser)

  jasser.app.get('/', (req, res) => { res.redirect('/intro') })
  jasser.server(8190)
}

all()
