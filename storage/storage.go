package storage

import (
	"cloud.google.com/go/firestore"
)

const POSITIONS = "positions"
const CANDIDATES = "candidates"

type Storage struct {
	f *firestore.Client
}

func NewStorage(f *firestore.Client) *Storage {
	return &Storage{f: f}
}
