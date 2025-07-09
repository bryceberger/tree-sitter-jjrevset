/**
 * @file Tree-sitter grammar for jj revsets
 * @author Bryce Berger <bryce.z.berger@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "jjrevset",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
