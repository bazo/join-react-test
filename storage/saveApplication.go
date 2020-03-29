package storage

import (
	"context"
	"join-react-test/types"
)

func (s *Storage) SaveApplication(application *types.Application) error {
	ctx := context.Background()

	ref := s.f.Collection(APPLICATIONS).NewDoc()

	_, err := ref.Set(ctx, application)

	if err != nil {
		return err
	}

	return nil
}
