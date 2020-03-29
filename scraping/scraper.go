package scraping

import (
	"join-react-test/types"
	"log"

	"github.com/gocolly/colly"
)

type Scraper struct {
}

func NewScraper() *Scraper {
	return &Scraper{}
}

func (s *Scraper) Scrape(URL string) (*types.ContactPerson, string) {
	c := colly.NewCollector(
		colly.UserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:62.0) Gecko/20100101 Firefox/62.0"),
	)

	contactPerson := &types.ContactPerson{}
	description := ""

	c.OnHTML(".kcOULW", func(e *colly.HTMLElement) {
		log.Println(e.Text)
		description = e.Text

	})

	c.OnHTML(".dWhPgx", func(e *colly.HTMLElement) {
		contactPerson.PhotoURL = "https:" + e.Attr("src")
	})

	c.OnHTML(".dSWivf", func(e *colly.HTMLElement) {
		contactPerson.Name = e.Text
	})

	c.OnHTML(".bHFtya", func(e *colly.HTMLElement) {
		contactPerson.Role = e.Text
	})

	c.Visit(URL)

	return contactPerson, description
}
