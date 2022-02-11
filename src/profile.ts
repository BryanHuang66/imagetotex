const profileType = {
  mathpix: {
    AppID:"",
    AppKey: "",
    clickToactivate:false,
    ifDelPic:false,
    HtmlOrTxT:false,
    PasteBoardset:false,
    panelPostion: [0],
    panelHeight: [1],
    doubleClick: false
  },
  ifly:{
    APPID:"",
    APISecret:"",
    APIKey:"",
    clickToactivate:false,
    ifDelPic:false,
    HtmlOrTxT:false,
    PasteBoardset:false,
  }
}

/**
 * 单个插件开关
 */
export const enum on {
  ifly,
  // anotherautotitle,
  // autocomplete,
}

const docProfileType = {
  mathpix: {
    // autoCorrect: false
  },
}

export type IProfile = typeof profileType
export type IProfile_doc = typeof docProfileType

const profile: {
  [k: string]: { [k: string]: boolean | string | number[] }
} & IProfile = {
  ...profileType
}

const docProfile: {
  [k: string]: { [k: string]: boolean | string | number[] }
} & IProfile_doc = {
  ...docProfileType
}

export { profile, docProfile }
