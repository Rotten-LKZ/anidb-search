import animeTitles from '../data/anime-titles'
import type { VercelRequest, VercelResponse } from '@vercel/node'

type SearchResult = {
  [key: string]: string
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const { lang, content } = request.query

  if (typeof lang !== 'string' || typeof content !== 'string') {
    response.status(400)
    return
  }

  response.status(200).send(await search(lang, content))
}

function isIncludes(a: string, b: string) {
  return a.toLowerCase().includes(b.toLowerCase())
}

async function search(lang: string, content: string) {
  return new Promise((resolve) => {
    const res: SearchResult = {}
    for (let aid of Object.keys(animeTitles)) {
      for (let title of animeTitles[aid]) {
        if (isIncludes(title.lang, lang)) {
          if (isIncludes(title.name, content)) {
            if (title.type === 'short') {
              for (let title2 of animeTitles[aid]) {
                if (title2.type !== 'short' && title2.lang === title.lang) {
                  // @ts-ignore
                  res[title2.name] = aid
                  break
                }
              }
            } else {
              // @ts-ignore
              res[title.name] = aid
              continue
            }
          }
          if (title.alias !== undefined) {
            for (let oneAlias of title.alias) {
              if (isIncludes(oneAlias, content)) {
                // @ts-ignore
                res[title.name] = aid
                break
              }
            }
          }
        }
      }
    }
    resolve(res)
  })
}
