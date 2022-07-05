package todo

import "time"

type User struct {
	Id    int    `json:"-"`
	Phone string `json:"phone"`
}

type Restaurant struct {
	Id    int     `json:"-"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

type RestaurantTable struct {
	Id           int `json:"-"`
	RestaurantId int `json:"-"`
	Persons      int `json:"-"`
	Amount       int `json:"-"`
}

type Order struct {
	Id                int       `json:"-"`
	RestaurantTableId int       `json:"-"`
	UserId            int       `json:"-"`
	Timing            time.Time `json:"-"`
}
