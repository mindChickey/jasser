
export { createElement } from './tsx-runtime'
export { writeRouteHtml } from './writeRoute'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: HTMLDivElement | any
      span: HTMLSpanElement | any
      p: HTMLParagraphElement | any
      img: HTMLImageElement | any
      a: HTMLAnchorElement | any
      button: HTMLButtonElement | any
      ul: HTMLUListElement | any
      ol: HTMLOListElement | any
      li: HTMLLIElement | any
      select: HTMLSelectElement | any
      option: HTMLOptionElement | any
      [elemName: string]: HTMLElement | any
   }
    type Element = HTMLElement;
  }
}
