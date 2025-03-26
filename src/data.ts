const puppeteer = require('puppeteer')

interface SteamProfileData {
	url: string
	gamesScreenshots: string
	gamesRecommended: string
	personaName: string
	urlGames: string
	avatars: string[]
	gamesCount: string
	infoPropfile: string
	infoLastGamesName: string
	infoLastGamesDetails: string
	infoLastGamesNameUrl: string
}

async function getData(): Promise<SteamProfileData> {
	let url = 'https://steamcommunity.com/id/Devollox/'
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(url, { waitUntil: 'networkidle2' })

	let avatars = await page.$$eval(
		'.playerAvatarAutoSizeInner img[src*="avatars"]',
		(images: { src: any }[]) => {
			return images.map((img: { src: any }) => img.src)
		}
	)

	let personaName = await page.$eval(
		'.actual_persona_name',
		(el: { innerText: string }) => el.innerText.trim()
	)

	let gamesCount = await page.$eval(
		'div.profile_item_links a[href*="games"]',
		(el: { innerText: string }) => el.innerText.trim()
	)

	let gamesScreenshots = await page.$eval(
		'div.profile_item_links a[href*="screenshots"]',
		(el: { innerText: string }) => el.innerText.trim()
	)

	let gamesRecommended = await page.$eval(
		'div.profile_item_links a[href*="recommended"]',
		(el: { innerText: string }) => el.innerText.trim()
	)

	let infoPropfile = await page.$eval(
		'.profile_in_game_header',
		(el: { innerText: string }) => el.innerText.trim()
	)

	let infoLastGamesName = await page.$eval(
		'.game_info .game_name a',
		(el: { innerText: string }) => el.innerText.trim()
	)

	let infoLastGamesDetails = await page.$eval(
		'.game_info .game_info_details',
		(el: { innerHTML: any }) => el.innerHTML.split('<br>').pop()
	)

	let infoLastGamesNameUrl = await page.$eval(
		'.game_info .game_name a',
		(el: { href: any }) => el.href
	)

	const gameId = infoLastGamesNameUrl.split('/').pop()

	let urlGames = await page.$$eval(
		`.game_info .game_info_cap a img[src*="${gameId}"]`,
		(images: any[]) => images.map(img => img.src)
	)

	await browser.close()

	return {
		url,
		urlGames,
		gamesScreenshots,
		gamesRecommended,
		personaName,
		avatars,
		gamesCount,
		infoPropfile,
		infoLastGamesName,
		infoLastGamesDetails,
		infoLastGamesNameUrl,
	}
}

export default getData
