package api

import (
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (api *API) GetReceipts(w http.ResponseWriter, r *http.Request, params httprouter.Params) {

	positions, err := api.storage.GetPositions()

	if err != nil {
		log.Println(err)
		api.errorResponse(w, err, http.StatusInternalServerError)
		return
	}

	api.response(w, positions, http.StatusOK)
}
