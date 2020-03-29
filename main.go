package main

import (
	"context"
	"join-react-test/api"
	"join-react-test/storage"
	"log"
	"net/http"
	"os"

	firebase "firebase.google.com/go"
	"github.com/gorilla/mux"
	"github.com/unrolled/logger"
	"github.com/unrolled/recovery"
)

func main() {

	ctx := context.Background()
	app, err := firebase.NewApp(ctx, nil)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	defer client.Close()
	storage := storage.NewStorage(client)

	/*
		scraper := scraping.NewScraper()
		seeder := seeder.NewSeeder(storage, scraper)
		err = seeder.Seed()
	*/

	log.Println(err)

	api := api.NewAPI(storage)

	log.Println(api)

	router := mux.NewRouter()

	apiRouter := router.PathPrefix("/api").Subrouter()

	apiRouter.HandleFunc("/positions", api.GetPositions)
	apiRouter.HandleFunc("/positions/{id}", api.GetPosition)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8200"
		log.Printf("Defaulting to port %s", port)
	}

	addr := ":" + port

	log.Println("Listening on", addr)

	loggerHandler := logger.New()
	recoveryHandler := recovery.New()

	log.Fatal(http.ListenAndServe(addr, loggerHandler.Handler(recoveryHandler.Handler(router))))
}
