# Badger

## Information
This app sends out notifications when Twitch releases a new chat badge. Many badges on Twitch are only available for limited time, so it's useful to get a notification when a new one drops. It's intended to be run on a daily cron job.

### How it works: 
- Scrape Twitch's blog for any mention of the word "badge"
- Store all results in DB
- If anything new is found, send out email notifications

### To do:
- Build a nice looking website where people can subscribe to notifications of new badges
- Add other methods of discovering new badges, other than just blog posts (I have a few in mind)
- P2W features (maybe, we'll see)

## Running the project
```bash
npm install
npm start
npm build
```
