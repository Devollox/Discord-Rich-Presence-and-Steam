import { promises as fs } from 'fs'
import getData from './data'

const rpc = require('discord-rpc')
const client = new rpc.Client({ transport: 'ipc' })
const ps = require('ps-node')
const processName = 'Discord.exe'

const STORAGE_FILE = './storage.json'

async function readStorage() {
	try {
		const data = await fs.readFile(STORAGE_FILE, 'utf-8')
		return JSON.parse(data)
	} catch (err) {
		return { currentIndex: 0 }
	}
}

async function writeStorage(data: { currentIndex: any }) {
	await fs.writeFile(STORAGE_FILE, JSON.stringify(data))
}

function discordRich() {
	async function startSession() {
		const storage = await readStorage()
		let currentIndex = storage.currentIndex
		let timestamps: { start: number } = null

		async function fetchActivity() {
			const {
				url,
				urlGames,
				gamesScreenshots,
				gamesRecommended,
				gamesCount,
				personaName,
				avatars,
				infoPropfile,
				infoLastGamesName,
				infoLastGamesDetails,
				infoLastGamesNameUrl,
			} = await getData()

			const buttons = []
			const gameDetails = [gamesCount, gamesScreenshots, gamesRecommended]
			let smallText: string, smallImage: string

			buttons.push({
				label: `Мой Steam`,
				url: `${url}`,
			})

			if (infoPropfile === 'В игре') {
				buttons.push({
					label: `Играю в ${infoLastGamesName}`,
					url: `${infoLastGamesNameUrl}`,
				})

				smallImage = `${urlGames}`
				smallText = infoLastGamesName
			} else {
				buttons.push({
					label: `Смотрю...`,
					url: `https://www.youtube.com/`,
				})

				smallImage = '0'
			}

			if (!timestamps) {
				timestamps = {
					start: Date.now(),
				}
			}

			client.request('SET_ACTIVITY', {
				pid: process.pid,
				activity: {
					details: `${personaName} - ${gameDetails[currentIndex]}.`,
					state: `${infoLastGamesName} - ${infoLastGamesDetails}`,
					assets: {
						large_image: `https://media1.tenor.com/m/M-9He9G2OpsAAAAC/spetdacne.gif`,
						large_text: `${infoPropfile}`,
						small_image: smallImage,
						small_text: smallText,
					},
					timestamps: timestamps,
					buttons: buttons,
				},
			})

			currentIndex = (currentIndex + 1) % gameDetails.length
			await writeStorage({ currentIndex })
		}

		client.on('ready', async () => {
			await fetchActivity()
			setInterval(() => {
				fetchActivity()
			}, 20 * 1000)
		})

		client.login({ clientId: '1354438025194508488' }).catch(console.error)
	}

	function restartProcess() {
		ps.lookup(
			{ command: processName },
			(err: any, resultList: string | any[]) => {
				if (err) {
					console.error(err)
					return
				}

				if (resultList.length <= 1) {
					console.log(`Process ${processName} not found. Restart... Search.`)
					findAndRestartProcess()
				} else {
					console.log(`Process ${processName} detected!`)
				}
			}
		)
	}

	function findAndRestartProcess() {
		ps.lookup(
			{ command: processName },
			(err: any, resultList: string | any[]) => {
				if (err) {
					console.error(err)
					return
				}

				if (resultList.length === 0) {
					console.log(`Process ${processName} not found. Restart...`)
					setTimeout(findAndRestartProcess, 5000)
				} else {
					console.log(`Process ${processName} found. PID: ${resultList[0].pid}`)
					setTimeout(startSession, 25000)
					setInterval(restartProcess, 3600000)
				}
			}
		)
	}

	findAndRestartProcess()
}

export default discordRich
