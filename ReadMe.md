># Зависимости
>> - Node.js
>> - Golang
># Запуск
>> - sqldump-backup/bckp.backup - дамп БД 
>> ## Backend 
>>### из главной дирректории 
>>> go mod tidy --> установка зависимостей
>>> go run ./cmd/apiserver/main.go - запуск сервера
>> ## Frontend
>>### из главной дирректории
>>>  npm i ./simple-front - установка нод-модулей
>>> npm start --prefix ./simple-front  - запуск фронта