package storage

import (
	"context"
	"join-react-test/types"
)

func (s *Storage) GetCandidate(ID string) (*types.Candidate, error) {
	ctx := context.Background()

	data, err := s.f.Collection(CANDIDATES).Doc(ID).Get(ctx)

	if err != nil {
		return nil, err
	}

	candidate := &types.Candidate{}

	data.DataTo(candidate)

	return candidate, nil
}
