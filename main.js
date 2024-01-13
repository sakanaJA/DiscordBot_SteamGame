const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();

const steamApiUrl = 'https://api.steampowered.com/ISteamApps/GetAppList/v2/'; // Steam API URL

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    if (message.content === '!steam') {
        try {
            const response = await axios.get(steamApiUrl, { params: { key: process.env.TOKEN } });
            // ここでSteamの人気ゲームのデータを取得し、整形します。
            // Steam APIの応答構造に応じてコードを調整する必要があります。
            const games = response.data; // 仮のレスポンスデータ
            let reply = 'Steamの人気ゲーム:\n';
            games.forEach(game => {
                reply += `${game.name}\n`; // ゲーム名を追加
            });
            message.channel.send(reply);
        } catch (error) {
            console.error(error);
            message.channel.send('エラーが発生しました。');
        }
    }
});

client.login(process.env.TOKEN);


