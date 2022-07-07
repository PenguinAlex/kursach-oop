package pkg

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v4"
	"github.com/joho/godotenv"
	"log"
	"os"
)

func getAddr() string {
	err := godotenv.Load()
	var dbConf = fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s",
		os.Getenv("DBUSER"),
		os.Getenv("dbpassword"),
		os.Getenv("HOST"),
		os.Getenv("dbport"),
		os.Getenv("dbname"),
	)
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	return dbConf
}
func SqlUpdate(queryRow string) {
	query := queryRow
	fmt.Println(query)
	var dbConf = getAddr()

	fmt.Println(dbConf)
	conn, err := pgx.Connect(context.Background(), dbConf)
	if err != nil {
		fmt.Println(err)
	}
	defer conn.Close(context.Background())
	_, err = conn.Exec(context.Background(), query)
	if err != nil {
		fmt.Println(err)
	}

}
func SqlSelectInfo(queryRow string) []string {
	var info []string
	query := queryRow
	var dbConf = getAddr()

	fmt.Println(dbConf)
	conn, err := pgx.Connect(context.Background(), dbConf)
	if err != nil {
		fmt.Println(err)
	}
	defer conn.Close(context.Background())
	rows, err := conn.Query(context.Background(), query)
	for rows.Next() {
		var str string
		rows.Scan(&str)
		info = append(info, str)
	}
	defer conn.Close(context.Background())

	fmt.Println(info)
	return info
}
