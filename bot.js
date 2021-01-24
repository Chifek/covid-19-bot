const {Telegraf} = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

const covidApi = require('covid19-api');
const COUNTRIES_LIST = require('./const')

bot.start(ctx => ctx.reply(`
    Привет ${ctx.from.first_name}! 
    Узнай статистику по Короне. 
    Введи страну на английском языке и получи статистику.
    Получить весь список стран можно по команде /help."
`))
bot.help(ctx => ctx.reply(COUNTRIES_LIST))
bot.on('text', async (ctx) => {
  try {
    const userText = ctx.message.text
    const covidData = await covidApi.getReportsByCountries(userText)
    const countryData = covidData[0][0]
    const deepCountryData = covidData[0][0].active_cases[0]
    const formatData = `
            Страна: ${countryData.country},
            Случаи: ${countryData.cases},
            Смерти: ${countryData.deaths},
            Кол-во болеющих в данный момент: ${deepCountryData.currently_infected_patients},
            Кол-во болеющих в сред.состоянии: ${deepCountryData.inMidCondition},
            Кол-во болеющих в крит.состоянии: ${deepCountryData.criticalStates},
            Выздоровело: ${countryData.recovered}`
    ctx.reply(formatData)
  } catch (e) {
    ctx.reply('Такой страны не существует, для получения списка стран используй команду /help')
  }
})
bot.launch()
