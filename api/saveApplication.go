package api

import (
	"encoding/json"
	"log"
	"net/http"

	"join-react-test/types"
)

func (api *API) SaveApplication(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	request := &types.Application{}

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(request)

	if err != nil {
		log.Println(err)
		api.errorResponse(w, err, http.StatusBadRequest)
		return
	}

	err = api.storage.SaveApplication(request)

	if err != nil {
		log.Println(err)
		api.errorResponse(w, err, http.StatusInternalServerError)
		return
	}

	api.response(w, request, http.StatusOK)
}
