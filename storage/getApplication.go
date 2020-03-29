package storage

import (
	"context"
	"join-react-test/types"
)

func (s *Storage) GetApplication(ID string) (*types.Application, error) {
	ctx := context.Background()

	data, err := s.f.Collection(APPLICATIONS).Doc(ID).Get(ctx)

	if err != nil {
		return nil, err
	}

	application := &types.Application{}

	data.DataTo(application)

	return application, nil
}
