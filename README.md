# anidb-search

Anidb Searching API.（anidb 搜索 API）

## 中文

### 使用

此 API 数据每周更新一次。

地址：https://anidb.rotcool.me/api/s?content={str}&lang={str}

content: 搜索内容。支持汉语拼音、拼音首字母<br/>
lang: 指定语言。例如：lang=zh 时，可以匹配到 zh-Hans、zh-nan、zh-Hant 等

### 更新数据

下载 <http://anidb.net/api/anime-titles.xml.gz> 并且解压，将里面的 `anime-titles.xml` 复制到本项目根目录下，执行 `npm start` 即可。

## English

### Usage

This API data is updated weekly.

URL: https://anidb.rotcool.me/api/s?content={str}&lang={str}

content: Search content. Support Chinese Pinyin and the first letter of Pinyin<br/>

lang: Specifies the language. For example, when lang=zh, it can be matched to zh-Hans, zh-nan, zh-Hunt, etc

### Update datas

Download <http://anidb.net/api/anime-titles.xml.gz> and unzip it. Then copy `anime-titles.xml` of the zip file to the root folder of this project and run `npm start`.
