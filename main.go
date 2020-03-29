package main

import (
	"join-react-test/api"
	"log"
)

func main() {
	api := api.NewAPI()

	log.Println(api)
}
