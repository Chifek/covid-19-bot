# covid-19-bot
Telegram-bot for covid information

#Requirements

NodeJS 12

Telegram: @chifek_covid_bot


**How to run**

собрать контейнер:
```docker build -t chifek/node-bot-app .```

запустить контейнер:
```docker run -p 49160:8080 -d chifek/node-bot-app```

отобразить все контейнеры, чтобы получить id нужного нам:```docker ps```

отобразить логи
```docker logs <container_id>```

войти в контейнер в интерактивном режиме
```docker exec -it <container id> /bin/bash```
