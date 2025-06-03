
import fs from 'fs'
import { createElement } from './tsx-runtime'

export type OptionT<T> = { value: T, title: string }

function Option<T>({ item, currentValue }:{ item: OptionT<T>, currentValue: T }){
  let { value, title } = item
  if(value === currentValue){
    return <option value={value} selected>{title}</option>
  } else {
    return <option value={value}>{title}</option>
  }
}

export function Select<T>({items, currentValue, id}:{ items: OptionT<T>[], currentValue: T, id:string }){
  return <select id={id} tabindex={-1}>
    { items.map((item) => <Option item={item} currentValue={currentValue} />) }
  </select>
}

export function readContent(dirname: string, relpath: string){
  let absolutePath = `${dirname}/${relpath}`
  return fs.readFileSync(absolutePath, 'utf-8')
}
