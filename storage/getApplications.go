package storage

import (
	"context"
	"join-react-test/types"

	"google.golang.org/api/iterator"
)

func (s *Storage) GetApplications() ([]*types.Application, error) {
	ctx := context.Background()

	it := s.f.Collection(APPLICATIONS).Documents(ctx)

	result := []*types.Application{}

	for {
		doc, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return result, err
		}

		entity := &types.Application{}
		doc.DataTo(entity)

		result = append(result, entity)
	}

	return result, nil
}
