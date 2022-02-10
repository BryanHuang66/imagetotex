import { profile } from "profile"
import { delay, log, showHUD } from "utils/common"

// 面板和按键状态
let panelStatus = false

// 设置窗口面板的位置和大小
export const layoutViewController = () => {
  const frame = self.studyController.view.bounds
  const width = 300
  const height = [600, 450, 300][profile.mathpix.panelHeight[0]]
  const autoX = () => {
    const readerView = <UIView>self.studyController.readerController.view
    const isHidden = readerView.hidden
    if (self.studyController.rightMapMode) {
      const x = readerView.frame.width - width - 40
      return x < 50 || isHidden ? 50 : x
    } else {
      const x = frame.width - readerView.frame.width + 40
      return x > frame.width - width - 50 || isHidden
        ? frame.width - width - 50
        : x
    }
  }
  const x = [autoX(), 50, (frame.width - width) / 2, frame.width - width - 50][
    profile.mathpix.panelPostion[0]
  ]
  self.settingViewController.view.frame = {
    x,
    y: 110,
    height,
    width
  }
}

export const closePanel = () => {
  if (!panelStatus) return
  self.settingViewController.view.removeFromSuperview()
  panelStatus = false
  self.studyController.refreshAddonCommands()
}

let lastOpenPanel = 0
const openPanel = () => {
  if (panelStatus) return
  self.studyController.view.addSubview(self.settingViewController.view)
  panelStatus = true
  self.studyController.refreshAddonCommands()
  lastOpenPanel = Date.now()
  if (self.studyController.docMapSplitMode == docMapSplitMode.allDoc) {
    self.studyController.docMapSplitMode = docMapSplitMode.half
    // showHUD("OhMyMN 与脑图更配喔", 1)
  }
  delay(0.2).then(() => void self.studyController.becomeFirstResponder())
}

let lastClickButton = 0
const switchPanel = () => {
  if (panelStatus) closePanel()
  else {
    if (profile.mathpix.doubleClick) {
      const now = Date.now()
      if (lastClickButton && now - lastClickButton < 300) openPanel()
      else lastClickButton = now
    } else openPanel()
  }
}

// 改变各个 view 的时候就会触发，非常频繁，我们只需要在打开面板的时候触发一次，记录一下最近一次面板打开的时间
const controllerWillLayoutSubviews = (controller: UIViewController) => {
  if (controller != self.studyController) return
  if (!panelStatus) return
  if (Date.now() - lastOpenPanel < 200) layoutViewController()
}

const queryAddonCommandStatus = () => {
  // 仅在学习模式下打开
  if (self.studyController.studyMode == studyMode.study)
    return {
      image: "logo.png",
      object: self,
      selector: "switchPanel:",
      checked: panelStatus ? true : false
    }
  return null
}

export default {
  queryAddonCommandStatus,
  switchPanel,
  controllerWillLayoutSubviews
}
