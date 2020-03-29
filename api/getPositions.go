package api

import (
	"log"
	"net/http"
)

func (api *API) GetPositions(w http.ResponseWriter, r *http.Request) {

	positions, err := api.storage.GetPositions()

	if err != nil {
		log.Println(err)
		api.errorResponse(w, err, http.StatusInternalServerError)
		return
	}

	api.response(w, positions, http.StatusOK)
}
