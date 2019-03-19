const nyt = require('../parse/nyt');

module.exports = {
    SOURCES: ['nyt', 'wapo', 'wsj'],
    SOURCE_PARSE_MAP: new Map([
        ['nyt', nyt]
    ]),
    SOURCE_URL_MAP: new Map([
        ['nyt', 'https://nytimes.com/crosswords'],
        ['wapo', 'https://washingtonpost.com/crossword-puzzles/daily/'],
        ['wsj', 'https://blogs.wsj.com/puzzle/category/crossword/']
    ])
};
