package main

import "github.com/PenguinAlex/my-first-go-rest-app/pkg"

type Rest struct {
	Name string `json:"name"`
}

func main() {
	//загрузка окржения
	pkg.SqlSelect("SELECT name FROM restaurant")
}
