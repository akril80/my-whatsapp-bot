const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect.create({
  session: 'session',
  puppeteerOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
}).then(client => {
  client.onMessage(async msg => {
    if (msg.body.toLowerCase().includes('הצטרפות')) {
      await client.sendText(msg.from, 'תודה שהצטרפת 🙌');
      await client.sendButtons(
        msg.from,
        'בחר מה מעניין אותך:',
        [
          { buttonId: 'courses', buttonText: { displayText: '📚 קורסים' } },
          { buttonId: 'shop', buttonText: { displayText: '🛒 חנות' } },
          { buttonId: 'support', buttonText: { displayText: '☎️ שירות לקוחות' } }
        ],
        'תפריט'
      );
    } else if (msg.selectedButtonId) {
      const id = msg.selectedButtonId;
      if (id === 'courses') await client.sendText(msg.from, 'קורסים ➜ https://example.com/courses');
      if (id === 'shop') await client.sendText(msg.from, 'חנות ➜ https://example.com/shop');
      if (id === 'support') await client.sendText(msg.from, 'שירות לקוחות: 050‑1234567');
    }
  });
}).catch(e => console.error(e));
