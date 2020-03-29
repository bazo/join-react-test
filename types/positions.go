package types

type Positions []Position

type Position struct {
	ID                   string        `json:"id"`
	Uid                  interface{}   `json:"uid"`
	Type                 PositionType  `json:"type"`
	Href                 string        `json:"href"`
	Tags                 []interface{} `json:"tags"`
	FirstPublicationDate string        `json:"first_publication_date"`
	LastPublicationDate  string        `json:"last_publication_date"`
	Slugs                []string      `json:"slugs"`
	LinkedDocuments      []interface{} `json:"linked_documents"`
	Lang                 Lang          `json:"lang"`
	AlternateLanguages   []interface{} `json:"alternate_languages"`
	Data                 Data          `json:"data"`
}

type Data struct {
	Title      []Title  `json:"title"`
	Department string   `json:"department"`
	Type       DataType `json:"type"`
	URL        URL      `json:"url"`
}

type Title struct {
	Type  TitleType     `json:"type"`
	Text  string        `json:"text"`
	Spans []interface{} `json:"spans"`
}

type URL struct {
	LinkType LinkType `json:"link_type"`
	URL      string   `json:"url"`
}

type TitleType string

const (
	Paragraph TitleType = "paragraph"
)

type DataType string

const (
	Employee   DataType = "employee"
	Internship DataType = "internship"
)

type LinkType string

const (
	Web LinkType = "Web"
)

type Lang string

const (
	EnUs Lang = "en-us"
)

type PositionType string

const (
	Job PositionType = "job"
)
