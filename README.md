
## Integration with steam is done using puppeteer and discord-rpc

Automatically updates your data from steam every 20 seconds. Attention, it is recommended that your profile is open. Shows your activity, what you play and how long ago, your last launch. 
Automatically finds the discord process, can add it to autostart
![image](https://github.com/user-attachments/assets/4fbe0c75-fb24-48ff-9aca-03ed46cbf9ca) ![image](https://github.com/user-attachments/assets/d9016d37-56cb-4ee9-948f-359ada2e8d66)


Fully customizable, you can change the picture, the name of the main application and your profile.

> To change the profile to yours, go to the src>data.ts folder and find the url line

```js
let url = 'https://steamcommunity.com/id/Devollox/'
```

> To change the large image, go to discord.ts and find the line `large_image:`, you can change the text and small image there


To run use `npm run start` to get a full application `npm run make`
When using `npm run make` - the out folder will appear and there you will find the application
