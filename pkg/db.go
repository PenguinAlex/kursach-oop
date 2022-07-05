package pkg

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v4"
	"github.com/joho/godotenv"
	"log"
	"os"
)

type Rest struct {
	Name string `json:"name"`
}

func SqlSelect(query string) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	fmt.Println("Started")
	var dbConf = fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s",
		os.Getenv("DBUSER"),
		os.Getenv("dbpassword"),
		os.Getenv("HOST"),
		os.Getenv("dbport"),
		os.Getenv("dbname"),
	)
	db, err := pgx.Connect(context.Background(), dbConf)
	if err != nil {
		panic(err.Error())
	}
	defer db.Close(context.Background())

	results, err := db.Query(context.Background(), query)
	if err != nil {
		panic(err.Error())
	}
	for results.Next() {
		var user Rest
		err = results.Scan(&user.Name)
		if err != nil {
			panic(err.Error())
		}
		fmt.Println(user.Name)
	}
}
