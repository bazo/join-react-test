package storage

import (
	"context"
	"join-react-test/types"
)

func (s *Storage) GetPosition(ID string) (*types.Position, error) {
	ctx := context.Background()

	data, err := s.f.Collection(POSITIONS).Doc(ID).Get(ctx)

	if err != nil {
		return nil, err
	}

	position := &types.Position{}

	data.DataTo(position)

	return position, nil
}
