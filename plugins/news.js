const DeranaNews = require('@mrhansamala/derana-news-scraper');
const { sendMessage } = require('./bot'); // Adjust this according to how you send messages in your bot

// WhatsApp group ID (adjust this with your actual group ID)
const GROUP_ID = 'https://chat.whatsapp.com/IE79e3b2KsG6dgz6bBGFSJ';

// Variable to keep track of the latest news sent
let lastNewsTitle = '';

async function fetchAndSendNews() {
    try {
        // Fetch the latest news from AdaDerana
        const news = await DeranaNews.getNews();

        if (news.length > 0) {
            const latestNews = news[0]; // Get the most recent news item

            // Check if the latest news is new
            if (latestNews.title !== lastNewsTitle) {
                // Construct the message
                const newsMessage = `
📰 *Latest News from AdaDerana* 📰

*${latestNews.title}*
${latestNews.link}

Published at: ${latestNews.pubDate || 'Unknown'}

ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʜᴀʀᴜᴋᴀ ᴍᴀʜᴇꜱʜ
                `;

                // Prepare the thumbnail image (if available)
                const thumbnailUrl = latestNews.thumbnail || null; // Assume 'thumbnail' field holds the image URL

                // Send the news with the thumbnail (if available)
                if (thumbnailUrl) {
                    await conn.sendMessage(GROUP_ID, {
                        image: { url: thumbnailUrl },
                        caption: newsMessage
                    });
                } else {
                    // Send only text if no thumbnail is available
                    await sendMessage(GROUP_ID, { text: newsMessage });
                }

                // Update the lastNewsTitle to avoid duplicates
                lastNewsTitle = latestNews.title;
            }
        }
    } catch (error) {
        console.error('Error fetching or sending news:', error);
    }
}

// Function to run the news checker every 30 minutes (1800000 ms)
setInterval(fetchAndSendNews, 1800000); // Adjust the interval as needed

// Initial call to start immediately when the bot starts
fetchAndSendNews();
