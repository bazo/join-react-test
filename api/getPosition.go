package api

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func (api *API) GetPosition(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	position, err := api.storage.GetPosition(vars["id"])

	if err != nil {
		log.Println(err)
		api.errorResponse(w, err, http.StatusInternalServerError)
		return
	}

	api.response(w, position, http.StatusOK)
}
