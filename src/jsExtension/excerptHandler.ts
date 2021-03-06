import { profile } from "profile"
import { delayBreak, log, showHUD } from "utils/common"
import { util as mathpix } from "addons/mathpix"
import {util as ifly} from "addons/ifly"
import {deleteNoteById,getNoteById} from "utils/note"
// import {util as autocomplete} from "addons/autocomplete"

// const importDynamic = new Function('modulePath', 'return import(modulePath)');

// const fetch = async (...args:any[]) => {
//   const module = await importDynamic('node-fetch');
//   return module.default(...args);
// };
// import { RequestInfo, RequestInit } from 'node-fetch';
// const fetch = (url:RequestInfo, init?:RequestInit) => import('node-fetch').then(module => module.default(url, init));
let note: MbBookNote
let nodeNote: MbBookNote

let isOCR: boolean
let isComment: boolean
let isModifying: boolean
let lastExcerptText: string | undefined

export default async (_note: MbBookNote, _lastExcerptText?: string) => {
  if (profile.mathpix.clickToactivate) {
  note = _note
  lastExcerptText = _lastExcerptText
 
  // log(note,'shownote')
  // log(nodeNote,'shownodenote')
  // log(note.excerptPic,'info')
  // log(note.excerptText,'info')
  log(lastExcerptText,'lastexcerpt')
  if (note.excerptPic && lastExcerptText=="π"){
  var pic_input = note.excerptPic
  var hash = (pic_input?.paint) ? pic_input.paint : ""
  try{var pic_info = Database.sharedInstance().getMediaByHash(hash)}catch(error){showHUD('ζ²‘ζζΎε°ε―ΉεΊεΎη')}
  // var text_input = note.excerptText
  log(pic_info,'responeseok')
  log(pic_info?.length(),'responeseok')
  log(pic_info?.base64Encoding(),'responseok')
  
  var pic_base64 = (pic_info) ? pic_info?.base64Encoding() : ""
  log("ζ­£ε¨ε€ηζε½", "excerpt")
  // showHUD("ε·²η»θΎε₯")
    // εε§εε¨ε±ει

  const result = await mathpix.getLatex(pic_base64)
  const result_latex = result.latex_styled
  const result_height = result.position.height
  const result_width = result.position.width
  const prefix = profile.mathpix.prefixOutput
  const suffix = profile.mathpix.suffixOutput
  log(result_height,"result_height")
  // showHUD(result)
  // log(result,'result')
  // note.noteTitle = result
  // log('success','add_title')
  const final_out_put = "```math\n"+result_latex+"\n```"
  // const index = getCommentIndex(nodeNote, note)
  // log(index,'get-index')
  log(result_width,'width')
  log(result_height,'height')
  nodeNote = note.groupNoteId ? getNoteById(note.groupNoteId) : note 
  
  if (!profile.mathpix.HtmlOrTxT){
  // log(final_out_put,'html+del')
  if (nodeNote.comments.length && profile.mathpix.ifDelPic){
  nodeNote.appendHtmlComment(final_out_put,final_out_put,{width:result_width, height:result_height},'MarkDownEditor')
  try{deleteNoteById(note.noteId?note.noteId:"")}catch(error){log(error,'error-delete')}
  }else{
    // log(final_out_put,'html+keep')
    nodeNote.appendHtmlComment(final_out_put,final_out_put,{width:result_width, height:result_height},'MarkDownEditor')}}
  else{
    if (nodeNote.comments.length && profile.mathpix.ifDelPic){
      // log(final_out_put,'txt+del')
    nodeNote.appendTextComment(result_latex)
    try{deleteNoteById(note.noteId?note.noteId:"")}catch(error){log(error,'error-delete')}
    }else{
      // log(final_out_put,'txt')
      nodeNote.appendTextComment(result_latex)}}
  // note.excerptText= ""
  // log(nodeNote,'nodeNote')
  // note.appendTextComment(result)
  // log(note.parentNote,'parent_node')
  // log(note.originNoteId,'originNote')
  // log(note.comments,'comments')
  // log(note.groupNoteId,'groupNoteID')
  log(final_out_put,"success")
  if(profile.ifly.PasteBoardset || profile.mathpix.PasteBoardset){
    UIPasteboard.generalPasteboard().string = prefix + result_latex + suffix
    showHUD("ε·²ε€εΆε°εͺθ΄΄ζΏ")
    log(result_latex,'pasteboard')
  }}}

  if(profile.ifly.clickToactivate){
    note = _note
    lastExcerptText = _lastExcerptText
   
    log(note,'shownote')
    // log(nodeNote,'shownodenote')
    // log(note.excerptPic,'info')
    // log(note.excerptText,'info')
    log(lastExcerptText,'lastexcerpt')
    if (note.excerptPic && lastExcerptText=="π"){
    var pic_input = note.excerptPic
    var hash = (pic_input?.paint) ? pic_input.paint : ""
    try{var pic_info = Database.sharedInstance().getMediaByHash(hash)}catch(error){showHUD('ζ²‘ζζΎε°ε―ΉεΊεΎη')}
    // var text_input = note.excerptText
    log(pic_info,'responeseok')
    log(pic_info?.length(),'responeseok')
    log(pic_info?.base64Encoding(),'responseok')
    
    var pic_base64 = (pic_info) ? pic_info?.base64Encoding():""
    log("ζ­£ε¨ε€ηζε½", "excerpt")
    // showHUD("ε·²η»θΎε₯")
      // εε§εε¨ε±ει
  
    const result = await ifly.getLatex(pic_base64)
    const result_latex = result.latex_info
    const final_out_put = "```math\n"+result_latex+"\n```"
    const prefix = profile.ifly.prefixOutput
    const suffix = profile.ifly.suffixOutput
    // const index = getCommentIndex(nodeNote, note)

    nodeNote = note.groupNoteId ? getNoteById(note.groupNoteId) : note 
    
    if (!profile.ifly.HtmlOrTxT){
    // log(final_out_put,'html+del')
    if (nodeNote.comments.length && profile.ifly.ifDelPic){
    nodeNote.appendHtmlComment(final_out_put,final_out_put,{width:340, height:100},'MarkDownEditor')
    try{deleteNoteById(note.noteId?note.noteId:"")}catch(error){log(error,'error-delete')}
    }else{
      // log(final_out_put,'html+keep')
      nodeNote.appendHtmlComment(final_out_put,final_out_put,{width:340, height:100},'MarkDownEditor')}}
    else{
      if (nodeNote.comments.length && profile.ifly.ifDelPic){
        // log(final_out_put,'txt+del')
      nodeNote.appendTextComment(result_latex)
      try{deleteNoteById(note.noteId?note.noteId:"")}catch(error){log(error,'error-delete')}
      }else{
        // log(final_out_put,'txt')
        nodeNote.appendTextComment(result_latex)}}
    
    log(final_out_put,"success")
    if(profile.ifly.PasteBoardset || profile.mathpix.PasteBoardset){
      UIPasteboard.generalPasteboard().string = prefix + result_latex + suffix
      showHUD("ε·²ε€εΆε°εͺθ΄΄ζΏ")
      log(result_latex,'pasteboard')
    }} 
  }
  }