import { profile } from "profile"
import { isOCNull, log, showHUD } from "utils/common"
// import { util as autostandardize } from "./autostandardize"
import {fetch,post} from "utils/network"

const config: IConfig = {
  name: "iFly",
  intro: '讯飞免费接口，点击链接访问讯飞官网',
  link: "https://www.xfyun.cn/service/formula-discern",
  settings: [
    {
      key: "APPID",
      type: cellViewType.inlineInput,
      label: "填写自己的APPID",
    },
    {
        key:"APISecret",
        type: cellViewType.inlineInput,
        label: "填写自己的APISecret"
    },
    {
      key: "APIKey",
      type: cellViewType.inlineInput,
      label: "填写自己的APIKey"
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
  
    var url = "http://101.35.252.34:15005/ifly_detect"
    var data_input = {
        "APPID": profile.ifly.APPID , //profile.mathpix.AppID,
        "APIKey": profile.ifly.APIKey, //profile.mathpix.AppKey,
        "APISecret":profile.ifly.APISecret,
        "base64String":base64String
                    }

    const res = await post(url,{method: 'POST',body:data_input}).then(
      res => res.json()
    )
    log(res,'post-response')
    return res
    },
  
    
  }
  
  const action: IActionMethod = {
    
  }
  
  export { config, util, action }