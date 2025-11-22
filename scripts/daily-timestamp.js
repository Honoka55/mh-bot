import { MediaWikiApi } from 'wiki-saikou';
import config from './utils/config.js';

const api = new MediaWikiApi(config.api, { headers: { 'user-agent': config.useragent } });

(async () => {
    console.log(`[${new Date().toISOString()}] Daily timestamp print started.`);
    await api.login(config.bot.name, config.bot.password);

    const { data } = await api.postWithToken(
        'csrf',
        {
            action: 'edit',
            title: 'User:Wixoss-bot/timestamp',
            text: '~~~~~',
            summary: 'Daily timestamp print.',
            bot: true,
            watchlist: 'nochange'
        },
        { retry: 10, noCache: true }
    );

    console.log(JSON.stringify(data));
    console.log(`[${new Date().toISOString()}] Daily timestamp print completed.`);
})();
