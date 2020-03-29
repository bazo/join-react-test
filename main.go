package main

import (
	"context"
	"join-react-test/api"
	"join-react-test/storage"
	"log"

	firebase "firebase.google.com/go"
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

	err = storage.Seed()

	log.Println(err)

	api := api.NewAPI(storage)

	log.Println(api)
}
