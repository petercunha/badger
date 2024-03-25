# Badger
<div align="center">
  
  ![image](http://textfiles.com/underconstruction/FaFashionAvenueShow5164underconstruction.gif):
  ![image](https://github.com/petercunha/badger/assets/10228811/e3f26a0f-2032-4196-976b-d880eb22db34)
  ![image](http://textfiles.com/underconstruction/sosouthbeachcabana4302underconstruction.gif)
  
  ![image](http://textfiles.com/underconstruction/PaParisBistro7538Pikachu_construction.gif)
  ![image](http://textfiles.com/underconstruction/PaParisBistro7538Pikachu_construction.gif)
  ![image](http://textfiles.com/underconstruction/PaParisBistro7538Pikachu_construction.gif)
  
</div>

## Information
This app sends out notifications when Twitch releases a new chat badge. Many badges on Twitch are only available for limited time, so it's useful to get a notification when a new one drops.

### How it works: 
- Scrape Twitch's blog for any mention of the word "badge"
- Select results that were posted in the last 24 hours

### To do:
- Run a serverless function every 24 hours that runs the checker
- If there is a new post about a badge, send out notifications to a mailing / SMS list

### Future goals:
- Build a nice looking website where people can subscribe to notifications of new badges
- Add other methods of discovering new badges, other than just blog posts (I have a few in mind)
- P2W features (maybe, we'll see)

## Running the project
```bash
npm install
npm start
npm build
```
