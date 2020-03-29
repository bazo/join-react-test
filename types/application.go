package types

type Application struct {
	ID         string `json:"positionId,omitempty"`
	PositionID string `json:"positionId"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	FirstName  string `json:"firstName"`
	LastName   string `json:"lastName"`
	Phone      string `json:"phone"`
	Photo      Photo  `json:"photo"`
}

type Photo struct {
	MediaType   string `json:"mediaType"`
	ContentType string `json:"contentType"`
	Base64      bool   `json:"base64"`
	Data        string `json:"data"`
}
