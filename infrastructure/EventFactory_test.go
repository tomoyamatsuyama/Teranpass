package infrastructure

import (
	"github.com/TerakoyaDev/Teranpass/domain/model/user"
	"testing"
)

func TestCreateNewEventSuccess(t *testing.T) {
	actual, err := CreateNewEvent(
		"eventName",
		"description",
		"location",
		"startTime",
		"endTime",
		user.NewUser("userName", "description", "image", "email"))
	if err != nil {
		t.Fatal(err)
	}
	expected, err := CreateNewEvent(
		"eventName",
		"description",
		"location",
		"startTime",
		"endTime",
		user.NewUser("userName", "description", "image", "email"))
	if err != nil {
		t.Fatal(err)
	}

	// not equal object
	if actual.Equals(expected) {
		t.Errorf("got %v\nwant %v", actual, expected)
	}

	if expected.Equals(actual) {
		t.Errorf("got %v\nwant %v", actual, expected)
	}

	// equal object
	if !actual.Equals(actual) {
		t.Errorf("got %v\nwant %v", actual, actual)
	}
	if !expected.Equals(expected) {
		t.Errorf("got %v\nwant %v", expected, expected)
	}

	// test equal address
	if &actual != &actual {
		t.Errorf("got %v\nwant %v", &actual, &actual)
	}
	if &expected != &expected {
		t.Errorf("got %v\nwant %v", &expected, &expected)
	}

	// different address ??
	if &actual == &expected {
		t.Errorf("got %v\nwant %v", &actual, &expected)
	}

}

func TestCreateNewEventFatal(t *testing.T) {
	// all empty
	_, err := CreateNewEvent("", "", "", "", "", nil)
	if err == nil {
		t.Fatal(err)
	}

	_, err = CreateNewEvent("eventName", "", "", "", "", nil)
	if err == nil {
		t.Fatal(err)
	}

	_, err = CreateNewEvent("eventName", "description", "", "", "", nil)
	if err == nil {
		t.Fatal(err)
	}

	_, err = CreateNewEvent("eventName", "description", "location", "", "", nil)
	if err == nil {
		t.Fatal(err)
	}

	_, err = CreateNewEvent("eventName", "description", "location", "startTime", "", nil)
	if err == nil {
		t.Fatal(err)
	}

	_, err = CreateNewEvent("eventName", "description", "location", "startTime", "endTime", nil)
	if err == nil {
		t.Fatal(err)
	}
}
