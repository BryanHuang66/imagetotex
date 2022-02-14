import { util as magicaction } from "addons/magicaction"
import {
  reverseEscape,
  string2RegArray,
  string2ReplaceParam
} from "utils/input"

const checkInputCorrect = (text: string, key: string): boolean => {
  try {
    switch (key) {
      case "wordCount":
        const input = reverseEscape(text)
        if (
          typeof input == "number" ||
          (Array.isArray(input) &&
            input.length == 2 &&
            input.every(item => Number.isInteger(item)))
        ) {
        } else throw ""
      case "mergeTextSelected":
        reverseEscape(`"${text}"`)
        break
      case "customComplete":
        
        break
      case "AppID":
  
        break
      case "AppKey":
    
        break
      case "APIKey":
      
        break
      case "APISecret":
       
        break
      case "APPID":
      
        break
      case "prefixOutput":
        break

      case "suffixOutput":
        break
      case "changeColorSelected": {
        const index = Number(text)
        if (!Number.isInteger(index)) throw ""
        if (index > 16 || index < 1) throw ""
        break
      }
      case "customSplitName":
      case "customBeTitle":
      case "customSplit":
      case "filterCards":
        const regs = string2RegArray(text)
        regs.forEach(reg => {
          reg.test("test")
        })
        break
      case "renameSelected":
        text = /^\(.*\)$/.test(text) ? text : `(/^.*$/g, "${text}")`
        const params = string2ReplaceParam(text)
        if (params.length > 1) throw ""
        "test".replace(params[0].regexp, params[0].newSubStr)
        if (/%\[(.*)\]/.test(params[0].newSubStr))
          magicaction.getSerialInfo(params[0].newSubStr, 1)
        break
      default:
        string2ReplaceParam(text).forEach(param => {
          "test".replace(param.regexp, param.newSubStr)
        })
        break
    }
  } catch {
    return false
  }
  return true
}

export default checkInputCorrect
