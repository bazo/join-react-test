package storage

import (
	"context"
	"join-react-test/types"
	"log"
	"time"
)

func (s *Storage) SaveCandidate(id string, email string, createdAt time.Time) (*types.Candidate, error) {
	ctx := context.Background()

	candidate := types.NewCandidate()

	_, err := s.f.Collection(CANDIDATES).Doc(id).Set(ctx, candidate)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	log.Println(candidate)
	return candidate, nil
}
