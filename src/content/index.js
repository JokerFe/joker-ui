import {importAll, importMdUrl} from '../utils/mdUtil.js'

// 获取所有组件路径
const mdAllUrl = require.context('../../package/components/', true, /\.md$/)
export const mdFileUrl = importMdUrl(mdAllUrl)

// 获取所有组件readme
const mdAllReadme = require.context('../../package/components/', true, /README\.md$/)
export const mdAllMeta = importAll(mdAllReadme)
