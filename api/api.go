package api

import (
	"encoding/json"
	"join-react-test/storage"
	"net/http"
)

type API struct {
	storage *storage.Storage
}

func NewAPI(storage *storage.Storage) *API {
	return &API{
		storage: storage,
	}
}

func (api *API) response(w http.ResponseWriter, v interface{}, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(v)
}

func (api *API) createdResponse(w http.ResponseWriter, v interface{}) {
	api.response(w, v, http.StatusCreated)
}

func (api *API) errorResponse(w http.ResponseWriter, err error, code int) {
	api.response(w, map[string]string{
		"error": err.Error(),
	}, code)
}

func (api *API) internalServerErrorResponse(w http.ResponseWriter, err error) {
	api.errorResponse(w, err, http.StatusInternalServerError)
}
