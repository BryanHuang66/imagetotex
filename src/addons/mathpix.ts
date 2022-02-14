import { profile } from "profile"
import { isOCNull, log, showHUD } from "utils/common"
// import { util as autostandardize } from "./autostandardize"
import {fetch,post} from "utils/network"
const config: IConfig = {
  name: "Mathpix",
  intro: '推荐使用此API，点击链接访问Mathpix API官网',
  link: "https://mathpix.com/ocr",
  settings: [
    {
      key: "AppID",
      type: cellViewType.inlineInput,
      label: "填写自己的App ID",
    },
    {
      key: "AppKey",
      type: cellViewType.inlineInput,
      label: "填写自己的App Key"
    },
    {
      key: "clickToactivate",
      type: cellViewType.switch,
      label: "开启识别"
    },
    {
      key:"ifDelPic",
      type: cellViewType.switch,
      label:"删除原图（仅支持merge）"
    },
    {
      key:"HtmlOrTxT",
      type: cellViewType.switch,
      label:"纯文本输出", 
    },
    {
      key:"PasteBoardset",
      type:cellViewType.switch,
      label:"复制到剪贴板"
    },
    {
      key:"prefixOutput",
      type:cellViewType.inlineInput,
      label:"前缀"
    },
    {
      key:"suffixOutput",
      type:cellViewType.inlineInput,
      label:"后缀"
    }
    
  ],
  actions: []
}


const util = {
  async getLatex(base64String: String): Promise<any> {

  var url = "https://api.mathpix.com/v3/latex"
  var data_input = {
                  "src": "data:image/jpg;base64,"+base64String,
                  "formats":["latex_styled"],
                  "ocr":["math","text"],
                  "alphabets_allowed":{
                    "hi":"False",
                    "ja":"False",
                    "ko":"False",
                    "ru":"False",
                    "th":"False",
                    "ta":"False",
                    "te":"False",
                    "gu":"False",
                    "bn":"False",
                    "vi":"False",
                    "zh":"True",
                    "en":"True"
                  }
  }
  // log(data_input.data_options,'excerpt')
  var header = {
                  "content-type": "application/json",
                  "app_id": profile.mathpix.AppID , //profile.mathpix.AppID,
                  "app_key": profile.mathpix.AppKey //profile.mathpix.AppKey,
              };
  const res = await post(url,{method: 'POST',headers:header,body:data_input}).then(
    res => res.json()
  )
  log(res,'post-response')
  return res
  },

  
}

const action: IActionMethod = {
  
}

export { config, util, action }