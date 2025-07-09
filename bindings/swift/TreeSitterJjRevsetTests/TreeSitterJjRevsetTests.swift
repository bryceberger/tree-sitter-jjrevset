import XCTest
import SwiftTreeSitter
import TreeSitterJjrevset

final class TreeSitterJjrevsetTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_jjrevset())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Jjrevset grammar")
    }
}
