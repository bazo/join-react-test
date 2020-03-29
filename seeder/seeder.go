package seeder

import (
	"encoding/json"
	"io/ioutil"
	"join-react-test/scraping"
	"join-react-test/storage"
	"join-react-test/types"
	"os"
)

type Seeder struct {
	storage *storage.Storage
	scraper *scraping.Scraper
}

func NewSeeder(storage *storage.Storage, scraper *scraping.Scraper) *Seeder {
	return &Seeder{
		storage: storage,
		scraper: scraper,
	}
}

func (s *Seeder) Seed() error {
	jsonFile, err := os.Open("data/positions.json")
	if err != nil {
		return err
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var positions types.Positions

	json.Unmarshal(byteValue, &positions)

	for _, position := range positions {

		contactPerson, description := s.scraper.Scrape(position.Data.URL.URL)

		position.ContactPerson = *contactPerson
		position.Description = description

		err := s.storage.SavePosition(&position)

		if err != nil {
			return err
		}
	}

	return nil
}
