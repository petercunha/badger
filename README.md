# Badger
Get notified when Twitch releases new chat badges!

![image](https://github.com/petercunha/badger/assets/10228811/e3f26a0f-2032-4196-976b-d880eb22db34)

![image](http://textfiles.com/underconstruction/FaFashionAvenueShow5164underconstruction.gif)
![image](http://textfiles.com/underconstruction/HoHollywoodHeights4199Construction-Lemmings.gif)

![image](http://textfiles.com/underconstruction/HeHeartlandFlats7015underconstruction.gif)

## Information
### How it works: 
- Scrape Twitch's blog for any mention of the word "badge"
- Select results that were posted in the last 24 hours

### To do:
- Run a serverless function every 24 hours that checks blog posts
- If there is a new post about a badge, send out notifications to a mailing / SMS list

### Future goals:
- Build a nice looking website where people can subscribe to notifications of new badges
- Add other methods of discovering new badges, other than just blog posts (I have a few methods in mind)
- P2W features (maybe, we'll see)

## Running the project
```bash
npm install
npm start
npm build
```
