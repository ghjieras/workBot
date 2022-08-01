const fs = require("fs")
const express = require("express")
const linebot = require("linebot")
// const planData = require("./data.js").plan

var bot = linebot({
  channelId: "1657339713",
  channelSecret: "e4432011e329121728753443c0025196",
  channelAccessToken: "OXbqTF+bUiAjww60LwXnQDKEeI00Cu5JcmDubzE8iXIDZR/e77qY8rocalulRfEzPHTfIoZuH4jDTEJ2swWLzRSxlYbbnTPHSHU7kDw8rrZEIGUwD20c0o+se0wcvvUfrkJp27GZqMWwvzsHuY/F3gdB04t89/1O/w1cDnyilFU=",
  verify: true
})


let userId = ""
let count = 0


bot.on('message', (event) => {
  let Msg = event.message.text
  let replyErrorMsg = ""
  // 取得使用者的userId
  userId = event.source.userId

  if (event) {
    // 回復的訊息從檔案內取得
    let replyMessage = readData(Msg)
    console.log("使用者輸入的內容：" + Msg)
    if (typeof(replyMessage) == "object") {
      for(key in replyMessage) {
          bot.push(userId, `以下是所有關於${Msg}的文件:\n${key}: ${replyMessage[key]}`);
      }
      count = 0
    } else {
        count = count + 1
        replyErrorMsg =  (count >= 3) ? "腦袋很重要，我希望你也有一顆" : "無效的輸入內容"
        event.reply(replyErrorMsg).then((data) => {
          console.log(`error:輸入錯誤`)
          console.log(data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
})




// const app = express();
// const linebotParser = bot.parser();
// app.get("/", function (req, res) { 
//     res.send("Hello LineBot");
// });

// app.post('/', linebotParser);




// 監聽
bot.listen('/linewebhook', 3000, () => {
  console.log("BOT已經準備就緒")
})




function readData (Msg) {
  let data = fs.readFileSync("./data.json", "utf-8")
  let reData =  JSON.parse(data)
  let result = reData[Msg]
  return result == undefined ? " " : result[0]
}




// function replyMsg(Msg) {
//   let returnValue =  ""
//   let newMessage = Msg.toString()
//   let Data = []
//   console.log(planData[Msg])
//   planData[Msg].forEach(element => {
//     Data.push(element)
//   });
//   // Data = planData[newMessage]
//   returnValue = `${Data}`

//   return returnValue
// }

// replyMsg(6001)