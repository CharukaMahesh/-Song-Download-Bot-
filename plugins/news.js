const DeranaNews = require('@mrhansamala/derana-news-scraper');
const { cmd } = require('../command');

// WhatsApp group ID (from your group link)
const GROUP_ID = 'IE79e3b2KsG6dgz6bBGFSJ';

// Variable to track the latest news
let lastNewsTitle = '';

async function fetchAndSendNews(conn) {
    try {
        // Fetch news from AdaDerana
        const news = await DeranaNews.getNews();

        if (news && news.length > 0) {
            const latestNews = news[0];

            // Check if the news is new
            if (latestNews.title !== lastNewsTitle) {
                lastNewsTitle = latestNews.title; // Update the last news title

                const newsMessage = `
📰 *Latest News from AdaDerana* 📰

*${latestNews.title}*
${latestNews.link}

Published at: ${latestNews.pubDate || 'Unknown'}

ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʜᴀʀᴜᴋᴀ ᴍᴀʜᴇꜱʜ
                `;

                // Send the news message with the thumbnail
                await conn.sendMessage(GROUP_ID, {
                    image: { url: latestNews.thumbnail }, // Send thumbnail if available
                    caption: newsMessage
                });
            }
        }
    } catch (error) {
        console.error('Error fetching or sending news:', error);
    }
}

// Set an interval to fetch and send news every 30 minutes (1800000 ms)
setInterval(() => {
    fetchAndSendNews(conn);
}, 1800000); // 30 minutes interval

// Command to manually fetch news
cmd({
    pattern: 'news',
    desc: 'Fetch the latest news manually',
    category: 'information',
    filename: __filename
},
async(conn, mek) => {
    await fetchAndSendNews(conn);
});
