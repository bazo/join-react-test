package storage

import (
	"context"
	"join-react-test/types"

	"google.golang.org/api/iterator"
)

func (s *Storage) GetPositions() ([]*types.Position, error) {
	ctx := context.Background()

	it := s.f.Collection(POSITIONS).Documents(ctx)

	result := []*types.Position{}

	for {
		doc, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return result, err
		}

		entity := &types.Position{}
		doc.DataTo(entity)

		result = append(result, entity)
	}

	return result, nil
}
