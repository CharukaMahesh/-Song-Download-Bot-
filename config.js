const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID,
ALIVE_MSG: process.env.ALIVE_MSG || "හායී කොහොමද..👋",
ALIVE_IMG: process.env.ALIVE_IMG || "https://raw.githubusercontent.com/CharukaMahesh/-Song-Download-Bot-/main/img/20240909_203419.png",
    

};
