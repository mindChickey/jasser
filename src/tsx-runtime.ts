
function initDocument(){
  if(typeof document === 'undefined'){
    let jsdom = require("jsdom")
    let { JSDOM } = jsdom;
    let dom = new JSDOM('')
    global.document = dom.window.document
    global.window = dom.window
  }
}

initDocument()

function formatStyle(value: object) {
  function f([k, v]: [string, any]){
    return `${k.replace(
        /[A-Z]/g,
        (m) => '-' + m.toLowerCase()
      )}:${v.toString()}`
  }
  return Object.entries(value).map(f).join(';');
}

function handleProp(element: HTMLElement, prop: [string, any]) {
  let [name, value] = prop
  if (name === 'html') {
    element.innerHTML = value
  } else if (name === 'class') {
    element.className += value.toString()
  } else if (name === 'style' && typeof value === 'object') {
    const styleString = formatStyle(value)
    element.setAttribute('style', styleString)
  } else {
    element.setAttribute(name, value.toString())
  }
}

function appendChild(parent: HTMLElement, child: any) {
  if(child === undefined){
  } else if (Array.isArray(child)){
    child.forEach((nestedChild) => appendChild(parent, nestedChild))
  } else {
    let child1 = child.nodeType ? child : document.createTextNode(child)
    parent.appendChild(child1)
  }
}

export function createElement(tag: any, props?: object, ...children: any[]): HTMLElement {
  if (typeof tag === 'function') {
    let props1 = children.length ? {...props, children} : props
    return tag(props1) as HTMLElement
  } else {
    let element = document.createElement(tag) as HTMLElement
    Object.entries(props || {}).forEach((prop) => handleProp(element, prop))
    children.forEach((child) => appendChild(element, child))
    return element
  }
}
