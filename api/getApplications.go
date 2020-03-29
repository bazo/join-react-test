package api

import (
	"log"
	"net/http"
)

func (api *API) GetApplications(w http.ResponseWriter, r *http.Request) {

	applications, err := api.storage.GetApplications()

	if err != nil {
		log.Println(err)
		api.errorResponse(w, err, http.StatusInternalServerError)
		return
	}

	api.response(w, applications, http.StatusOK)
}
