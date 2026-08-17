module.exports = grammar({
  name: "csv",

  rules: {
    csv: ($) => repeat1(alias($[`row`], $.row)),

    row: ($) => seq(
        repeat(seq($[`_cycle7`], ",")),
        optional($[`_remainder`]),
        "\n"
    ),

    _cycle7: ($) => seq(
        alias($[`field`], $.first),
        ",",
        alias($[`field`], $.second),
        ",",
        alias($[`field`], $.third),
        ",",
        alias($[`field`], $.fourth),
        ",",
        alias($[`field`], $.fifth),
        ",",
        alias($[`field`], $.sixth),
        ",",
        alias($[`field`], $.seventh)
    ),

    _remainder: ($) => seq(
        alias($[`field`], $.first),
        ...[$.seventh, $.sixth, $.fifth, $.fourth, $.third, $.second].reduce(
            (accum, fld) => [
                optional(seq(",", alias($[`field`], fld), ...accum)),
            ],
            []
        )
    ),

    field: ($) => token(
        choice(
            new RegExp(`[^,\\n\\r"]*`),
            seq('"', repeat(choice(/[^"]/, '""')), '"')
        )
    ),
  },
})
