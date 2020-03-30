package main

import (
	"context"
	"join-react-test/api"
	"join-react-test/storage"
	"log"
	"net/http"
	"os"
	"path/filepath"

	firebase "firebase.google.com/go"
	rice "github.com/GeertJohan/go.rice"
	"github.com/gorilla/mux"
	"github.com/unrolled/logger"
	"github.com/unrolled/recovery"
)

type spaHandler struct {
	staticPath string
	indexPath  string
	box        *rice.Box
}

func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path, err := filepath.Abs(r.URL.Path)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if path == "/" {
		path = h.indexPath
	}

	b, err := h.box.Bytes(path)

	if err != nil {
		log.Println(err)
		b, err = h.box.Bytes(h.indexPath)
	}

	w.Write(b)
}

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

	api := api.NewAPI(storage)

	candidateBox := rice.MustFindBox("./ui/candidate/build")

	router := mux.NewRouter()

	apiRouter := router.PathPrefix("/api").Subrouter()

	apiRouter.HandleFunc("/positions", api.GetPositions).Methods(http.MethodGet)
	apiRouter.HandleFunc("/positions/{id}", api.GetPosition).Methods(http.MethodGet)
	apiRouter.HandleFunc("/applications", api.SaveApplication).Methods(http.MethodPut)
	apiRouter.HandleFunc("/applications", api.GetApplications).Methods(http.MethodGet)

	spaC := spaHandler{staticPath: "build", indexPath: "index.html", box: candidateBox}
	router.PathPrefix("/").Handler(spaC)

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
