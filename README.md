
## Integration with steam is done using puppeteer and discord-rpc

Automatically updates your data from steam every 20 seconds. Attention, it is recommended that your profile is open. Shows your activity, what you play and how long ago, your last launch. 
Automatically finds the discord process, can add it to autostart

- If you use this repo
   - Make sure [Node](https://nodejs.org/en/) is installed
   - Open your command-line interface
   - Do an `npm install`
   - Run `npm run start`
   - Make aplication `npm run make`
     
Fully customizable, you can change the picture, the name of the main application and your profile.

> To change the profile to yours, go to the src>data.ts folder and find the url line

```js
let url = 'https://steamcommunity.com/id/Devollox/'
```

> To change the large image, go to discord.ts and find the line `large_image:`, you can change the text and small image there


To run use `npm run start` to get a full application `npm run make`
When using `npm run make` - the out folder will appear and there you will find the application

![image](https://github.com/user-attachments/assets/4fbe0c75-fb24-48ff-9aca-03ed46cbf9ca) ![image](https://github.com/user-attachments/assets/efb91fef-e417-4176-8ec8-ddb01b37c8e7) ![image](https://github.com/user-attachments/assets/17def2b0-a7f8-4ed0-b0af-efba7473725c)
