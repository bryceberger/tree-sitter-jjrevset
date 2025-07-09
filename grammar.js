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
    source_file: ($) =>
      choice(
        seq("'''", $.program, "'''"),
        seq('"""', $.program, '"""'),
        $.program,
      ),

    program: ($) => seq(optional($.program_modifier), $.expression),
    program_modifier: ($) =>
      prec(10, seq($.strict_identifier, $.pattern_kind_op)),

    expression: ($) =>
      seq(
        repeat($.negate_op),
        $._range_expression,
        repeat(seq($._infix_op, repeat($.negate_op), $._range_expression)),
      ),

    _range_expression: ($) =>
      choice(
        seq($._neighbors_expression, $._range_ops, $._neighbors_expression),
        seq($._neighbors_expression, $._range_post_ops),
        seq($._range_pre_ops, $._neighbors_expression),
        $._neighbors_expression,
        $._range_all_ops,
      ),

    _neighbors_expression: ($) =>
      seq($.primary, repeat(choice($.parents_op, $.children_op))),

    primary: ($) =>
      choice(
        seq("(", $.expression, ")"),
        $.function,
        $.string_pattern,
        seq($._symbol, $.at_op, $._symbol),
        seq($._symbol, $.at_op),
        $._symbol,
        $.at_op,
      ),

    string_pattern: ($) =>
      seq($.strict_identifier, $.pattern_kind_op, $._symbol),

    function: ($) =>
      seq($.strict_identifier, "(", optional($.function_arguments), ")"),
    function_name: (_) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    function_arguments: ($) =>
      seq($._argument, repeat(seq(",", $._argument)), optional(",")),
    _argument: ($) => choice($.keyword_argument, $.expression),
    keyword_argument: ($) => seq($.strict_identifier, "=", $.expression),

    at_op: (_) => "@",
    pattern_kind_op: (_) => ":",

    parents_op: (_) => "-",
    children_op: (_) => "+",

    dag_range_op: (_) => "::",
    dag_range_pre_op: (_) => "::",
    dag_range_post_op: (_) => "::",
    dag_range_all_op: (_) => "::",
    range_op: (_) => "..",
    range_pre_op: (_) => "..",
    range_post_op: (_) => "..",
    range_all_op: (_) => "..",

    _range_ops: ($) => choice($.dag_range_op, $.range_op),
    _range_pre_ops: ($) => choice($.dag_range_pre_op, $.range_pre_op),
    _range_post_ops: ($) => choice($.dag_range_post_op, $.range_post_op),
    _range_all_ops: ($) => choice($.dag_range_all_op, $.range_all_op),

    negate_op: (_) => "~",
    union_op: (_) => "|",
    intersection_op: (_) => "&",
    difference_op: (_) => "~",
    _infix_op: ($) => choice($.union_op, $.intersection_op, $.difference_op),

    string_literal: (_) => /"([^"\\]*(\\.[^"\\]*)*)"/,
    raw_string_literal: (_) => /'[^']*'/,

    _symbol: ($) =>
      choice($.identifier, $.string_literal, $.raw_string_literal),
    strict_identifier: (_) => /[a-zA-Z0-9_\/][a-zA-Z0-9_\/+.-]*/,
    identifier: (_) => /[a-zA-Z0-9_\/][a-zA-Z0-9_\/+.-]*/,
  },
});
