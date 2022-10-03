import fs from 'fs/promises'
import path from 'path'
import xml2js from 'xml2js'
import pinyin from 'pinyin'

export type Return = {
  [key: string]: ReturnAni[]
}

type ReturnAni = {
  name: string
  type: string
  lang: string
  alias?: string[]
}

type ParsedResult = {
  animetitles: { anime: Anime[] }
}

type Anime = {
  $: { aid: string }
  title: Title[]
}

type Title = {
  _: string
  $: TitleAttr
}

type TitleAttr = {
  type: string
  'xml:lang': string
}

fs.readFile(path.resolve('./anime-titles.xml'), { encoding: 'utf-8' })
  .then(data => {
    xml2js.parseString(data, (err, res: ParsedResult) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }

      const ret: Return = {}

      for (let ani of res.animetitles.anime) {
        const retAni: ReturnAni[] = []
        for (let titles of ani.title) {
          if (titles.$['xml:lang'].startsWith('zh')) {
            // Add Pinyin
            retAni.push({
              name: titles._,
              type: titles.$.type,
              lang: titles.$['xml:lang'],
              alias: [
                pinyin(titles._, { style: 'normal' }).flat().join(''),
                pinyin(titles._, { style: 'normal' }).flat().join(' '),
                pinyin(titles._, { style: 'normal' }).flat().map(v => v[0]).join(''),
              ]
            })
            continue
          }

          retAni.push({
            name: titles._,
            type: titles.$.type,
            lang: titles.$['xml:lang'],
          })
        }

        ret[ani.$.aid] = retAni
      }

      fs.writeFile(path.resolve('./data/anime-titles.ts'), `import type { Return } from '../script/hundle';export default ${JSON.stringify(ret)} as Return;`)
        .then(() => {
          console.log('Convert successfully.')
        }).catch(err => {
          console.error(err)
          process.exit(1)
        })
    })
  }).catch(err => {
    console.error(err)
    process.exit(1)
  })
