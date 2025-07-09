package tree_sitter_jjrevset_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_jjrevset "github.com/bryceberger/tree-siter-jjrevset/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_jjrevset.Language())
	if language == nil {
		t.Errorf("Error loading Jjrevset grammar")
	}
}
