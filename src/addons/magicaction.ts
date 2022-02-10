import { excerptNotes, getAllText } from "utils/note"
import {
  reverseEscape,
  string2RegArray,
  string2ReplaceParam
} from "utils/input"
import { HUDController, log, showHUD } from "utils/common"

const config: IConfig = {
  name: "介绍",
  intro: "由于自己搭建的开源OCR精度不高所以没有加入；大家可以点击去尝试一下，欢迎建议。",
  link: "http://101.35.252.34:8501",
  settings: [
],
  actions: [
  ]
}

const util = {
  genCharArray(char: string, len: number, step: number = 1): string[] {
    const charArr = []
    let start = char.charCodeAt(0)
    const end = start + len * step - 1
    for (let i = start; i <= end; i = i + step) {
      charArr.push(String.fromCharCode(i))
    }
    return charArr
  },
  genNumArr(num: number, len: number, step = 1, digit = 0) {
    const numArr = []
    const end = num + len * step - 1
    for (let i = num; i <= end; i = i + step) {
      numArr.push(String(i).padStart(digit, "0"))
    }
    return numArr
  },
  getSerialInfo(newSubStr: string, length: number): string[] {
    const seriaInfo = newSubStr
      .match(/%\[(.*)\]/)![0]
      .slice(1)
      .replace(/'/g, '"')
    // 将序列信息转成数组
    const seriaInfo_arr = <any[]>reverseEscape(seriaInfo)

    // 自定义替换字符，数组元素大于 2
    if (seriaInfo_arr.length > 2)
      return seriaInfo_arr.map((item: string) =>
        newSubStr.replace(/%\[(.*)\]/, item)
      )
    else {
      if (seriaInfo_arr[1] && typeof seriaInfo_arr[1] !== "number") throw ""
      let step: number = 1
      if (seriaInfo_arr[1]) step = seriaInfo_arr[1]
      // 序列只有两种情况，字母，和数字。
      const inival = seriaInfo_arr[0]

      // 字母有大写和小写
      if (/^[A-Za-z]$/.test(inival)) {
        const serias = this.genCharArray(inival, length, step)
        return serias.map((item: string) =>
          newSubStr.replace(/%\[(.*)\]/, item)
        )
      }
      // 数字要补零
      else if (!isNaN(Number(inival))) {
        const serias = this.genNumArr(
          Number(inival),
          length,
          step,
          inival.length
        )
        return serias.map((item: string) =>
          newSubStr.replace(/%\[(.*)\]/, item)
        )
      } else throw ""
    }
  }
}

const action: IActionMethod = {
  renameSelected({ content, nodes }) {
    // 如果是矩形拖拽选中，则为从左到右，从上至下的顺序
    // 如果单个选中，则为选中的顺序
    content = /^\(.*\)$/.test(content) ? content : `(/^.*$/g, "${content}")`
    const params = string2ReplaceParam(content)
    if (params.length > 1) return
    let newReplace: string[] = []
    // 如果含有序列信息，就把获取新的 replace 参数
    if (/%\[(.*)\]/.test(params[0].newSubStr)) {
      newReplace = util.getSerialInfo(params[0].newSubStr, nodes.length)
      nodes.forEach((note, index) => {
        const title = note.noteTitle ?? ""
        if (newReplace[index])
          note.noteTitle = title.replace(params[0].regexp, newReplace[index])
      })
    }
    // 或者直接替换
    else {
      nodes.forEach((note, index) => {
        const title = note.noteTitle ?? ""
        note.noteTitle = title.replace(params[0].regexp, params[0].newSubStr)
      })
    }
  },
  changeFillSelected({ option, nodes }) {
    for (const node of nodes) {
      excerptNotes(node).forEach(note => {
        note.fillIndex = option
      })
    }
  },
  changeColorSelected({ content, nodes }) {
    if (!content) return
    const index = Number(content)
    for (const node of nodes) {
      excerptNotes(node).forEach(note => {
        note.colorIndex = index - 1
      })
    }
  },
  mergeTextSelected({ option, nodes, content }) {
    for (const node of nodes) {
      const allText = getAllText(node, reverseEscape(`"${content}"`))
      // MN 这个里的 API 名称设计的有毛病
      const linkComments: textComment[] = []
      while (node.comments.length) {
        const comment = node.comments[0]
        if (
          comment.type == "TextNote" &&
          comment.text.includes("marginnote3app")
        )
          linkComments.push(comment)
        node.removeCommentByIndex(0)
      }
      switch (option) {
        case 0:
          node.excerptText = allText
          break
        case 1:
          node.excerptText = ""
          node.appendTextComment(allText.replace(/\*\*/g, ""))
      }
      linkComments.forEach(linkComment => {
        node.appendTextComment(linkComment.text)
      })
    }
  },
  filterCards({ nodes, content, option }) {
    if (!content) return
    // 0 判断标题 1 判断整个内容
    const regs = string2RegArray(content)
    const customSelectedNodes = nodes.filter(node => {
      const title = node.noteTitle ?? ""
      const content = `${title}\n${getAllText(node, "\n", false)}`
      return regs.every(reg => reg.test(option ? content : title))
    })
    if (customSelectedNodes.length) {
      HUDController.show("您需要的卡片已选中，请继续操作")
      return customSelectedNodes
    } else {
      showHUD("未找到符合的卡片")
      return []
    }
  }
}

export { config, util, action }
