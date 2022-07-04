package main

import (
	httpserver "github.com/PenguinAlex/my-first-go-rest-app"
	"log"
)

func main() {
	//запуск сервера на 8080 порту
	srv := new(httpserver.Server)
	if err := srv.Run("8080"); err != nil {
		log.Fatal(err)
	}
}
