package main

import (
	"fmt"
	"github.com/PenguinAlex/my-first-go-rest-app/pkg"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
	"strings"
)

type Rest struct {
	Info string
}

func getInfo(context *gin.Context) {
	context.Header("Access-Control-Allow-Origin", "http://localhost:3000")
	context.IndentedJSON(http.StatusOK, pkg.SqlSelectInfo("SELECT row_to_json(row) FROM (select * from public.restaurant_table order by persons) row"))
	//Select max(max_persons) from (SELECT restaurant_id, Sum(persons) as "max_persons"  FROM public.restaurant_table group by restaurant_id) as sums
}
func getRestaurant(context *gin.Context) {
	context.Header("Access-Control-Allow-Origin", "http://localhost:3000")
	context.IndentedJSON(http.StatusOK, pkg.SqlSelectInfo("SELECT row_to_json(row) FROM (select * from public.restaurant order by waiting, price) row"))
}

func main() {
	//загрузка окржения
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	hostName := fmt.Sprintf("%s:%s", os.Getenv("HOST"), os.Getenv("PORT"))
	router := gin.Default()
	router.GET("api/info", getInfo)
	router.GET("api/rest", getRestaurant)
	router.GET("api/order", func(context *gin.Context) {
		context.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		time := "['" + strings.ReplaceAll(context.Query("time"), ",", "','") + "']"
		tables := strings.Split(context.Query("tables"), ",")
		fmt.Println(time, tables)
		var query string = ""
		for _, el := range tables {
			query += "UPDATE public.restaurant_table SET \"time\" =array_cat( \"time\", Array" + time + "::time without time zone[]) WHERE id = " + el + "; \n"
		}
		pkg.SqlUpdate(query)
	})
	router.Run(hostName)
}
