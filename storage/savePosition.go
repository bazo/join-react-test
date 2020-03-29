package storage

import (
	"context"
	"join-react-test/types"
)

func (s *Storage) SavePosition(position *types.Position) error {
	ctx := context.Background()

	_, err := s.f.Collection(POSITIONS).Doc(position.ID).Set(ctx, position)

	if err != nil {
		return err
	}

	return nil
}
