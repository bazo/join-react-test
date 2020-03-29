package storage

import (
	"encoding/json"
	"io/ioutil"
	"join-react-test/types"
	"os"

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

func (s *Storage) Seed() error {
	jsonFile, err := os.Open("data/positions.json")
	if err != nil {
		return err
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var positions types.Positions

	json.Unmarshal(byteValue, &positions)

	for _, position := range positions {
		err := s.SavePosition(&position)

		if err != nil {
			return err
		}
	}

	return nil
}
