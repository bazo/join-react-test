package storage

import (
	"context"
	"fmt"
	"join-react-test/types"
	"time"
)

func (s *Storage) SaveApplication(application *types.Application) error {
	ctx := context.Background()

	ref := s.f.Collection(APPLICATIONS).NewDoc()

	application.State = "submitted"
	application.AppliedOn = time.Now()
	application.FullName = application.FirstName + " " + application.LastName
	application.Avatar = fmt.Sprintf("data:%s;base64,%s;", application.Photo.ContentType, application.Photo.Data)

	_, err := ref.Set(ctx, application)

	if err != nil {
		return err
	}

	return nil
}
