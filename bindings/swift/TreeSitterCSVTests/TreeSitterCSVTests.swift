import XCTest
import SwiftTreeSitter
import TreeSitterCSV

final class TreeSitterCSVTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_csv())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading CSV grammar")
    }
}
